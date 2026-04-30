import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [total, pending, inTransit, delivered, drivers, customers] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({ where: { status: "IN_TRANSIT" } }),
    prisma.booking.count({ where: { status: "DELIVERED" } }),
    prisma.driver.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
  ]);

  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      customer: { select: { name: true } },
      driver: { include: { user: { select: { name: true } } } },
    },
  });

  return NextResponse.json({ total, pending, inTransit, delivered, drivers, customers, recentBookings });
}
