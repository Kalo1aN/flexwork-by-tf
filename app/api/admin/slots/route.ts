import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminSession";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Неоторизиран." }, { status: 401 });
  const slots = await prisma.interviewSlot.findMany({
    include: { consultant: true, booking: { include: { user: true } } },
    orderBy: { startTime: "asc" },
    where: { startTime: { gte: new Date() } },
  });
  return NextResponse.json(slots);
}

export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Неоторизиран." }, { status: 401 });
  const { consultantId, startTime, endTime } = await req.json();
  if (!consultantId || !startTime || !endTime) {
    return NextResponse.json({ error: "Липсват данни." }, { status: 400 });
  }
  const slot = await prisma.interviewSlot.create({
    data: { consultantId, startTime: new Date(startTime), endTime: new Date(endTime) },
    include: { consultant: true },
  });
  return NextResponse.json(slot);
}

export async function DELETE(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Неоторизиран." }, { status: 401 });
  const { slotId } = await req.json();
  await prisma.interviewSlot.delete({ where: { id: slotId } });
  return NextResponse.json({ ok: true });
}
