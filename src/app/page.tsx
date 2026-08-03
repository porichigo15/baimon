import type { Metadata } from "next";
import Link from "next/link";
import { AdBanner } from "../components/AdBanner";

export const metadata: Metadata = {
  title: "baimon (ใบหม่อน) - คำนวณแบ่งเงิน",
};

const calculators = [
  {
    href: "/split-half",
    title: "คำนวณคนละครึ่ง",
    emoji: "💸",
    description: "แบ่งเงินเท่ากัน 2 คน ใครจ่ายคนละครึ่งพอดี",
    highlight: "bg-pink-50 hover:bg-pink-100",
  },
  {
    href: "/thai-help",
    title: "คำนวณไทยช่วยไทย 60/40",
    emoji: "🇹🇭",
    description: "รัฐช่วยจ่าย 60% สูงสุด 200 บาท/วัน ที่เหลือจ่ายเอง",
    highlight: "bg-sky-50 hover:bg-sky-100",
  },
  {
    href: "/party",
    title: "หารกัน",
    emoji: "🎉",
    description: "หารเงินกันเองให้เท่าๆ กันทุกคน",
    highlight: "bg-emerald-50 hover:bg-emerald-100",
  },
];

export default function Home() {
  return (
    <section>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">baimon (ใบหม่อน)</h1>
        <p className="mt-2 text-gray-600">คำนวณแบ่งเงิน แบ่งจ่าย อย่างง่ายใน 3 วิธี</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {calculators.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className={`rounded-2xl border border-gray-200 p-5 shadow-sm transition ${calc.highlight}`}
          >
            <div className="text-3xl">{calc.emoji}</div>
            <h2 className="mt-3 font-bold text-gray-900">{calc.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{calc.description}</p>
          </Link>
        ))}
      </div>
      <AdBanner />
    </section>
  );
}