import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/adminSession";
import NewJobForm from "./NewJobForm";

export default function NewJobPage() {
  if (!isAdmin()) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100 px-5 py-4 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <a href="/admin/jobs" className="text-sm text-gray-500 hover:text-gray-800">← Назад</a>
        </div>
      </header>
      <div className="mx-auto max-w-2xl px-5 py-8 sm:px-8">
        <h1 className="text-xl font-bold">Нова обява</h1>
        <div className="mt-6">
          <NewJobForm />
        </div>
      </div>
    </div>
  );
}
