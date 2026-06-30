"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !phone || !city || !password) {
      setError("Моля, попълни всички полета.");
      return;
    }
    if (password.length < 8) {
      setError("Паролата трябва да е поне 8 символа.");
      return;
    }
    if (!agreed) {
      setError("Трябва да приемеш условията, за да продължиш.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          phone,
          city,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Грешка при регистрация.");
      }

      const data = await res.json();
      localStorage.setItem(
        "flexwork_user",
        JSON.stringify({ id: data.id, name: `${firstName} ${lastName}`, email })
      );

      router.push("/register/pending");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Нещо се обърка. Опитай отново.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Име</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
            placeholder="Иван"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Фамилия</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
            placeholder="Иванов"
          />
        </div>
      </div>

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
        <label className="mb-1 block text-sm font-medium text-gray-700">Телефон за Viber</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
          placeholder="+359 88 123 4567"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Населено място</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
        >
          <option value="">Избери</option>
          <option>София</option>
          <option>Пловдив</option>
          <option>Варна</option>
          <option>Бургас</option>
          <option>Стара Загора</option>
          <option>Русе</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Парола</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
          placeholder="Мин. 8 символа"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-gray-600">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          Имам навършени 18 години и приемам Условията за ползване и Политиката на поверителност
        </span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-green-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Изпращане..." : "Изпрати кандидатурата"}
      </button>
    </form>
  );
}
