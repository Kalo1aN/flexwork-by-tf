import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Fixed BGN/EUR conversion rate (Bulgarian lev is pegged to the euro).
const BGN_PER_EUR = 1.95583;

/** Worked minutes for a shift, excluding the unpaid break. */
function workedMinutes(timeStart: string, timeEnd: string, breakMinutes: number): number {
  const [sh, sm] = timeStart.split(":").map(Number);
  const [eh, em] = timeEnd.split(":").map(Number);
  return eh * 60 + em - (sh * 60 + sm) - breakMinutes;
}

type SampleJob = {
  id: string;
  title: string;
  company: string;
  description: string;
  city: string;
  mapUrl: string | null;
  workDate: Date;
  timeStart: string;
  timeEnd: string;
  breakMinutes: number;
  rateEurCents: number;
  totalSlots: number;
  filledSlots: number;
  jobType: string;
  workLocation: string;
  languages: string[];
  isActive: boolean;
  isFeatured: boolean;
};

const sampleJobs: SampleJob[] = [
  {
    id: "job_sample_waiter_sofia",
    title: "Waiter / Waitress",
    company: "Bistro Central",
    description:
      "Serve guests, take orders and support the floor team during a busy summer evening service. No prior experience required — training provided on arrival.",
    city: "Sofia",
    mapUrl: "https://maps.google.com/?q=Bistro+Central+Sofia",
    workDate: new Date("2026-07-03T00:00:00.000Z"),
    timeStart: "16:00",
    timeEnd: "23:00",
    breakMinutes: 30,
    rateEurCents: 850,
    totalSlots: 6,
    filledSlots: 2,
    jobType: "hospitality",
    workLocation: "onsite",
    languages: ["Bulgarian", "English"],
    isActive: true,
    isFeatured: true,
  },
  {
    id: "job_sample_event_staff_sofia",
    title: "Event Staff",
    company: "Arena Events",
    description:
      "Assist with guest check-in, wristbanding and crowd guidance at an open-air concert. Comfortable shoes and a friendly attitude are a must.",
    city: "Sofia",
    mapUrl: "https://maps.google.com/?q=Arena+Armeec+Sofia",
    workDate: new Date("2026-07-05T00:00:00.000Z"),
    timeStart: "17:00",
    timeEnd: "23:30",
    breakMinutes: 0,
    rateEurCents: 900,
    totalSlots: 20,
    filledSlots: 8,
    jobType: "events",
    workLocation: "onsite",
    languages: ["Bulgarian", "English"],
    isActive: true,
    isFeatured: true,
  },
  {
    id: "job_sample_warehouse_plovdiv",
    title: "Warehouse Picker",
    company: "LogiTrans EOOD",
    description:
      "Pick and pack orders in a temperature-controlled distribution centre. Scanner training provided. Ability to lift up to 15 kg required.",
    city: "Plovdiv",
    mapUrl: "https://maps.google.com/?q=LogiTrans+Plovdiv",
    workDate: new Date("2026-07-07T00:00:00.000Z"),
    timeStart: "08:00",
    timeEnd: "16:30",
    breakMinutes: 60,
    rateEurCents: 750,
    totalSlots: 10,
    filledSlots: 0,
    jobType: "logistics",
    workLocation: "onsite",
    languages: ["Bulgarian"],
    isActive: true,
    isFeatured: false,
  },
  {
    id: "job_sample_retail_varna",
    title: "Retail Sales Assistant",
    company: "SeaMall Varna",
    description:
      "Help customers on the shop floor, restock shelves and operate the till during the weekend rush at a busy seaside shopping centre.",
    city: "Varna",
    mapUrl: "https://maps.google.com/?q=SeaMall+Varna",
    workDate: new Date("2026-07-11T00:00:00.000Z"),
    timeStart: "10:00",
    timeEnd: "18:00",
    breakMinutes: 45,
    rateEurCents: 800,
    totalSlots: 4,
    filledSlots: 1,
    jobType: "retail",
    workLocation: "onsite",
    languages: ["Bulgarian", "English", "Russian"],
    isActive: true,
    isFeatured: false,
  },
  {
    id: "job_sample_promoter_burgas",
    title: "Brand Promoter",
    company: "Sunny Brands",
    description:
      "Hand out samples and engage beachgoers as part of a summer product activation. Outgoing personality and spoken English essential.",
    city: "Burgas",
    mapUrl: null,
    workDate: new Date("2026-07-18T00:00:00.000Z"),
    timeStart: "11:00",
    timeEnd: "17:00",
    breakMinutes: 30,
    rateEurCents: 950,
    totalSlots: 8,
    filledSlots: 8,
    jobType: "marketing",
    workLocation: "onsite",
    languages: ["Bulgarian", "English"],
    isActive: false,
    isFeatured: false,
  },
];

async function main() {
  console.log(`Seeding ${sampleJobs.length} sample jobs...`);

  for (const job of sampleJobs) {
    const minutes = workedMinutes(job.timeStart, job.timeEnd, job.breakMinutes);
    const hours = minutes / 60;
    const rateLvCents = Math.round(job.rateEurCents * BGN_PER_EUR);
    const totalEurCents = Math.round(job.rateEurCents * hours);
    const totalLvCents = Math.round(rateLvCents * hours);

    const { id, ...data } = job;
    const fields = { ...data, rateLvCents, totalEurCents, totalLvCents };

    await prisma.job.upsert({
      where: { id },
      update: fields,
      create: { id, ...fields },
    });

    console.log(`  ✓ ${job.title} — ${job.city} (${hours}h)`);
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
