"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ToggleActiveButton({ jobId, isActive }: { jobId: string; isActive: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    await fetch(`/api/admin/jobs/${jobId}/toggle`, { method: "POST" });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
    >
      {isActive ? "Деактивирай" : "Активирай"}
    </button>
  );
}
