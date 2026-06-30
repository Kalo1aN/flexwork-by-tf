import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminSession";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Неоторизиран достъп." }, { status: 401 });
  }
  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) {
    return NextResponse.json({ error: "Обявата не е намерена." }, { status: 404 });
  }
  await prisma.job.update({ where: { id: job.id }, data: { isActive: !job.isActive } });
  return NextResponse.json({ ok: true });
}
