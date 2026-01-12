// lib/paystack.ts
import crypto from 'crypto';

// Paystack API Configuration
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// TypeScript Interfaces
export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: 'success' | 'failed' | 'abandoned';
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: any;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
    };
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: any;
      risk_action: string;
    };
  };
}

export interface PaystackInitializeParams {
  email: string;
  amount: number; // Amount in kobo (smallest currency unit)
  reference?: string;
  callback_url?: string;
  metadata?: {
    shipmentId?: string;
    userId?: string;
    [key: string]: any;
  };
}

/**
 * Initialize a Paystack payment transaction
 * @param params Payment initialization parameters
 * @returns Paystack initialization response with authorization URL
 */
export async function initializePayment(
  params: PaystackInitializeParams
): Promise<PaystackInitializeResponse> {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data: PaystackInitializeResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to initialize payment');
    }

    return data;
  } catch (error) {
    console.error('Paystack initialization error:', error);
    throw error;
  }
}

/**
 * Verify a Paystack payment transaction
 * @param reference Payment reference to verify
 * @returns Paystack verification response with transaction details
 */
export async function verifyPayment(
  reference: string
): Promise<PaystackVerifyResponse> {
  try {
    const response = await fetch(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data: PaystackVerifyResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to verify payment');
    }

    return data;
  } catch (error) {
    console.error('Paystack verification error:', error);
    throw error;
  }
}

/**
 * Validate Paystack webhook signature
 * @param payload Request body as string
 * @param signature Paystack signature from headers
 * @returns boolean indicating if signature is valid
 */
export function validateWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(payload)
    .digest('hex');

  return hash === signature;
}

/**
 * Generate a unique payment reference
 * @param prefix Optional prefix for the reference
 * @returns Unique payment reference string
 */
export function generatePaymentReference(prefix: string = 'PAY'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Convert amount to kobo (smallest currency unit for NGN)
 * @param amount Amount in naira
 * @returns Amount in kobo
 */
export function toKobo(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Convert amount from kobo to naira
 * @param kobo Amount in kobo
 * @returns Amount in naira
 */
export function fromKobo(kobo: number): number {
  return kobo / 100;
}
