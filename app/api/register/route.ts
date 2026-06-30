import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { setSessionCookie } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, city, password } = body;

    if (!name || !email || !phone || !city || !password) {
      return NextResponse.json({ error: "Липсват задължителни полета." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Паролата трябва да е поне 8 символа." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Вече има акаунт с този имейл." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: passwordHash },
    });

    setSessionCookie(user.id);

    return NextResponse.json({ id: user.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Възникна грешка. Опитай отново." }, { status: 500 });
  }
}
