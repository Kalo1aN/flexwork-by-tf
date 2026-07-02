import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

/**
 * Returns the currently signed-in user (from the session cookie) or null.
 * Selects only the fields needed for gating and headers.
 */
export async function getCurrentUser() {
  const userId = getSessionUserId();
  if (!userId) return null;
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      status: true,
      activatedAt: true,
    },
  });
}
