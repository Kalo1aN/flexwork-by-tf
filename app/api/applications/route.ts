import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildContractHtml } from "@/lib/contract";

export async function POST(req: Request) {
  try {
    const { jobId, userId } = await req.json();
    if (!jobId || !userId) {
      return NextResponse.json({ error: "Липсват данни." }, { status: 400 });
    }

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!job || !user) {
      return NextResponse.json({ error: "Невалидна обява или потребител." }, { status: 404 });
    }
    if (job.filledSlots >= job.totalSlots) {
      return NextResponse.json({ error: "Позицията е пълна." }, { status: 409 });
    }

    const existing = await prisma.application.findUnique({
      where: { userId_jobId: { userId, jobId } },
    });
    if (existing) {
      return NextResponse.json({ error: "Вече си кандидатствал за тази позиция." }, { status: 409 });
    }

    const application = await prisma.application.create({
      data: { userId, jobId, status: "pending" },
    });

    const contractNumber = `TF-${Date.now()}`;
    const contractHtml = buildContractHtml({
      userName: user.name || user.email,
      userEmail: user.email,
      jobTitle: job.title,
      company: job.company,
      city: job.city,
      workDate: new Date(job.workDate).toLocaleDateString("bg-BG"),
      timeStart: job.timeStart,
      timeEnd: job.timeEnd,
      totalLv: (job.totalLvCents / 100).toFixed(2),
      totalEur: (job.totalEurCents / 100).toFixed(2),
      contractNumber,
    });

    const contract = await prisma.contract.create({
      data: {
        applicationId: application.id,
        userId,
        jobId,
        contractNumber,
        contractHtml,
        status: "pending",
      },
    });

    return NextResponse.json({ contractId: contract.id, contractHtml });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Възникна грешка. Опитай отново." }, { status: 500 });
  }
}
