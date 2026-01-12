// app/api/customers/dashboard/payments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Payment } from '@/lib/models';
import clientPromise from '@/lib/mongoDb';

export async function GET(req: NextRequest) {
  try {
    // Connect to database
    await clientPromise;

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Validate user ID
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Build query
    const query: any = { userId };

    // Filter by status if provided
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter by date range if provided
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        const endDateTime = new Date(endDate);
        endDateTime.setHours(23, 59, 59, 999);
        query.createdAt.$lte = endDateTime;
      }
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch payments with pagination and populate shipment details
    const [payments, totalCount] = await Promise.all([
      Payment.find(query)
        .populate('shipmentId', 'trackingNumber origin destination status')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Payment.countDocuments(query),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    // Calculate summary statistics
    const successfulPayments = await Payment.countDocuments({
      userId,
      status: 'success',
    });
    const totalPaidAmount = await Payment.aggregate([
      { $match: { userId, status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    return NextResponse.json(
      {
        payments: payments.map((payment) => ({
          id: payment._id.toString(),
          shipmentId: payment.shipmentId?._id?.toString(),
          trackingNumber: payment.shipmentId?.trackingNumber,
          reference: payment.paystackReference,
          transactionId: payment.transactionId,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          paymentMethod: payment.paymentMethod,
          paidAt: payment.paidAt,
          createdAt: payment.createdAt,
          shipmentStatus: payment.shipmentId?.status,
        })),
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
          hasNextPage,
          hasPreviousPage,
        },
        summary: {
          totalSuccessfulPayments: successfulPayments,
          totalAmountPaid:
            totalPaidAmount.length > 0 ? totalPaidAmount[0].total : 0,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get payments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment history. Please try again.' },
      { status: 500 }
    );
  }
}
