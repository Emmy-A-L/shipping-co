// lib/shipping.ts

/**
 * Generate a unique tracking number
 * @returns Unique tracking number in format: SHP-YYYYMMDD-XXXXX
 */
export function generateTrackingNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  const timestamp = Date.now().toString().slice(-5);
  
  return `SHP-${year}${month}${day}-${random}${timestamp}`;
}

/**
 * Calculate shipping cost based on weight, dimensions, and distance
 * @param weight Weight in kg
 * @param dimensions Package dimensions
 * @param origin Origin location
 * @param destination Destination location
 * @returns Calculated shipping cost in NGN
 */
export function calculateShippingCost(
  weight: number,
  dimensions: { length: number; width: number; height: number },
  origin: { city: string; state: string },
  destination: { city: string; state: string }
): number {
  // Base rate per kg
  const baseRatePerKg = 500; // NGN 500 per kg
  
  // Calculate volumetric weight (length * width * height / 5000)
  const volumetricWeight = (dimensions.length * dimensions.width * dimensions.height) / 5000;
  
  // Use the greater of actual weight or volumetric weight
  const chargeableWeight = Math.max(weight, volumetricWeight);
  
  // Base cost
  let cost = chargeableWeight * baseRatePerKg;
  
  // Distance multiplier (simplified - in production, use actual distance calculation)
  const isInterstate = origin.state.toLowerCase() !== destination.state.toLowerCase();
  if (isInterstate) {
    cost *= 1.5; // 50% increase for interstate shipping
  }
  
  // Minimum charge
  const minimumCharge = 1000; // NGN 1,000 minimum
  cost = Math.max(cost, minimumCharge);
  
  // Round to nearest 100
  return Math.round(cost / 100) * 100;
}

/**
 * Validate shipping address
 * @param address Address object to validate
 * @returns Object with validation result and error message if any
 */
export function validateAddress(address: {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}): { valid: boolean; error?: string } {
  if (!address.street || address.street.trim().length === 0) {
    return { valid: false, error: 'Street address is required' };
  }
  
  if (!address.city || address.city.trim().length === 0) {
    return { valid: false, error: 'City is required' };
  }
  
  if (!address.state || address.state.trim().length === 0) {
    return { valid: false, error: 'State is required' };
  }
  
  if (!address.country || address.country.trim().length === 0) {
    return { valid: false, error: 'Country is required' };
  }
  
  return { valid: true };
}

/**
 * Calculate estimated delivery date based on distance
 * @param origin Origin location
 * @param destination Destination location
 * @returns Estimated delivery date
 */
export function calculateEstimatedDelivery(
  origin: { city: string; state: string },
  destination: { city: string; state: string }
): Date {
  const today = new Date();
  
  // Same city: 1-2 days
  // Same state: 2-3 days
  // Different state: 3-5 days
  
  let daysToAdd = 3; // Default
  
  if (origin.city.toLowerCase() === destination.city.toLowerCase()) {
    daysToAdd = 2;
  } else if (origin.state.toLowerCase() === destination.state.toLowerCase()) {
    daysToAdd = 3;
  } else {
    daysToAdd = 5;
  }
  
  const estimatedDate = new Date(today);
  estimatedDate.setDate(today.getDate() + daysToAdd);
  
  return estimatedDate;
}

/**
 * Get status display information
 * @param status Shipment status
 * @returns Display text and color for the status
 */
export function getStatusDisplay(status: string): { text: string; color: string } {
  const statusMap: Record<string, { text: string; color: string }> = {
    pending: { text: 'Pending Pickup', color: '#FFB020' },
    picked_up: { text: 'Picked Up', color: '#0EA5E9' },
    in_transit: { text: 'In Transit', color: '#6366F1' },
    out_for_delivery: { text: 'Out for Delivery', color: '#8B5CF6' },
    delivered: { text: 'Delivered', color: '#10B981' },
    delayed: { text: 'Delayed', color: '#EF4444' },
  };
  
  return statusMap[status] || { text: status, color: '#6B7280' };
}
