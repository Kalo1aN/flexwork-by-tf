import Navbar from "@/app/components/Navbar";

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="mx-auto max-w-xl px-5 py-16 text-center sm:px-8">
        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-700">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          Акаунтът чака активиране
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl">Почти готово!</h1>
        <p className="mx-auto mt-3 max-w-md text-gray-600">
          Остава само кратка 15-минутна среща с наш консултант. След активиране ще
          получиш достъп до всички свободни позиции, смени, дигитални договори и
          възможност за бързо започване на работа.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/book-interview"
            className="w-full rounded-xl bg-green-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-700 sm:w-auto"
          >
            Запази среща
          </a>
          <a
            href="viber://chat?number=%2B359896609737"
            className="w-full rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto"
          >
            Свържи се с консултант
          </a>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Достъпът до отворените роли се отключва след активиране на профила ти.
        </p>
      </div>
    </div>
  );
}
