"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

type Slot = {
  id: string;
  startTime: string;
  endTime: string;
  consultant: { id: string; name: string; color: string };
};

type StoredUser = { id: string; name: string; email: string };

export default function BookInterviewPage() {
  const router = useRouter();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("flexwork_user");
    if (raw) setUser(JSON.parse(raw));
    fetch("/api/bookings").then((r) => r.json()).then(setSlots);
  }, []);

  function formatDt(dt: string) {
    const d = new Date(dt);
    return d.toLocaleDateString("bg-BG", { weekday: "long", day: "2-digit", month: "long" }) + " · " + d.toLocaleTimeString("bg-BG", { hour: "2-digit", minute: "2-digit" });
  }

  async function handleBook() {
    if (!selected) return;
    if (!user) { router.push("/login"); return; }
    setLoading(true); setError("");
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotId: selected, userId: user.id }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Грешка при буккване."); setLoading(false); return; }
    setBooked(true); setLoading(false);
  }

  if (booked) return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="mx-auto max-w-xl px-5 py-16 text-center sm:px-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 text-xl">✓</div>
        <h1 className="text-2xl font-bold">Интервюто е запазено!</h1>
        <p className="mt-3 text-gray-600">Ще получиш потвърждение от нашия консултант. Очаквай обаждане по Viber.</p>
        <a href="/jobs" className="mt-6 inline-block rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
          Разгледай позициите
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">Стъпка 2 от 2</div>
        <h1 className="text-2xl font-bold">Запази интервю</h1>
        <p className="mt-2 text-gray-600">Избери удобен 10-минутен слот за разговор с наш консултант по Viber.</p>

        {slots.length === 0 && (
          <div className="mt-8 rounded-2xl border border-gray-200 p-8 text-center text-sm text-gray-500">
            В момента няма свободни слотове. Ще те уведомим скоро.
          </div>
        )}

        <div className="mt-6 space-y-2">
          {slots.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`w-full rounded-xl border px-4 py-4 text-left transition-all ${selected === s.id ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
            >
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.consultant.color }} />
                <div>
                  <div className="text-sm font-semibold">{formatDt(s.startTime)}</div>
                  <div className="text-xs text-gray-500">с {s.consultant.name}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        {slots.length > 0 && (
          <button
            onClick={handleBook}
            disabled={!selected || loading}
            className="mt-6 w-full rounded-xl bg-green-600 px-7 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Запазване..." : "Потвърди интервюто"}
          </button>
        )}
      </div>
    </div>
  );
}
