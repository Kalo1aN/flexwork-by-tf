import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const slots = await prisma.interviewSlot.findMany({
    where: { isBooked: false, startTime: { gte: new Date() } },
    include: { consultant: { select: { id: true, name: true, color: true } } },
    orderBy: { startTime: "asc" },
  });
  return NextResponse.json(slots);
}

export async function POST(req: Request) {
  const { slotId, userId } = await req.json();
  if (!slotId || !userId) return NextResponse.json({ error: "Липсват данни." }, { status: 400 });

  const slot = await prisma.interviewSlot.findUnique({ where: { id: slotId } });
  if (!slot || slot.isBooked) {
    return NextResponse.json({ error: "Слотът не е наличен." }, { status: 409 });
  }

  const booking = await prisma.$transaction(async (tx) => {
    await tx.interviewSlot.update({ where: { id: slotId }, data: { isBooked: true } });
    return tx.interviewBooking.create({
      data: { slotId, userId, consultantId: slot.consultantId },
      include: { slot: true, consultant: true },
    });
  });

  return NextResponse.json(booking);
}
