import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

// /pages/api/invoices/[id]/pay.ts
export async function payInvoiceAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invoice ID required' });
  }

  const invoice = await db.payInvoice(id);

  if (!invoice) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  res.status(200).json(invoice);
}