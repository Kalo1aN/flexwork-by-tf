import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { setSessionCookie } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Моля, въведи имейл и парола." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Грешен имейл или парола." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Грешен имейл или парола." }, { status: 401 });
    }

    setSessionCookie(user.id);

    return NextResponse.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Възникна грешка. Опитай отново." }, { status: 500 });
  }
}
