// app/api/customers/dashboard/track/[trackingNumber]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Shipment } from '@/lib/models';
import clientPromise from '@/lib/mongoDb';
import { getStatusDisplay } from '@/lib/shipping';

export async function GET(
  req: NextRequest,
  { params }: { params: { trackingNumber: string } }
) {
  try {
    // Connect to database
    await clientPromise;

    const trackingNumber = params.trackingNumber;

    // Validate tracking number
    if (!trackingNumber) {
      return NextResponse.json(
        { error: 'Tracking number is required' },
        { status: 400 }
      );
    }

    // Fetch shipment by tracking number
    const shipment = await Shipment.findOne({ trackingNumber }).lean();
    if (!shipment) {
      return NextResponse.json(
        { error: 'Shipment not found. Please verify your tracking number.' },
        { status: 404 }
      );
    }

    // Get status display information
    const statusDisplay = getStatusDisplay(shipment.status);

    // Get current location (last update)
    const currentLocation =
      shipment.updates && shipment.updates.length > 0
        ? shipment.updates[shipment.updates.length - 1].location
        : 'N/A';

    // Calculate delivery progress percentage
    let progressPercentage = 0;
    const statusProgress: Record<string, number> = {
      pending: 0,
      picked_up: 25,
      in_transit: 50,
      out_for_delivery: 75,
      delivered: 100,
      delayed: 50, // Same as in_transit
    };
    progressPercentage = statusProgress[shipment.status] || 0;

    return NextResponse.json(
      {
        trackingNumber: shipment.trackingNumber,
        status: shipment.status,
        statusDisplay,
        currentLocation,
        progressPercentage,
        origin: {
          city: shipment.origin.city,
          state: shipment.origin.state,
          country: shipment.origin.country,
        },
        destination: {
          city: shipment.destination.city,
          state: shipment.destination.state,
          country: shipment.destination.country,
        },
        estimatedDelivery: shipment.estimatedDelivery,
        actualDelivery: shipment.actualDelivery,
        packageType: shipment.packageType,
        weight: shipment.weight,
        isPaid: shipment.isPaid,
        updates: shipment.updates
          .sort(
            (a: any, b: any) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
          .map((update: any) => ({
            timestamp: update.timestamp,
            location: update.location,
            status: update.status,
            description: update.description,
          })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Track shipment error:', error);
    return NextResponse.json(
      { error: 'Failed to track shipment. Please try again.' },
      { status: 500 }
    );
  }
}
