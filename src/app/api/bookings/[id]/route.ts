import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const booking = await prisma.booking.findFirst({
    where: {
      id,
      ...(session.user.role !== "ADMIN" ? { customerId: session.user.id } : {}),
    },
    include: {
      customer: { select: { name: true, email: true, phone: true } },
      driver: { include: { user: { select: { name: true, phone: true } } } },
      statusUpdates: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  return NextResponse.json(booking);
}
