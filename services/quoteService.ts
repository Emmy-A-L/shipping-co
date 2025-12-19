import { Address, Quote } from "@/lib/types";

// /services/quoteService.ts
export class QuoteService {
  static async calculateQuote(data: {
    origin: Address;
    destination: Address;
    weight: number;
    dimensions: { length: number; width: number; height: number };
    packageType: string;
    serviceType: 'standard' | 'express' | 'overnight';
  }): Promise<Quote> {
    const response = await fetch('/api/quotes/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}