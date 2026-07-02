"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingActions({ bookingId, currentStatus }: { bookingId: string; currentStatus: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function updateStatus(status: string) {
    setLoading(true);
    await fetch(`/api/admin/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
    setLoading(false);
  }

  if (currentStatus === "confirmed") return (
    <button onClick={() => updateStatus("cancelled")} disabled={loading} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50">
      Откажи
    </button>
  );

  if (currentStatus === "cancelled") return (
    <button onClick={() => updateStatus("confirmed")} disabled={loading} className="rounded-lg border border-green-200 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-50 disabled:opacity-50">
      Потвърди
    </button>
  );

  return (
    <div className="flex gap-2">
      <button onClick={() => updateStatus("confirmed")} disabled={loading} className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50">
        ✓ Потвърди
      </button>
      <button onClick={() => updateStatus("cancelled")} disabled={loading} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50">
        Откажи
      </button>
    </div>
  );
}
