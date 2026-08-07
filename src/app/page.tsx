import type { Metadata } from "next";
import Link from "next/link";
import { AdBanner } from "../components/AdBanner";
import { DISPLAY_ADS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Baimon (ใบหม่อน)",
};

const tools = [
  {
    href: "/party",
    title: "หารกัน",
    description: "หารเงินกันเองให้เท่าๆ กันทุกคน เหมาะสำหรับกลุ่มเพื่อนหรือมื้อค่ำสุดพิเศษ",
    image: "/images/party.png",
  },
  {
    href: "/thai-help",
    title: "คำนวณไทยช่วยไทย 60/40",
    description: "รัฐช่วยจ่าย 60% สูงสุด 200 บาท/วัน ที่เหลือจ่ายเองอย่างโปร่งใส",
    image: "/images/thai-help.png",
  },
  {
    href: "/split-half",
    title: "คำนวณคนละครึ่ง",
    description: "รัฐช่วยจ่าย 50% สูงสุด 200 บาท/วัน ที่เหลือจ่ายเองอย่างโปร่งใส",
    image: "/images/split-half.png",
  },
];

export default function Home() {
  return (
    <div className="relative pb-28">
      <section className="relative overflow-hidden pt-8 mb-8">
        <div className="hero-gradient pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-300 px-5 text-center md:px-10">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="label-caps">Lomana Loma</span>
          </div>
          <h1 className="font-headline mx-auto mb-6 max-w-3xl text-[28px] font-semibold leading-tight text-on-surface md:text-[32px]">
            คำนวณแบ่งเงิน แบ่งจ่าย <br className="hidden md:block" />
            <span className="text-primary">อย่างง่ายใน 3 วิธี</span>
          </h1>
          <p className="mx-auto mb-12 max-w-xl text-on-surface-variant">
            จัดการเรื่องเงินที่แสนวุ่นวายให้เป็นเรื่องง่าย ด้วยระบบคำนวณที่แม่นยำและรวดเร็วที่สุดสำหรับคนไทย
          </p>
        </div>
      </section>

      <section id="tools" className="pb-16">
        <div className="mx-auto max-w-300 px-5 md:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="glass-card group flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tool.image}
                  alt={tool.title}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
                <div className="flex flex-col gap-3 p-8">
                  <h3 className="font-headline text-[24px] font-semibold text-on-surface">
                    {tool.title}
                  </h3>
                  <p className="text-on-surface-variant/80">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {DISPLAY_ADS && <AdBanner slot="0000000000" />}
    </div>
  );
}