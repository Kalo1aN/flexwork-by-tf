import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");
  const userId = searchParams.get("userId");

  if (!jobId || !userId) {
    return NextResponse.json({ error: "Липсват данни." }, { status: 400 });
  }

  const existing = await prisma.application.findUnique({
    where: { userId_jobId: { userId, jobId } },
  });

  return NextResponse.json({ applied: !!existing, status: existing?.status || null });
}
