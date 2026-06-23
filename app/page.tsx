import Link from "next/link";
import StepsAccordion from "./components/StepsAccordion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
              F
            </span>
            <span>
              Flex<span className="text-emerald-600">Work</span>
              <span className="ml-1 text-sm font-normal text-gray-400">by TF</span>
            </span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/jobs"
              className="hidden text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600 sm:block"
            >
              Обяви
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
            >
              Регистрирай се
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-sm font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Гъвкава работа в България
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            30 минути интервю —{" "}
            <span className="text-emerald-600">после работиш кога искаш</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-gray-600">
            Почасова и сезонна работа на твой график. Кандидатствай за минути,
            мини през кратко интервю и започни да печелиш — без дългосрочни
            ангажименти.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/jobs"
              className="w-full rounded-full bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 sm:w-auto"
            >
              Намери работа
            </Link>
            <Link
              href="/register"
              className="w-full rounded-full border border-emerald-200 bg-white px-7 py-3.5 text-base font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 sm:w-auto"
            >
              Стани изпълнител
            </Link>
          </div>
        </div>
      </section>

      {/* Steps accordion */}
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Защо FlexWork?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-gray-600">
            Всичко, което ти трябва, за да работиш по свои условия.
          </p>
        </div>
        <div className="mt-10">
          <StepsAccordion />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-8 text-sm text-gray-500 sm:flex-row sm:px-8">
          <span className="font-semibold text-gray-700">
            Flex<span className="text-emerald-600">Work</span> by TF
          </span>
          <span>© 2026 FlexWork by TF. Всички права запазени.</span>
        </div>
      </footer>
    </div>
  );
}
