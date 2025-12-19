import { Quote } from "@/lib/types";
import { NextApiRequest, NextApiResponse } from "next";

// /pages/api/quotes/calculate.ts
export async function calculateQuoteAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { origin, destination, weight, dimensions, packageType, serviceType } = req.body;

  const baseRate = 15;
  const weightRate = weight * 0.5;
  const volumeRate = (dimensions.length * dimensions.width * dimensions.height) * 0.01;
  
  let serviceMultiplier = 1;
  let estimatedDays = 5;
  
  if (serviceType === 'express') {
    serviceMultiplier = 1.5;
    estimatedDays = 3;
  } else if (serviceType === 'overnight') {
    serviceMultiplier = 2.5;
    estimatedDays = 1;
  }
  
  const cost = Math.round((baseRate + weightRate + volumeRate) * serviceMultiplier * 100) / 100;

  const quote: Quote = {
    id: `QT${Date.now()}`,
    origin,
    destination,
    weight,
    dimensions,
    packageType,
    serviceType,
    cost,
    estimatedDays,
    createdAt: new Date().toISOString()
  };

  res.status(200).json(quote);
}