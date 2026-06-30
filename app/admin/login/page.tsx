"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Грешна парола.");
      return;
    }
    router.push("/admin/jobs");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold">Админ вход</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Парола"
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="w-full rounded-xl bg-green-600 px-7 py-3 text-sm font-semibold text-white hover:bg-green-700">
          Вход
        </button>
      </form>
    </div>
  );
}
