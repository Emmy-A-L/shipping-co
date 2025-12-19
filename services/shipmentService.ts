import { Shipment } from "@/lib/types";

// /services/shipmentService.ts
export class ShipmentService {
  static async trackShipment(trackingNumber: string): Promise<Shipment | null> {
    const response = await fetch(`/api/shipments/track?trackingNumber=${trackingNumber}`);
    if (!response.ok) return null;
    return response.json();
  }

  static async getShipmentsByCustomer(customerId: string): Promise<Shipment[]> {
    const response = await fetch(`/api/shipments?customerId=${customerId}`);
    return response.json();
  }

  static async getAllShipments(): Promise<Shipment[]> {
    const response = await fetch(`/api/shipments?role=admin`);
    return response.json();
  }

  static async createShipment(data: Omit<Shipment, 'id' | 'trackingNumber' | 'createdAt' | 'updates'>): Promise<Shipment> {
    const response = await fetch('/api/shipments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}