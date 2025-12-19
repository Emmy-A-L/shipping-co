import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

// /pages/api/invoices/index.ts
export async function invoicesAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customerId } = req.query;

  if (!customerId || typeof customerId !== 'string') {
    return res.status(400).json({ error: 'Customer ID required' });
  }

  const invoices = await db.getInvoicesByCustomer(customerId);
  res.status(200).json(invoices);
}