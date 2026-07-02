import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/adminSession";
import { prisma } from "@/lib/prisma";
import BookingActionsClient from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  if (!isAdmin()) redirect("/admin/login");

  const bookings = await prisma.interviewBooking.findMany({
    include: {
      user: true,
      consultant: true,
      slot: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const statusLabels: Record<string, string> = {
    pending: "Изчаква",
    confirmed: "Потвърдено",
    cancelled: "Отказано",
  };

  const statusColors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  function formatDt(dt: Date) {
    return new Date(dt).toLocaleDateString("bg-BG", {
      weekday: "short", day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/admin/jobs" className="text-sm text-gray-500 hover:text-gray-800">← Обяви</a>
            <h1 className="text-lg font-bold">Интервю заявки</h1>
          </div>
          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">{bookings.length} заявки</span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        {bookings.length === 0 && (
          <div className="rounded-2xl border border-gray-200 p-8 text-center text-sm text-gray-500">
            Все още няма интервю заявки.
          </div>
        )}

        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="rounded-2xl border border-gray-200 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-semibold">{b.user.name || b.user.email}</div>
                  <div className="mt-0.5 text-sm text-gray-500">{b.user.email}</div>
                </div>
                <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[b.status] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
                  {statusLabels[b.status] || b.status}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-3">
                <div>
                  <span className="font-medium text-gray-900">Консултант: </span>
                  {b.consultant.name}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Час: </span>
                  {formatDt(b.slot.startTime)}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Телефон: </span>
                  <a href={`tel:${b.user.phone || ""}`} className="text-green-700">{b.user.phone || "няма телефон"}</a>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <BookingActionsClient bookingId={b.id} currentStatus={b.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
