"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Грешка при вход.");

      localStorage.setItem("flexwork_user", JSON.stringify({ id: data.id, name: data.name, email: data.email }));
      router.push("/jobs");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Възникна грешка.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Имейл адрес</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
          placeholder="ivan@example.com"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Парола</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
          placeholder="Вашата парола"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-green-600 px-7 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Влизане..." : "Влез"}
      </button>
    </form>
  );
}
