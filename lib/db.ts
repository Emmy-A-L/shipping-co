// ==================== /lib/db.ts ====================

import { Invoice, Notification, Shipment, User } from "./models";
import { Invoice as IInvoice, Shipment as IShipment, User as IUser, Notification as INotification } from "./types";
import mongodb from 'mongodb'
import clientPromise from './mongoDb'

export const ObjectId = () => {
   return new mongodb.ObjectId()
}


class Database {
  constructor() {
    clientPromise;
  }

  // Shipment methods
  async getShipmentByTracking(trackingNumber: string): Promise<IShipment | null> {
    await clientPromise;
    const shipment = await Shipment.findOne({ trackingNumber }).lean();
    if (!shipment) return null;
    return { ...shipment, id: shipment._id.toString() } as unknown as IShipment;
  }

  async getShipmentsByCustomer(userId: string): Promise<IShipment[]> {
    await clientPromise;
    const shipments = await Shipment.find({ userId }).lean();
    return shipments.map(s => ({ ...s, id: s._id.toString() })) as unknown as IShipment[];
  }

  async getAllShipments(): Promise<IShipment[]> {
    await clientPromise;
    const shipments = await Shipment.find({}).lean();
    return shipments.map(s => ({ ...s, id: s._id.toString() })) as unknown as IShipment[];
  }

  async createShipment(shipmentData: Omit<IShipment, 'id' | 'trackingNumber' | 'createdAt' | 'updates'>): Promise<IShipment> {
    await clientPromise;
    const trackingNumber = `SH-${ObjectId().toHexString()}`;
    
    // Create new shipment
    const newShipment = await Shipment.create({
      ...shipmentData,
      trackingNumber,
      updates: [{
        timestamp: new Date(),
        location: `${shipmentData.origin.city}, ${shipmentData.origin.state}`,
        status: 'pending',
        description: 'Shipment created'
      }]
    });

    return { ...newShipment.toObject(), id: newShipment._id.toString() } as unknown as IShipment;
  }

  // Invoice methods
  async getInvoicesByCustomer(customerId: string): Promise<IInvoice[]> {
    await clientPromise;
    const invoices = await Invoice.find({ customerId }).lean();
    return invoices.map(i => ({
      ...i,
      id: i._id.toString(),
      amount: typeof i.amount === 'object' && i.amount !== null && 'value' in i.amount ? parseFloat((i.amount as any).value.toString()) : 0, // Handle Decimal128 or structure if needed, schema says amount: { value: Decimal128, currency: String }
    })) as unknown as IInvoice[]; 
    // Correction: Mongoose schema for Invoice has amount: { value: Decimal128, currency: String }. Interface has amount: number.
    // I need to map it carefully.
  }

  async payInvoice(invoiceId: string): Promise<IInvoice | null> {
    await clientPromise;
    const invoice = await Invoice.findOneAndUpdate(
      { _id: invoiceId },
      { status: 'paid' },
      { new: true }
    ).lean();
    if (!invoice) return null;
    return {
        ...invoice,
        id: invoice._id.toString(),
        amount: typeof invoice.amount === 'object' && invoice.amount !== null && 'value' in invoice.amount ? parseFloat((invoice.amount as any).value.toString()) : 0
    } as unknown as IInvoice;
  }

  // Notification methods
  async getNotificationsByUser(userId: string): Promise<INotification[]> {
    await clientPromise;
    const notifications = await Notification.find({ userId }).lean();
    return notifications.map(n => ({
        ...n,
        id: n._id.toString()
    })) as unknown as INotification[];
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    await clientPromise;
    await Notification.findByIdAndUpdate(notificationId, { read: true });
  }

  // User methods
  async getUserByEmail(email: string): Promise<IUser | null> {
    await clientPromise;
    const user = await User.findOne({ email }).lean();
    if (!user) return null;
    
    return {
      id: user.userId, // Using userId as the public ID as per previous convention if applicable, or user._id.toString()
      email: user.email,
      name: `${user.firstName} ${user.lastName}`.trim(),
      role: user.role as 'customer' | 'admin',
      password: user.password
    };
  }

  async getUserById(id: string): Promise<IUser | null> {
    await clientPromise;
    let user = await User.findOne({ userId: id }).lean();
    if (!user) {
        try {
            user = await User.findById(id).lean();
        } catch {
             // ignore invalid objectId error
        }
    }
    
    if (!user) return null;

    return {
      id: user.userId, 
      email: user.email,
      name: `${user.firstName} ${user.lastName}`.trim(),
      role: user.role as 'customer' | 'admin',
      password: user.password
    };
  }
}

export const db: Database = new Database();