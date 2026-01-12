// app/api/customers/dashboard/shipment/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Shipment, Payment } from '@/lib/models';
import clientPromise from '@/lib/mongoDb';
import { getStatusDisplay } from '@/lib/shipping';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Connect to database
    await clientPromise;

    const shipmentId = params.id;
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customerId');

    // Validate parameters
    if (!shipmentId) {
      return NextResponse.json(
        { error: 'Shipment ID is required' },
        { status: 400 }
      );
    }

    // Fetch shipment
    const shipment = await Shipment.findById(shipmentId).lean();
    if (!shipment) {
      return NextResponse.json(
        { error: 'Shipment not found' },
        { status: 404 }
      );
    }

    // Verify ownership if customerId is provided
    if (customerId && shipment.customerId !== customerId) {
      return NextResponse.json(
        { error: 'Unauthorized access to shipment' },
        { status: 403 }
      );
    }

    // Fetch payment information if exists
    const payment = await Payment.findOne({ shipmentId: shipmentId }).lean();

    // Get status display information
    const statusDisplay = getStatusDisplay(shipment.status);

    return NextResponse.json(
      {
        shipment: {
          id: shipment._id.toString(),
          trackingNumber: shipment.trackingNumber,
          origin: shipment.origin,
          destination: shipment.destination,
          weight: shipment.weight,
          dimensions: shipment.dimensions,
          packageType: shipment.packageType,
          cost: shipment.cost,
          status: shipment.status,
          statusDisplay,
          isPaid: shipment.isPaid,
          estimatedDelivery: shipment.estimatedDelivery,
          actualDelivery: shipment.actualDelivery,
          createdAt: shipment.createdAt,
          updates: shipment.updates,
        },
        payment: payment
          ? {
              id: payment._id.toString(),
              reference: payment.paystackReference,
              amount: payment.amount,
              currency: payment.currency,
              status: payment.status,
              paidAt: payment.paidAt,
            }
          : null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get shipment details error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shipment details. Please try again.' },
      { status: 500 }
    );
  }
}
