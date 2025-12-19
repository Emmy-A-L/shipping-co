import { Invoice } from "@/lib/types";

// /services/invoiceService.ts
export class InvoiceService {
  static async getInvoicesByCustomer(customerId: string): Promise<Invoice[]> {
    const response = await fetch(`/api/invoices?customerId=${customerId}`);
    return response.json();
  }

  static async payInvoice(invoiceId: string): Promise<Invoice> {
    const response = await fetch(`/api/invoices/${invoiceId}/pay`, {
      method: 'POST'
    });
    return response.json();
  }
}