import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminSession";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: "Неоторизиран." }, { status: 401 });
  const { status } = await req.json();
  const booking = await prisma.interviewBooking.update({
    where: { id: params.id },
    data: { status },
  });
  return NextResponse.json(booking);
}
