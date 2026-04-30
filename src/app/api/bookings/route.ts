import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { generateBookingNo, estimatePrice } from "@/lib/utils";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bookings = await prisma.booking.findMany({
    where: { customerId: session.user.id },
    include: { driver: { include: { user: true } }, statusUpdates: { orderBy: { createdAt: "desc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookings);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { pickupAddress, deliveryAddress, pickupCity, deliveryCity, cargoType, cargoWeight, truckType, scheduledDate, notes } = body;

    if (!pickupAddress || !deliveryAddress || !cargoType || !cargoWeight || !truckType || !scheduledDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const estimatedPrice = estimatePrice(truckType, parseFloat(cargoWeight));

    const booking = await prisma.booking.create({
      data: {
        bookingNo: generateBookingNo(),
        customerId: session.user.id!,
        pickupAddress,
        deliveryAddress,
        pickupCity: pickupCity || "",
        deliveryCity: deliveryCity || "",
        cargoType,
        cargoWeight: parseFloat(cargoWeight),
        truckType,
        scheduledDate: new Date(scheduledDate),
        estimatedPrice,
        notes: notes || null,
        status: "PENDING",
      },
    });

    await prisma.statusUpdate.create({
      data: {
        bookingId: booking.id,
        status: "PENDING",
        message: "Booking received and awaiting confirmation.",
        updatedBy: "System",
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
