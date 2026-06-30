import { cookies } from "next/headers";

const COOKIE_NAME = "flexwork_admin";

export function setAdminCookie() {
  cookies().set(COOKIE_NAME, "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export function isAdmin(): boolean {
  return cookies().get(COOKIE_NAME)?.value === "ok";
}

export function clearAdminCookie() {
  cookies().delete(COOKIE_NAME);
}
