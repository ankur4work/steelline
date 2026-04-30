import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) return NextResponse.json({ error: "Query required" }, { status: 400 });

  const booking = await prisma.booking.findFirst({
    where: { bookingNo: q.toUpperCase() },
    include: {
      customer: { select: { name: true } },
      driver: { include: { user: { select: { name: true, phone: true } } } },
      statusUpdates: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(booking);
}
