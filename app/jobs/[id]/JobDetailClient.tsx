"use client";

import { useEffect, useState } from "react";
import { formatJobDate, centsToStr, companyInitials } from "@/lib/format";
import Navbar from "@/app/components/Navbar";

type Job = {
  id: string;
  title: string;
  company: string;
  description: string;
  city: string;
  mapUrl: string | null;
  workDate: string;
  timeStart: string;
  timeEnd: string;
  breakMinutes: number;
  rateEurCents: number;
  rateLvCents: number;
  totalEurCents: number;
  totalLvCents: number;
  totalSlots: number;
  filledSlots: number;
  jobType: string;
  workLocation: string;
};

type StoredUser = { id: string; name: string; email: string };

type Step = "view" | "confirm" | "contract" | "success";

export default function JobDetailClient({ job }: { job: Job }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [step, setStep] = useState<Step>("view");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [contractHtml, setContractHtml] = useState("");
  const [contractId, setContractId] = useState("");
  const [signChecked, setSignChecked] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("flexwork_user");
    if (raw) {
      const parsedUser = JSON.parse(raw);
      setUser(parsedUser);
      fetch(`/api/applications/check?jobId=${job.id}&userId=${parsedUser.id}`)
        .then((res) => res.json())
        .then((data) => setAlreadyApplied(data.applied))
        .catch(() => {});
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const { date, day } = formatJobDate(job.workDate);
  const free = job.totalSlots - job.filledSlots;
  const isFull = free <= 0;

  async function startApplication() {
    if (!user) {
      window.location.href = "/register";
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job.id, userId: user.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === "Вече си кандидатствал за тази позиция.") {
          setAlreadyApplied(true);
          return;
        }
        throw new Error(data.error || "Грешка при кандидатстване.");
      }
      setContractHtml(data.contractHtml);
      setContractId(data.contractId);
      setStep("contract");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Възникна грешка.");
    } finally {
      setLoading(false);
    }
  }

  async function signContract() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/contracts/${contractId}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signerName: user?.name, signerEmail: user?.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Грешка при подписване.");
      setStep("success");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Възникна грешка.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
        <a href="/jobs" className="text-sm text-gray-500 hover:text-gray-800">← Назад към позициите</a>

        {step === "view" && (
          <div className="mt-6 rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-green-50 text-xs font-bold text-green-700">
                {companyInitials(job.company)}
              </div>
              <span className="text-sm text-gray-500">{job.company}</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold">{job.title}</h1>
            <p className="mt-2 text-sm text-gray-600">{job.description}</p>

            <div className="mt-5 space-y-2 text-sm text-gray-700">
              <div>💰 {centsToStr(job.rateEurCents)} € ({centsToStr(job.rateLvCents)} лв.) на час · общо {centsToStr(job.totalLvCents)} лв.</div>
              <div>📅 {date} [{day}]</div>
              <div>🕐 {job.timeStart} – {job.timeEnd} · ☕ {job.breakMinutes} мин. почивка</div>
              <div>📍 {job.workLocation} · {job.city}</div>
              <div>💼 {job.jobType}</div>
              <div>👥 Свободни места: {free}</div>
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <button
              onClick={startApplication}
              disabled={isFull || loading || alreadyApplied}
              className="mt-6 w-full rounded-xl bg-green-600 px-7 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {isFull ? "Позицията е пълна" : alreadyApplied ? "Вече си кандидатствал" : loading ? "Зареждане..." : "Запиши се"}
            </button>
            {!user && (
              <p className="mt-2 text-center text-xs text-gray-500">Ще трябва да се регистрираш, за да кандидатстваш.</p>
            )}
          </div>
        )}

        {step === "contract" && (
          <div className="mt-6 rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold">Договор за работа</h2>
            <p className="mt-1 text-sm text-gray-500">Прегледай внимателно договора преди да подпишеш.</p>
            <div
              className="prose prose-sm mt-4 max-h-80 overflow-y-auto rounded-2xl border border-gray-200 bg-gray-50 p-4"
              dangerouslySetInnerHTML={{ __html: contractHtml }}
            />
            <label className="mt-4 flex items-start gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={signChecked} onChange={(e) => setSignChecked(e.target.checked)} className="mt-0.5" />
              Подписвам граждански договор
            </label>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            <button
              onClick={signContract}
              disabled={!signChecked || loading}
              className="mt-4 w-full rounded-xl bg-green-600 px-7 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Подписване..." : "Подписвам договора"}
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="mt-6 rounded-2xl border border-gray-200 p-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">✓</div>
            <h2 className="text-xl font-bold">Записан си успешно!</h2>
            <p className="mt-2 text-sm text-gray-600">Кандидатурата за &quot;{job.title}&quot; е потвърдена и договорът е подписан.</p>
            <a href="/jobs" className="mt-6 inline-block rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Разгледай още позиции
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
