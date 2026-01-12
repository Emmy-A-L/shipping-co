// app/api/customers/dashboard/makePayment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Payment, Shipment } from '@/lib/models';
import clientPromise from '@/lib/mongoDb';
import {
  initializePayment,
  generatePaymentReference,
  toKobo,
} from '@/lib/paystack';

interface MakePaymentBody {
  userId: string;
  shipmentId: string;
  email: string;
  callbackUrl?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await clientPromise;

    const body: MakePaymentBody = await req.json();

    // Validate required fields
    if (!body.userId || !body.shipmentId || !body.email) {
      return NextResponse.json(
        { error: 'User ID, Shipment ID, and Email are required' },
        { status: 400 }
      );
    }

    // Fetch shipment
    const shipment = await Shipment.findById(body.shipmentId);
    if (!shipment) {
      return NextResponse.json(
        { error: 'Shipment not found' },
        { status: 404 }
      );
    }

    // Verify shipment belongs to user
    if (shipment.customerId !== body.userId) {
      return NextResponse.json(
        { error: 'Unauthorized access to shipment' },
        { status: 403 }
      );
    }

    // Check if already paid
    if (shipment.isPaid) {
      return NextResponse.json(
        { error: 'Shipment has already been paid for' },
        { status: 400 }
      );
    }

    // Check if shipment has a cost
    if (!shipment.cost || shipment.cost <= 0) {
      return NextResponse.json(
        { error: 'Invalid shipment cost' },
        { status: 400 }
      );
    }

    // Generate payment reference
    const reference = generatePaymentReference('SHP');

    // Initialize Paystack payment
    const paystackResponse = await initializePayment({
      email: body.email,
      amount: toKobo(shipment.cost), // Convert to kobo
      reference,
      callback_url: body.callbackUrl,
      metadata: {
        shipmentId: body.shipmentId,
        userId: body.userId,
        trackingNumber: shipment.trackingNumber,
      },
    });

    // Create payment record
    const payment = await Payment.create({
      userId: body.userId,
      shipmentId: body.shipmentId,
      paystackReference: reference,
      amount: shipment.cost,
      currency: 'NGN',
      status: 'pending',
      gateway: 'paystack',
      metadata: {
        trackingNumber: shipment.trackingNumber,
        email: body.email,
      },
    });

    return NextResponse.json(
      {
        message: 'Payment initialized successfully',
        payment: {
          id: payment._id.toString(),
          reference: payment.paystackReference,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
        },
        authorizationUrl: paystackResponse.data.authorization_url,
        accessCode: paystackResponse.data.access_code,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Make payment error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize payment. Please try again.' },
      { status: 500 }
    );
  }
}
