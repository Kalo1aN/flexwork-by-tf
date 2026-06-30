import { prisma } from "@/lib/prisma";
import Navbar from "@/app/components/Navbar";
import JobsGrid from "./JobsGrid";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
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
