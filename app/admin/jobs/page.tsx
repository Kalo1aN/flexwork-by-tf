import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/adminSession";
import { prisma } from "@/lib/prisma";
import { formatJobDate } from "@/lib/format";
import ToggleActiveButton from "./ToggleActiveButton";

export const dynamic = "force-dynamic";

export default async function AdminJobsPage() {
  if (!isAdmin()) redirect("/admin/login");

  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-lg font-bold">Админ — Обяви</h1>
          <div className="flex items-center gap-3">
            <a href="/admin/slots" className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              📅 Интервю слотове
            </a>
            <a href="/admin/jobs/new" className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
              + Нова обява
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3">Заглавие</th>
                <th className="px-4 py-3">Компания</th>
                <th className="px-4 py-3">Град</th>
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3">Места</th>
                <th className="px-4 py-3">Статус</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => {
                const { date } = formatJobDate(j.workDate as unknown as string);
                return (
                  <tr key={j.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium">{j.title}</td>
                    <td className="px-4 py-3 text-gray-600">{j.company}</td>
                    <td className="px-4 py-3 text-gray-600">{j.city}</td>
                    <td className="px-4 py-3 text-gray-600">{date}</td>
                    <td className="px-4 py-3 text-gray-600">{j.filledSlots}/{j.totalSlots}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${j.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {j.isActive ? "Активна" : "Неактивна"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ToggleActiveButton jobId={j.id} isActive={j.isActive} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
