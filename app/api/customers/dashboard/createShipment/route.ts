// app/api/customers/dashboard/createShipment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Shipment } from '@/lib/models';
import clientPromise from '@/lib/mongoDb';
import {
  generateTrackingNumber,
  calculateShippingCost,
  validateAddress,
  calculateEstimatedDelivery,
} from '@/lib/shipping';

interface CreateShipmentBody {
  customerId: string;
  origin: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  destination: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  packageType: string;
}

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await clientPromise;

    const body: CreateShipmentBody = await req.json();

    // Validate required fields
    if (!body.customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    // Validate origin address
    const originValidation = validateAddress(body.origin);
    if (!originValidation.valid) {
      return NextResponse.json(
        { error: `Origin address: ${originValidation.error}` },
        { status: 400 }
      );
    }

    // Validate destination address
    const destinationValidation = validateAddress(body.destination);
    if (!destinationValidation.valid) {
      return NextResponse.json(
        { error: `Destination address: ${destinationValidation.error}` },
        { status: 400 }
      );
    }

    // Validate weight and dimensions
    if (!body.weight || body.weight <= 0) {
      return NextResponse.json(
        { error: 'Valid weight is required' },
        { status: 400 }
      );
    }

    if (
      !body.dimensions ||
      !body.dimensions.length ||
      !body.dimensions.width ||
      !body.dimensions.height ||
      body.dimensions.length <= 0 ||
      body.dimensions.width <= 0 ||
      body.dimensions.height <= 0
    ) {
      return NextResponse.json(
        { error: 'Valid dimensions (length, width, height) are required' },
        { status: 400 }
      );
    }

    // Generate tracking number
    const trackingNumber = generateTrackingNumber();

    // Calculate shipping cost
    const cost = calculateShippingCost(
      body.weight,
      body.dimensions,
      body.origin,
      body.destination
    );

    // Calculate estimated delivery date
    const estimatedDelivery = calculateEstimatedDelivery(
      body.origin,
      body.destination
    );

    // Create shipment
    const newShipment = await Shipment.create({
      trackingNumber,
      origin: body.origin,
      destination: body.destination,
      weight: body.weight,
      dimensions: body.dimensions,
      packageType: body.packageType || 'Standard Package',
      customerId: body.customerId,
      cost,
      estimatedDelivery,
      status: 'pending',
      isPaid: false,
      updates: [
        {
          timestamp: new Date(),
          location: `${body.origin.city}, ${body.origin.state}`,
          status: 'pending',
          description: 'Shipment created, awaiting pickup',
        },
      ],
    });

    return NextResponse.json(
      {
        message: 'Shipment created successfully',
        shipment: {
          id: newShipment._id.toString(),
          trackingNumber: newShipment.trackingNumber,
          origin: newShipment.origin,
          destination: newShipment.destination,
          weight: newShipment.weight,
          dimensions: newShipment.dimensions,
          packageType: newShipment.packageType,
          cost: newShipment.cost,
          estimatedDelivery: newShipment.estimatedDelivery,
          status: newShipment.status,
          isPaid: newShipment.isPaid,
          createdAt: newShipment.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create shipment error:', error);
    return NextResponse.json(
      { error: 'Failed to create shipment. Please try again.' },
      { status: 500 }
    );
  }
}
