import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/app/components/Navbar";
import JobsGrid from "./JobsGrid";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.status !== "active") redirect("/register/pending");

  const jobs = await prisma.job.findMany({
    where: { isActive: true },
    orderBy: { workDate: "asc" },
  });

  const cities = Array.from(new Set(jobs.map((j) => j.city))).sort();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <JobsGrid jobs={jobs} cities={cities} />
    </div>
  );
}
