import mongoose from "mongoose";


export const User = mongoose.model("User", new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  otherName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "driver", "admin"],
    default: "customer",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}));

export const Notification = mongoose.model("Notification", new mongoose.Schema({
  type: String,
  message: String,
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}));

export const Invoice = mongoose.model("Invoice", new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    value: {
      type: mongoose.Schema.Types.Decimal128,
      required: true
    },
    currency: {
      type: String,
      enum: ['NGN'],
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}));

export const Shipment = mongoose.model("Shipment", new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true },
  origin: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  destination: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  status: {
    type: String,
    enum: ['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'delayed'],
    default: 'pending'
  },
  estimatedDelivery: Date,
  actualDelivery: Date,
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  packageType: String,
  customerId: { type: String, required: true },
  cost: Number,
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updates: [{
    timestamp: { type: Date, default: Date.now },
    location: String,
    status: String,
    description: String
  }]
}));

export const Payment = mongoose.model("Payment", new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shipment",
  },
  paystackReference: {
    type: String,
    required: true,
    unique: true,
  },
  transactionId: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    enum: ['NGN'],
    default: 'NGN',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'abandoned'],
    default: 'pending',
    required: true,
  },
  paymentMethod: {
    type: String,
  },
  gateway: {
    type: String,
    default: 'paystack',
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
  },
  paidAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}));