"use client";

import { useState } from "react";

type Step = {
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    title: "Почасова работа",
    body: "Работиш на час и получаваш заплащане за реално отработеното време. Ти избираш смените, които ти отърват — никакви дългосрочни ангажименти.",
  },
  {
    title: "Сезонна работа",
    body: "Летни и сезонни позиции по морето и в големите градове. Идеално за студенти и за всеки, който търси допълнителни доходи.",
  },
  {
    title: "Бърза регистрация",
    body: "Създаваш профил за минути. Само 30 минути интервю и си готов да започнеш работа още същата седмица.",
  },
  {
    title: "Широк избор",
    body: "Стотици обяви в хотелиерство, събития, логистика и търговия из цялата страна. Намираш точно това, което ти подхожда.",
  },
];

export default function StepsAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {steps.map((step, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={step.title}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-green-50/60 sm:px-6"
              >
                <span className="flex items-center gap-4">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      isOpen
                        ? "bg-green-600 text-white"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="text-base font-semibold text-gray-900 sm:text-lg">
                    {step.title}
                  </span>
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-green-600 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    d="M5 7.5 10 12.5 15 7.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed text-gray-600 sm:px-6 sm:pl-[4.75rem] sm:text-base">
                  {step.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
