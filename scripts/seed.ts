import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Admin user
  const adminPassword = await bcrypt.hash("Stl@Adm!n#9271", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@steelline.in" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@steelline.in",
      password: adminPassword,
      phone: "+91 98765 00001",
      role: "ADMIN",
    },
  });
  console.log("✓ Admin created:", admin.email);

  // Demo customer
  const customerPassword = await bcrypt.hash("customer123", 12);
  const customer = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      name: "Rahul Sharma",
      email: "customer@example.com",
      password: customerPassword,
      phone: "+91 98765 43210",
      role: "CUSTOMER",
    },
  });
  console.log("✓ Demo customer created:", customer.email);

  // Demo driver
  const driverPassword = await bcrypt.hash("driver123", 12);
  const driverUser = await prisma.user.upsert({
    where: { email: "driver@steelline.in" },
    update: {},
    create: {
      name: "Suresh Kumar",
      email: "driver@steelline.in",
      password: driverPassword,
      phone: "+91 98765 11111",
      role: "DRIVER",
    },
  });

  await prisma.driver.upsert({
    where: { userId: driverUser.id },
    update: {},
    create: {
      userId: driverUser.id,
      licenseNo: "DL-20110012345",
      vehicleType: "LARGE_TRUCK",
      vehicleNo: "MH-01-AB-1234",
      isAvailable: true,
    },
  });
  console.log("✓ Demo driver created:", driverUser.email);

  // Demo booking
  const existingBooking = await prisma.booking.findFirst({ where: { customerId: customer.id } });
  if (!existingBooking) {
    const booking = await prisma.booking.create({
      data: {
        bookingNo: "SLL-DEMO-001",
        customerId: customer.id,
        pickupAddress: "Plot 45, MIDC Industrial Area, Pune",
        deliveryAddress: "Sector 18, Gurugram, Haryana",
        pickupCity: "Pune",
        deliveryCity: "Gurugram",
        cargoType: "Steel & Metal Products",
        cargoWeight: 5000,
        truckType: "LARGE_TRUCK",
        scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        estimatedPrice: 45000,
        status: "IN_TRANSIT",
        notes: "Handle with care. Steel coils.",
      },
    });

    await prisma.statusUpdate.createMany({
      data: [
        { bookingId: booking.id, status: "PENDING", message: "Booking received and awaiting confirmation.", updatedBy: "System" },
        { bookingId: booking.id, status: "CONFIRMED", message: "Your booking has been confirmed.", updatedBy: "Admin" },
        { bookingId: booking.id, status: "DRIVER_ASSIGNED", message: "Driver Suresh Kumar has been assigned.", updatedBy: "Admin" },
        { bookingId: booking.id, status: "IN_TRANSIT", message: "Your shipment is on its way. Expected arrival in 2 days.", location: "Nagpur, Maharashtra", updatedBy: "Suresh Kumar" },
      ],
    });
    console.log("✓ Demo booking created: SLL-DEMO-001");
  }

  console.log("\n✅ Seeding complete!");
  console.log("\nLogin credentials:");
  console.log("  Admin    → admin@steelline.in / Stl@Adm!n#9271");
  console.log("  Customer → customer@example.com / customer123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
