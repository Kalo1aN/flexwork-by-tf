"use client";

import { useMemo, useState } from "react";
import { formatJobDate, centsToStr, companyInitials } from "@/lib/format";

type Job = {
  id: string;
  title: string;
  company: string;
  city: string;
  mapUrl: string | null;
  workDate: Date;
  timeStart: string;
  timeEnd: string;
  breakMinutes: number;
  rateEurCents: number;
  rateLvCents: number;
  totalLvCents: number;
  totalSlots: number;
  filledSlots: number;
  jobType: string;
};

export default function JobsGrid({ jobs, cities }: { jobs: Job[]; cities: string[] }) {
  const [onlyFree, setOnlyFree] = useState(false);
  const [city, setCity] = useState("");

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const free = j.totalSlots - j.filledSlots;
      if (onlyFree && free <= 0) return false;
      if (city && j.city !== city) return false;
      return true;
    });
  }, [jobs, onlyFree, city]);

  return (
    <>
      <div className="border-b border-gray-100 bg-green-50/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Само свободни</span>
            <button
              type="button"
              onClick={() => setOnlyFree((v) => !v)}
              className={`relative h-5 w-9 rounded-full transition-colors ${
                onlyFree ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  onlyFree ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700"
          >
            <option value="">Всички градове</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8">
        <div className="mb-5">
          <h1 className="text-lg font-semibold">Отворени позиции</h1>
          <p className="mt-1 text-sm text-gray-500">Намерени: {filtered.length} позиции</p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((j) => {
            const free = j.totalSlots - j.filledSlots;
            const { date, day } = formatJobDate(j.workDate);
            const isFull = free <= 0;
            const slotColor =
              free === 0 ? "bg-red-50 border-red-200 text-red-600" : free <= 2 ? "bg-amber-50 border-amber-200 text-amber-600" : "bg-green-50 border-green-200 text-gray-900";

            return (
              <a
                key={j.id}
                href={`/jobs/${j.id}`}
                className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-green-50 text-xs font-bold text-green-700">
                      {companyInitials(j.company)}
                    </div>
                    <span className="text-xs text-gray-500">{j.company}</span>
                  </div>
                </div>

                <div className="text-base font-semibold leading-snug">{j.title}</div>

                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold">
                    {centsToStr(j.rateEurCents)} € / {centsToStr(j.rateLvCents)} лв. на час
                  </span>
                  <span className="text-xs text-gray-500">· {centsToStr(j.totalLvCents)} лв. общо</span>
                </div>

                <div className="flex flex-col gap-1.5 text-sm text-gray-500">
                  <div>📍 {j.city}</div>
                  <div>📅 {date} [{day}]</div>
                  <div>🕐 {j.timeStart} – {j.timeEnd} · ☕ {j.breakMinutes} мин. почивка</div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    Свободни места:
                    <span className={`flex h-6 min-w-7 items-center justify-center rounded-md border px-1.5 text-sm font-bold ${slotColor}`}>
                      {free}
                    </span>
                  </div>
                  <span
                    className={`rounded-lg px-4 py-2 text-xs font-semibold ${
                      isFull ? "bg-gray-100 text-gray-400" : "bg-green-600 text-white"
                    }`}
                  >
                    {isFull ? "Пълна" : "Запиши се"}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
