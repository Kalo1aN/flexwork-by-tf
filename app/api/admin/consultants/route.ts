import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminSession";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Неоторизиран." }, { status: 401 });
  const consultants = await prisma.consultant.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(consultants);
}

export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Неоторизиран." }, { status: 401 });
  const { name, phone, email, color } = await req.json();
  if (!name || !phone) return NextResponse.json({ error: "Липсват данни." }, { status: 400 });
  const consultant = await prisma.consultant.create({ data: { name, phone, email, color } });
  return NextResponse.json(consultant);
}
