import Navbar from "@/app/components/Navbar";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:items-start">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-green-600">
            Нов акаунт
          </div>
          <h1 className="mt-2 text-3xl font-bold">Кандидатствай</h1>
          <p className="mt-3 text-gray-600">
            След регистрацията наш консултант ще се свърже с теб за кратко интервю и ще ти даде достъп до позициите.
          </p>
          <div className="mt-8">
            <RegisterForm />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-green-50/60 p-6">
          <div className="text-sm font-semibold text-gray-900">Защо FlexWork by TF</div>
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            <li>✓ Лично интервю с рекрутър</li>
            <li>✓ Само верифицирани работници</li>
            <li>✓ Договор с е-подпис веднага</li>
            <li>✓ Плащане всяка седмица</li>
            <li>✓ Viber напомняния за смени</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
