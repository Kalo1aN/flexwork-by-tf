import { cookies } from "next/headers";

const COOKIE_NAME = "flexwork_session";

export function setSessionCookie(userId: string) {
  cookies().set(COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function getSessionUserId(): string | null {
  return cookies().get(COOKIE_NAME)?.value || null;
}

export function clearSessionCookie() {
  cookies().delete(COOKIE_NAME);
}
