import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import JobDetailClient from "./JobDetailClient";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) notFound();

  return <JobDetailClient job={JSON.parse(JSON.stringify(job))} />;
}
