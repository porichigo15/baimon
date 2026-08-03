import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว - Baimon (ใบหม่อน)",
  description: "นโยบายความเป็นส่วนตัวของ Baimon (ใบหม่อน)",
};

const sections = [
  {
    title: "ข้อมูลที่เราเก็บ",
    body: "เครื่องคำนวณทั้งหมดของ Baimon (ใบหม่อน) ทำงานภายในเบราว์เซอร์ของคุณเท่านั้น เรายังไม่เก็บข้อมูลส่วนบุคคล เช่น ชื่อ อีเมล หรือข้อมูลบัญชีธนาคาร และเราไม่รับชำระเงินผ่านเว็บไซต์นี้",
  },
  {
    title: "คุกกี้",
    body: "เราใช้คุกกี้ชื่อ baimon_cookie_consent เพื่อบันทึกการตัดสินใจของคุณในการยอมรับหรือปฏิเสธการใช้คุกกี้โฆษณา คุกกี้นี้ถูกจัดเก็บในเบราว์เซอร์ของคุณเท่านั้น และไม่ได้ใช้ติดตามตัวคุณข้ามเว็บไซต์",
  },
  {
    title: "โฆษณาจากบุคคลที่สาม",
    body: "เมื่อคุณยอมรับคุกกี้โฆษณา เว็บไซต์อาจแสดงโฆษณาจาก Google AdSense ซึ่งเป็นบุคคลที่สาม โดย Google อาจใช้คุกกี้เพื่อแสดงโฆษณาที่เหมาะสมกับคุณ การจัดการข้อมูลของ Google อยู่ภายใต้ นโยบายความเป็นส่วนตัวของ Google",
  },
  {
    title: "การเปิดเผยข้อมูล",
    body: "เราไม่ขายหรือเปิดเผยข้อมูลส่วนบุคคลของคุณให้แก่บุคคลที่สาม เว้นแต่จำเป็นตามกฎหมาย",
  },
  {
    title: "สิทธิ์ของคุณ",
    body: "คุณสามารถลบคุกกี้ได้ทุกเมื่อผ่านการตั้งค่าของเบราว์เซอร์ และสามารถเลือกปฏิเสธคุกกี้โฆษณาได้จากแถบแจ้งเตือนคุกกี้ของเรา",
  },
  {
    title: "ติดต่อเรา",
    body: "หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ กรุณาติดต่อเราที่ contact@lomanaloma.com",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-180 px-5 py-14 md:py-20">
      <div className="mb-2 flex items-center gap-2 text-primary">
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          verified_user
        </span>
        <span className="label-caps">Lomana Loma</span>
      </div>
      <h1 className="font-headline text-[28px] font-semibold text-on-surface md:text-[32px]">
        นโยบายความเป็นส่วนตัว
      </h1>
      <p className="mt-1 text-on-surface-variant">ปรับปรุงล่าสุด: 3 สิงหาคม 2569</p>

      <div className="mt-8 space-y-6">
        {sections.map((section) => (
          <section key={section.title} className="glass-card rounded-xl p-6">
            <h2 className="font-headline text-[18px] font-semibold text-primary">
              {section.title}
            </h2>
            {section.title === "โฆษณาจากบุคคลที่สาม" ? (
              <p className="mt-2 leading-relaxed text-on-surface-variant">
                เมื่อคุณยอมรับคุกกี้โฆษณา เว็บไซต์อาจแสดงโฆษณาจาก Google AdSense
                ซึ่งเป็นบุคคลที่สาม โดย Google อาจใช้คุกกี้เพื่อแสดงโฆษณาที่เหมาะสมกับคุณ
                การจัดการข้อมูลของ Google อยู่ภายใต้{" "}
                <a
                  className="text-primary underline underline-offset-4 transition-colors hover:brightness-110"
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  นโยบายความเป็นส่วนตัวของ Google
                </a>
              </p>
            ) : (
              <p className="mt-2 leading-relaxed text-on-surface-variant">
                {section.body}
              </p>
            )}
          </section>
        ))}
      </div>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 text-primary transition-colors hover:brightness-110"
      >
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          arrow_back
        </span>
        กลับหน้าหลัก
      </Link>
    </div>
  );
}