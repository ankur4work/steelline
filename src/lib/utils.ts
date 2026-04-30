export function generateBookingNo(): string {
  const prefix = "SLL";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export const BOOKING_STATUSES = {
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800", step: 0 },
  CONFIRMED: { label: "Confirmed", color: "bg-blue-100 text-blue-800", step: 1 },
  DRIVER_ASSIGNED: { label: "Driver Assigned", color: "bg-purple-100 text-purple-800", step: 2 },
  IN_TRANSIT: { label: "In Transit", color: "bg-blue-100 text-blue-800", step: 3 },
  DELIVERED: { label: "Delivered", color: "bg-green-100 text-green-800", step: 4 },
  CANCELLED: { label: "Cancelled", color: "bg-red-100 text-red-800", step: -1 },
} as const;

export const TRUCK_TYPES = [
  { value: "MINI_TRUCK", label: "Mini Truck (up to 1 ton)", capacity: "1 ton" },
  { value: "PICKUP", label: "Pickup Van (up to 2 tons)", capacity: "2 tons" },
  { value: "MEDIUM_TRUCK", label: "Medium Truck (3-5 tons)", capacity: "5 tons" },
  { value: "LARGE_TRUCK", label: "Large Truck (8-10 tons)", capacity: "10 tons" },
  { value: "TRAILER", label: "Heavy Trailer (15-20 tons)", capacity: "20 tons" },
  { value: "FLATBED", label: "Flatbed Truck", capacity: "15 tons" },
];

export const CARGO_TYPES = [
  "Steel & Metal Products",
  "Construction Materials",
  "Industrial Equipment",
  "Consumer Goods",
  "Agricultural Products",
  "Chemical Products",
  "Electronics & Machinery",
  "Furniture & Home Goods",
  "Automotive Parts",
  "Other",
];

export function estimatePrice(truckType: string, weight: number, distance?: number): number {
  const basePrices: Record<string, number> = {
    MINI_TRUCK: 2000,
    PICKUP: 3000,
    MEDIUM_TRUCK: 5000,
    LARGE_TRUCK: 8000,
    TRAILER: 15000,
    FLATBED: 12000,
  };
  const base = basePrices[truckType] || 5000;
  const weightFactor = Math.max(1, weight / 1000);
  return Math.round(base * weightFactor);
}
