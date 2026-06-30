import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import Navbar from "@/app/components/Navbar";
import { formatJobDate, centsToStr } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const userId = getSessionUserId();
  if (!userId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    redirect("/login");
  }

  const applications = await prisma.application.findMany({
    where: { userId },
    include: { job: true, contract: true },
    orderBy: { createdAt: "desc" },
  });

  const statusLabels: Record<string, string> = {
    pending: "Изчаква",
    confirmed: "Потвърдена",
    cancelled: "Отказана",
    completed: "Приключена",
  };

  const statusColors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
    completed: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-green-600">Моят профил</div>
        <h1 className="mt-2 text-2xl font-bold">{user.name}</h1>
        <p className="mt-1 text-sm text-gray-500">{user.email}</p>

        <h2 className="mt-10 text-lg font-semibold">Моите кандидатури</h2>

        {applications.length === 0 && (
          <div className="mt-4 rounded-2xl border border-gray-200 p-8 text-center text-sm text-gray-500">
            Все още нямаш кандидатури.{" "}
            <a href="/jobs" className="font-semibold text-green-700">
              Разгледай обявите
            </a>
          </div>
        )}

        <div className="mt-4 space-y-3">
          {applications.map((app) => {
            const { date, day } = formatJobDate(app.job.workDate as unknown as string);
            return (
              <div key={app.id} className="rounded-2xl border border-gray-200 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold">{app.job.title}</div>
                    <div className="text-sm text-gray-500">{app.job.company} · {app.job.city}</div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${
                      statusColors[app.status] || "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    {statusLabels[app.status] || app.status}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <div>📅 {date} [{day}]</div>
                  <div>🕐 {app.job.timeStart} – {app.job.timeEnd}</div>
                  <div>💰 {centsToStr(app.job.totalLvCents)} лв. общо</div>
                </div>

                {app.contract && (
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <div className="text-xs text-gray-500">
                      Договор № {app.contract.contractNumber}
                      {app.contract.status === "signed" && app.contract.signedAt && (
                        <> · подписан на {new Date(app.contract.signedAt).toLocaleDateString("bg-BG")}</>
                      )}
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        app.contract.status === "signed"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {app.contract.status === "signed" ? "Подписан" : "Чака подпис"}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
