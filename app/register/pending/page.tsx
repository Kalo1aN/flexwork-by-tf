import Navbar from "@/app/components/Navbar";

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="mx-auto max-w-xl px-5 py-16 text-center sm:px-8">
        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-700">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          Очаква одобрение
        </div>
        <h1 className="text-2xl font-bold">Регистрацията е получена!</h1>
        <p className="mt-3 text-gray-600">
          Следващата стъпка е кратък разговор с наш консултант по Viber — около 30 минути.
          Само след одобрение получаваш достъп до позициите.
        </p>
        <a href="/book-interview" className="mt-8 inline-block rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">
          Запази интервю с консултант →
        </a>
      </div>
    </div>
  );
}
