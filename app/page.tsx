import Link from "next/link";
import Navbar from "./components/Navbar";

const steps = [
  { title: "Регистрираш се", body: "Създаваш профил за няколко минути." },
  { title: "Минаваш 15-минутна среща", body: "Кратък разговор с наш консултант по Viber." },
  { title: "Профилът ти се активира", body: "След срещата акаунтът ти става активен." },
  { title: "Виждаш всички отворени роли и смени", body: "Достъп до целия маркетплейс от смени." },
  { title: "Записваш се и подписваш онлайн", body: "Избираш смяна и подписваш договора дигитално." },
];

const features = [
  { icon: "🗓️", title: "Избираш смени", body: "Работиш когато и колкото искаш — без дългосрочни ангажименти." },
  { icon: "✍️", title: "Договори онлайн", body: "Подписваш договори дигитално, направо от телефона." },
  { icon: "⚡", title: "Започваш бързо", body: "Одобрение и първа смяна за дни, не за седмици." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-1.5 text-xs font-medium text-green-700 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Маркетплейс за гъвкава работа
          </span>
          <h1 className="mx-auto mt-6 max-w-2xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Работи когато искаш.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-gray-600 sm:text-xl">
            Избирай смени. Подписвай договори онлайн. Започвай бързо.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="w-full rounded-xl bg-green-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-700 sm:w-auto"
            >
              Стани Flex Worker
            </Link>
            <Link
              href="/login"
              className="w-full rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto"
            >
              Вход
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-gray-200 p-6">
              <div className="text-2xl">{f.icon}</div>
              <div className="mt-3 text-base font-semibold">{f.title}</div>
              <p className="mt-1 text-sm text-gray-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-green-600">
              Как започваш
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Пет стъпки до първата смяна
            </h2>
          </div>

          <ol className="mt-8 space-y-3">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <div className="text-base font-semibold">{s.title}</div>
                  <p className="mt-0.5 text-sm text-gray-600">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 text-center">
            <Link
              href="/register"
              className="inline-block w-full rounded-xl bg-green-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-700 sm:w-auto"
            >
              Стани Flex Worker
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-8 text-sm text-gray-500 sm:flex-row sm:px-8">
          <span className="font-semibold text-gray-700">
            Flex<span className="text-green-600">Work</span> by TF
          </span>
          <span>© 2026 FlexWork by TF. Всички права запазени.</span>
        </div>
      </footer>
    </div>
  );
}
