const BG_WEEKDAYS = ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"];

export function formatJobDate(date: Date | string) {
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return { date: `${dd}.${mm}.${yyyy}`, day: BG_WEEKDAYS[d.getDay()] };
}

export function centsToStr(cents: number) {
  return (cents / 100).toFixed(2);
}

export function companyInitials(company: string) {
  return company
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
