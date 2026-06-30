import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { signerName, signerEmail } = await req.json();
    const contract = await prisma.contract.findUnique({ where: { id: params.id } });
    if (!contract) {
      return NextResponse.json({ error: "Договорът не е намерен." }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.contract.update({
        where: { id: contract.id },
        data: {
          status: "signed",
          signedAt: new Date(),
          signerName,
          signerEmail,
        },
      }),
      prisma.application.update({
        where: { id: contract.applicationId },
        data: { status: "confirmed" },
      }),
      prisma.job.update({
        where: { id: contract.jobId },
        data: { filledSlots: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Възникна грешка. Опитай отново." }, { status: 500 });
  }
}
