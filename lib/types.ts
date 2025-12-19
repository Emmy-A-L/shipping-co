// ==================== /lib/types.ts ====================
export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: Address;
  destination: Address;
  status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'delayed';
  estimatedDelivery: string;
  actualDelivery?: string;
  weight: number;
  dimensions: { length: number; width: number; height: number };
  packageType: string;
  customerId: string;
  cost: number;
  createdAt: string;
  updates: ShipmentUpdate[];
}

export interface ShipmentUpdate {
  timestamp: string;
  location: string;
  status: string;
  description: string;
}

export interface Quote {
  id: string;
  origin: Address;
  destination: Address;
  weight: number;
  dimensions: { length: number; width: number; height: number };
  packageType: string;
  serviceType: 'standard' | 'express' | 'overnight';
  cost: number;
  estimatedDays: number;
  createdAt: string;
}

export interface Invoice {
  id: string;
  shipmentId: string;
  customerId: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'shipment_update' | 'delivery' | 'invoice' | 'delay';
  title: string;
  message: string;
  shipmentId?: string;
  read: boolean;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  password: string;
}