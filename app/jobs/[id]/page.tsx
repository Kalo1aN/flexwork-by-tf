import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import JobDetailClient from "./JobDetailClient";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.status !== "active") redirect("/register/pending");

  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) notFound();

  return <JobDetailClient job={JSON.parse(JSON.stringify(job))} />;
}
