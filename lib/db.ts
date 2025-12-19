// ==================== /lib/db.ts ====================

import { Invoice, Shipment, User } from "./types";

// In-memory database (replace with real database like PostgreSQL, MongoDB)
class Database {
  private shipments: Shipment[] = [
    {
      id: 'SH001',
      trackingNumber: 'TRK123456789',
      origin: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'USA' },
      destination: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'USA' },
      status: 'in_transit',
      estimatedDelivery: '2025-12-20',
      weight: 15.5,
      dimensions: { length: 20, width: 15, height: 10 },
      packageType: 'Box',
      customerId: 'CUST001',
      cost: 45.99,
      createdAt: '2025-12-15',
      updates: [
        { timestamp: '2025-12-15T10:00:00', location: 'New York, NY', status: 'picked_up', description: 'Package picked up' },
        { timestamp: '2025-12-16T14:30:00', location: 'Philadelphia, PA', status: 'in_transit', description: 'In transit to sorting facility' },
        { timestamp: '2025-12-17T09:15:00', location: 'Chicago, IL', status: 'in_transit', description: 'Arrived at distribution center' }
      ]
    }
  ];

  private invoices: Invoice[] = [
    {
      id: 'INV001',
      shipmentId: 'SH001',
      customerId: 'CUST001',
      amount: 45.99,
      status: 'pending',
      dueDate: '2025-12-27',
      createdAt: '2025-12-15'
    }
  ];

  private notifications: Notification[] = [
    {
      id: 'NOT001',
      userId: 'CUST001',
      type: 'shipment_update',
      title: 'Shipment Update',
      message: 'Your package TRK123456789 has arrived at Chicago distribution center',
      shipmentId: 'SH001',
      read: false,
      timestamp: '2025-12-17T09:15:00'
    }
  ];

  private users: User[] = [
    { id: 'CUST001', email: 'customer@ship.com', name: 'John Doe', role: 'customer', password: 'password' },
    { id: 'ADMIN001', email: 'admin@ship.com', name: 'Admin User', role: 'admin', password: 'password' }
  ];

  // Shipment methods
  async getShipmentByTracking(trackingNumber: string): Promise<Shipment | null> {
    return this.shipments.find(s => s.trackingNumber === trackingNumber) || null;
  }

  async getShipmentsByCustomer(customerId: string): Promise<Shipment[]> {
    return this.shipments.filter(s => s.customerId === customerId);
  }

  async getAllShipments(): Promise<Shipment[]> {
    return this.shipments;
  }

  async createShipment(shipment: Omit<Shipment, 'id' | 'trackingNumber' | 'createdAt' | 'updates'>): Promise<Shipment> {
    const newShipment: Shipment = {
      ...shipment,
      id: `SH${String(this.shipments.length + 1).padStart(3, '0')}`,
      trackingNumber: `TRK${Date.now()}`,
      createdAt: new Date().toISOString(),
      updates: [{
        timestamp: new Date().toISOString(),
        location: `${shipment.origin.city}, ${shipment.origin.state}`,
        status: 'pending',
        description: 'Shipment created'
      }]
    };
    this.shipments.push(newShipment);
    return newShipment;
  }

  // Invoice methods
  async getInvoicesByCustomer(customerId: string): Promise<Invoice[]> {
    return this.invoices.filter(i => i.customerId === customerId);
  }

  async payInvoice(invoiceId: string): Promise<Invoice | null> {
    const invoice = this.invoices.find(i => i.id === invoiceId);
    if (invoice) {
      invoice.status = 'paid';
    }
    return invoice || null;
  }

  // Notification methods
  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return this.notifications.filter(n => n.userId === userId);
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  // User methods
  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }
}

export const db = new Database();