import Navbar from "@/app/components/Navbar";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="mx-auto max-w-md px-5 py-16 sm:px-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-green-600">Добре дошъл обратно</div>
        <h1 className="mt-2 text-3xl font-bold">Вход</h1>
        <p className="mt-3 text-gray-600">Вход с верифициран акаунт.</p>
        <div className="mt-8">
          <LoginForm />
        </div>
        <p className="mt-5 text-center text-sm text-gray-600">
          Нямаш акаунт? <a href="/register" className="font-semibold text-green-700">Кандидатствай</a>
        </p>
      </div>
    </div>
  );
}
