import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status, driverId, message, location, billingAmount } = await req.json();

  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  const updateData: Record<string, unknown> = { status };
  if (driverId !== undefined) updateData.driverId = driverId;
  if (billingAmount !== undefined && billingAmount !== "") {
    updateData.estimatedPrice = parseFloat(billingAmount);
  }

  if (driverId) {
    await prisma.driver.update({ where: { id: driverId }, data: { isAvailable: false } });
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: updateData,
    include: {
      customer: { select: { name: true, email: true, phone: true } },
      driver: { include: { user: { select: { name: true, phone: true } } } },
      statusUpdates: { orderBy: { createdAt: "asc" } },
    },
  });

  await prisma.statusUpdate.create({
    data: {
      bookingId: id,
      status,
      message: message || getDefaultMessage(status),
      location: location || null,
      updatedBy: session.user.name || "Admin",
    },
  });

  if (status === "DELIVERED" && booking.driverId) {
    await prisma.driver.update({
      where: { id: booking.driverId },
      data: { isAvailable: true },
    });
  }

  return NextResponse.json(updated);
}

function getDefaultMessage(status: string): string {
  const messages: Record<string, string> = {
    CONFIRMED: "Your booking has been confirmed.",
    DRIVER_ASSIGNED: "A driver has been assigned to your shipment.",
    IN_TRANSIT: "Your shipment is on its way.",
    DELIVERED: "Your shipment has been delivered successfully.",
    CANCELLED: "Your booking has been cancelled.",
  };
  return messages[status] || "Status updated.";
}
