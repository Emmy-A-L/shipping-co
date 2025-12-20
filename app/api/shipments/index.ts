import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

// /pages/api/shipments/index.ts
export async function shipmentsAPI(req: NextApiRequest, res: NextApiResponse) {
  // GET - Get shipments by customer or all (admin)
  if (req.method === 'GET') {
    const { customerId, role } = req.query;

    if (role === 'admin') {
      const shipments = await db.getAllShipments();
      return res.status(200).json(shipments);
    }

    if (!customerId || typeof customerId !== 'string') {
      return res.status(400).json({ error: 'Customer ID required' });
    }

    const shipments = await db.getShipmentsByCustomer(customerId);
    return res.status(200).json(shipments);
  }

  // POST - Create new shipment
  if (req.method === 'POST') {
    const shipmentData = req.body;
    const newShipment = await db.createShipment(shipmentData);
    return res.status(201).json(newShipment);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
