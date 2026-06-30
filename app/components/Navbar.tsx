"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type StoredUser = { id: string; name: string; email: string };

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("flexwork_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {}
    }
  }, []);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    localStorage.removeItem("flexwork_user");
    setUser(null);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  function initials(name: string) {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">F</span>
          <span>
            Flex<span className="text-green-600">Work</span>
            <span className="ml-1 text-sm font-normal text-gray-400">by TF</span>
          </span>
        </a>

        <nav className="flex items-center gap-3">
          <a href="/jobs" className="hidden text-sm font-medium text-gray-600 transition-colors hover:text-green-600 sm:block">
            Обяви
          </a>

          {!user && (
            <a
              href="/register"
              className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
            >
              Регистрирай се
            </a>
          )}

          {user && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-green-200 bg-green-50 text-xs font-semibold text-green-700"
              >
                {initials(user.name || user.email)}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                  <div className="border-b border-gray-100 px-4 py-2 text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                  <a href="/jobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Обяви
                  </a>
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Моят профил
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Изход
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
