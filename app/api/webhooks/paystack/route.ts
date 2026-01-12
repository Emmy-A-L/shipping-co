// app/api/webhooks/paystack/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Payment, Shipment, Invoice, User } from '@/lib/models';
import clientPromise from '@/lib/mongoDb';
import { validateWebhookSignature, fromKobo } from '@/lib/paystack';

export async function POST(req: NextRequest) {
  try {
    // Get raw body for signature validation
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature') || '';

    // Validate webhook signature
    if (!validateWebhookSignature(rawBody, signature)) {
      console.error('Invalid Paystack webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the webhook payload
    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const data = payload.data;

    console.log('Paystack webhook event:', event);

    // Connect to database
    await clientPromise;

    // Handle different webhook events
    switch (event) {
      case 'charge.success':
        await handleChargeSuccess(data);
        break;

      case 'charge.failed':
        await handleChargeFailed(data);
        break;

      default:
        console.log('Unhandled webhook event:', event);
    }

    return NextResponse.json({ message: 'Webhook processed' }, { status: 200 });
  } catch (error) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful payment
 */
async function handleChargeSuccess(data: any) {
  try {
    const reference = data.reference;
    const transactionId = data.id;
    const amount = fromKobo(data.amount);
    const paidAt = new Date(data.paid_at);
    const channel = data.channel;

    // Find payment record
    const payment = await Payment.findOne({ paystackReference: reference });
    if (!payment) {
      console.error('Payment record not found for reference:', reference);
      return;
    }

    // Update payment status
    payment.status = 'success';
    payment.transactionId = transactionId.toString();
    payment.paidAt = paidAt;
    payment.paymentMethod = channel;
    payment.updatedAt = new Date();
    await payment.save();

    // Update shipment if exists
    if (payment.shipmentId) {
      const shipment = await Shipment.findById(payment.shipmentId);
      if (shipment) {
        shipment.isPaid = true;
        
        // Update shipment status to picked_up if still pending
        if (shipment.status === 'pending') {
          shipment.status = 'picked_up';
          shipment.updates.push({
            timestamp: new Date(),
            location: `${shipment.origin.city}, ${shipment.origin.state}`,
            status: 'picked_up',
            description: 'Payment confirmed. Package ready for pickup.',
          });
        }
        
        await shipment.save();

        // Create invoice
        const user = await User.findById(payment.userId);
        if (user) {
          const invoiceNumber = `INV-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 7)
            .toUpperCase()}`;

          await Invoice.create({
            userId: payment.userId,
            invoiceNumber,
            transactionId: transactionId.toString(),
            amount: {
              value: amount,
              currency: 'NGN',
            },
            createdAt: new Date(),
          });

          console.log('Invoice created:', invoiceNumber);
        }
      }
    }

    console.log('Payment successful:', reference);
  } catch (error) {
    console.error('Error handling charge success:', error);
    throw error;
  }
}

/**
 * Handle failed payment
 */
async function handleChargeFailed(data: any) {
  try {
    const reference = data.reference;

    // Find payment record
    const payment = await Payment.findOne({ paystackReference: reference });
    if (!payment) {
      console.error('Payment record not found for reference:', reference);
      return;
    }

    // Update payment status
    payment.status = 'failed';
    payment.updatedAt = new Date();
    await payment.save();

    console.log('Payment failed:', reference);
  } catch (error) {
    console.error('Error handling charge failed:', error);
    throw error;
  }
}
