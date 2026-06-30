import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminSession";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Неоторизиран достъп." }, { status: 401 });
  }
  try {
    const body = await req.json();

    if (
      typeof body.rateEurCents !== "number" || Number.isNaN(body.rateEurCents) ||
      typeof body.rateLvCents !== "number" || Number.isNaN(body.rateLvCents) ||
      typeof body.totalEurCents !== "number" || Number.isNaN(body.totalEurCents) ||
      typeof body.totalLvCents !== "number" || Number.isNaN(body.totalLvCents)
    ) {
      return NextResponse.json({ error: "Моля, попълни всички ценови полета с валидни числа." }, { status: 400 });
    }

    await prisma.job.create({
      data: {
        title: body.title,
        company: body.company,
        description: body.description,
        city: body.city,
        mapUrl: body.mapUrl || null,
        workDate: new Date(body.workDate),
        timeStart: body.timeStart,
        timeEnd: body.timeEnd,
        breakMinutes: body.breakMinutes,
        rateEurCents: body.rateEurCents,
        rateLvCents: body.rateLvCents,
        totalEurCents: body.totalEurCents,
        totalLvCents: body.totalLvCents,
        totalSlots: body.totalSlots,
        jobType: body.jobType,
        workLocation: body.workLocation,
        languages: body.languages,
        isActive: true,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Възникна грешка при създаване на обявата." }, { status: 500 });
  }
}
