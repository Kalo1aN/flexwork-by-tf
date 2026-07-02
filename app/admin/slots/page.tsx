import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/adminSession";
import { prisma } from "@/lib/prisma";
import SlotsManager from "./SlotsManager";

export const dynamic = "force-dynamic";

export default async function AdminSlotsPage() {
  if (!isAdmin()) redirect("/admin/login");

  const consultants = await prisma.consultant.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
  const slots = await prisma.interviewSlot.findMany({
    where: { startTime: { gte: new Date() } },
    include: { consultant: true, booking: { include: { user: true } } },
    orderBy: { startTime: "asc" },
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/admin/jobs" className="text-sm text-gray-500 hover:text-gray-800">← Обяви</a>
            <h1 className="text-lg font-bold">Интервю слотове</h1>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <SlotsManager consultants={JSON.parse(JSON.stringify(consultants))} initialSlots={JSON.parse(JSON.stringify(slots))} />
      </div>
    </div>
  );
}
