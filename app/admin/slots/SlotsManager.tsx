"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Consultant = { id: string; name: string; color: string; phone: string };
type Booking = { user: { name: string | null; email: string } };
type Slot = {
  id: string;
  consultantId: string;
  consultant: Consultant;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  booking: Booking | null;
};

export default function SlotsManager({ consultants, initialSlots }: { consultants: Consultant[]; initialSlots: Slot[] }) {
  const router = useRouter();
  const [slots] = useState<Slot[]>(initialSlots);
  const [consultantId, setConsultantId] = useState(consultants[0]?.id || "");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function formatDt(dt: string) {
    const d = new Date(dt);
    return d.toLocaleDateString("bg-BG", { weekday: "short", day: "2-digit", month: "2-digit" }) + " " + d.toLocaleTimeString("bg-BG", { hour: "2-digit", minute: "2-digit" });
  }

  async function addSlot() {
    if (!date || !startTime || !consultantId) { setError("Попълни всички полета."); return; }
    setError(""); setLoading(true);
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(start.getTime() + 10 * 60 * 1000);
    const res = await fetch("/api/admin/slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consultantId, startTime: start.toISOString(), endTime: end.toISOString() }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Грешка."); } else { router.refresh(); }
    setLoading(false);
  }

  async function deleteSlot(slotId: string) {
    await fetch("/api/admin/slots", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slotId }) });
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-gray-200 p-6">
        <h2 className="mb-4 text-base font-semibold">Добави нов слот (10 мин)</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Консултант</label>
            <select value={consultantId} onChange={(e) => setConsultantId(e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm">
              {consultants.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Дата</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Начален час</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm" />
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button onClick={addSlot} disabled={loading} className="mt-4 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60">
          {loading ? "Добавяне..." : "+ Добави слот"}
        </button>
      </div>

      <div>
        <h2 className="mb-3 text-base font-semibold">Предстоящи слотове ({slots.length})</h2>
        {slots.length === 0 && <p className="text-sm text-gray-500">Няма добавени слотове.</p>}
        <div className="space-y-2">
          {slots.map((s) => (
            <div key={s.id} className={`flex items-center justify-between rounded-xl border px-4 py-3 ${s.isBooked ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"}`}>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.consultant.color }} />
                <div>
                  <div className="text-sm font-medium">{s.consultant.name} · {formatDt(s.startTime)}</div>
                  {s.isBooked && s.booking && (
                    <div className="text-xs text-green-700">✓ Букнато от: {s.booking.user.name || s.booking.user.email}</div>
                  )}
                </div>
              </div>
              {!s.isBooked && (
                <button onClick={() => deleteSlot(s.id)} className="text-xs text-red-500 hover:text-red-700">Изтрий</button>
              )}
              {s.isBooked && <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">Букнат</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
