import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

// /pages/api/shipments/track.ts
export async function trackShipmentAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { trackingNumber } = req.query;

  if (!trackingNumber || typeof trackingNumber !== 'string') {
    return res.status(400).json({ error: 'Tracking number required' });
  }

  const shipment = await db.getShipmentByTracking(trackingNumber);

  if (!shipment) {
    return res.status(404).json({ error: 'Shipment not found' });
  }

  res.status(200).json(shipment);
}
