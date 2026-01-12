// app/api/customers/dashboard/shipments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Shipment } from '@/lib/models';
import clientPromise from '@/lib/mongoDb';

export async function GET(req: NextRequest) {
  try {
    // Connect to database
    await clientPromise;

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customerId');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const status = searchParams.get('status');

    // Validate customer ID
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    // Build query
    const query: any = { customerId };
    if (status && status !== 'all') {
      query.status = status;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch shipments with pagination
    const [shipments, totalCount] = await Promise.all([
      Shipment.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Shipment.countDocuments(query),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json(
      {
        shipments: shipments.map((shipment) => ({
          id: shipment._id.toString(),
          trackingNumber: shipment.trackingNumber,
          origin: shipment.origin,
          destination: shipment.destination,
          weight: shipment.weight,
          dimensions: shipment.dimensions,
          packageType: shipment.packageType,
          cost: shipment.cost,
          status: shipment.status,
          isPaid: shipment.isPaid,
          estimatedDelivery: shipment.estimatedDelivery,
          actualDelivery: shipment.actualDelivery,
          createdAt: shipment.createdAt,
        })),
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
          hasNextPage,
          hasPreviousPage,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get shipments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shipments. Please try again.' },
      { status: 500 }
    );
  }
}
