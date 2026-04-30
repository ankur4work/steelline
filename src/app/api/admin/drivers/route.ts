import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const drivers = await prisma.driver.findMany({
    include: { user: { select: { name: true, email: true, phone: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(drivers);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, email, password, phone, licenseNo, vehicleType, vehicleNo } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, phone, role: "DRIVER" },
    });

    const driver = await prisma.driver.create({
      data: { userId: user.id, licenseNo, vehicleType, vehicleNo },
      include: { user: { select: { name: true, email: true, phone: true } } },
    });

    return NextResponse.json(driver, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create driver" }, { status: 500 });
  }
}
