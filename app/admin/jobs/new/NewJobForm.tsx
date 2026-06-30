"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewJobForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", company: "", description: "", city: "", mapUrl: "",
    workDate: "", timeStart: "", timeEnd: "", breakMinutes: "0",
    rateEurCents: "", rateLvCents: "", totalEurCents: "", totalLvCents: "",
    totalSlots: "1", jobType: "", workLocation: "onsite", languages: "Bulgarian",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          breakMinutes: parseInt(form.breakMinutes),
          rateEurCents: Math.round(parseFloat(form.rateEurCents) * 100),
          rateLvCents: Math.round(parseFloat(form.rateLvCents) * 100),
          totalEurCents: Math.round(parseFloat(form.totalEurCents) * 100),
          totalLvCents: Math.round(parseFloat(form.totalLvCents) * 100),
          totalSlots: parseInt(form.totalSlots),
          languages: form.languages.split(",").map((s) => s.trim()),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Грешка при създаване.");
      }
      router.push("/admin/jobs");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Възникна грешка.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Заглавие</label><input className={inputClass} value={form.title} onChange={(e) => update("title", e.target.value)} /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Компания</label><input className={inputClass} value={form.company} onChange={(e) => update("company", e.target.value)} /></div>
      </div>
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Описание</label><textarea className={inputClass} rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Град</label><input className={inputClass} value={form.city} onChange={(e) => update("city", e.target.value)} /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Карта (URL, по избор)</label><input className={inputClass} value={form.mapUrl} onChange={(e) => update("mapUrl", e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Дата</label><input type="date" className={inputClass} value={form.workDate} onChange={(e) => update("workDate", e.target.value)} /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">От час</label><input type="time" className={inputClass} value={form.timeStart} onChange={(e) => update("timeStart", e.target.value)} /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">До час</label><input type="time" className={inputClass} value={form.timeEnd} onChange={(e) => update("timeEnd", e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Почивка (мин)</label><input type="number" className={inputClass} value={form.breakMinutes} onChange={(e) => update("breakMinutes", e.target.value)} /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Места</label><input type="number" required className={inputClass} value={form.totalSlots} onChange={(e) => update("totalSlots", e.target.value)} /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Тип работа</label><input className={inputClass} value={form.jobType} onChange={(e) => update("jobType", e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Ставка € (на час)</label><input required className={inputClass} value={form.rateEurCents} onChange={(e) => update("rateEurCents", e.target.value)} placeholder="8.50" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Ставка лв. (на час)</label><input required className={inputClass} value={form.rateLvCents} onChange={(e) => update("rateLvCents", e.target.value)} placeholder="16.62" /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Общо €</label><input required className={inputClass} value={form.totalEurCents} onChange={(e) => update("totalEurCents", e.target.value)} placeholder="55.25" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Общо лв.</label><input required className={inputClass} value={form.totalLvCents} onChange={(e) => update("totalLvCents", e.target.value)} placeholder="108.03" /></div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Локация</label>
        <select className={inputClass} value={form.workLocation} onChange={(e) => update("workLocation", e.target.value)}>
          <option value="onsite">onsite</option>
          <option value="remote">remote</option>
        </select>
      </div>
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Езици (разделени със запетая)</label><input className={inputClass} value={form.languages} onChange={(e) => update("languages", e.target.value)} /></div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading} className="w-full rounded-xl bg-green-600 px-7 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60">
        {loading ? "Запазване..." : "Създай обявата"}
      </button>
    </form>
  );
}
