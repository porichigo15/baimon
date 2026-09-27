import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ติดต่อเรา - Baimon (ใบหม่อน)",
  description: "ช่องทางการติดต่อทีมงาน Baimon (ใบหม่อน) และ Lomana Loma",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-180 px-5 py-14 md:py-20">
      <div className="mb-2 flex items-center gap-2 text-primary">
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          verified_user
        </span>
        <span className="label-caps">Lomana Loma</span>
      </div>
      <h1 className="font-headline text-[28px] font-semibold text-on-surface md:text-[32px]">
        ติดต่อเรา
      </h1>
      <p className="mt-1 text-on-surface-variant">
        มีข้อสงสัย ข้อเสนอแนะ หรือแจ้งปัญหาการใช้งาน ติดต่อทีมงานได้ตลอดเวลา
      </p>

      <div className="mt-8 space-y-6">
        <section className="glass-card rounded-xl p-6">
          <h2 className="font-headline text-[18px] font-semibold text-primary">
            ช่องทางการติดต่อหลัก
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[22px] mt-0.5" aria-hidden="true">
                mail
              </span>
              <div>
                <p className="font-semibold text-on-surface">อีเมลสำหรับติดต่อ</p>
                <a
                  href="mailto:contact@lomanaloma.com"
                  className="text-primary underline underline-offset-4 hover:brightness-110"
                >
                  contact@lomanaloma.com
                </a>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  สำหรับการสอบถามทั่วไป ข้อเสนอแนะ หรือการติดต่องาน
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[22px] mt-0.5" aria-hidden="true">
                schedule
              </span>
              <div>
                <p className="font-semibold text-on-surface">เวลาทำการและการตอบกลับ</p>
                <p className="text-sm text-on-surface-variant">
                  ทีมงานตอบกลับอีเมลภายใน 24–48 ชั่วโมง (วันจันทร์ – วันศุกร์)
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card rounded-xl p-6">
          <h2 className="font-headline text-[18px] font-semibold text-primary">
            แจ้งปัญหาการคำนวณหรือข้อผิดพลาด
          </h2>
          <p className="mt-2 leading-relaxed text-on-surface-variant">
            หากคุณพบว่าผลการคำนวณในหน้าใดมีความคลาดเคลื่อน หรือระบบทำงานผิดปกติ สามารถส่งรายละเอียด วันเวลาที่พบปัญหา แคปภาพหน้าจอ หรือตัวเลขที่ใช้คำนวณมายังอีเมลของเรา เพื่อให้ทีมงานดำเนินการตรวจสอบและปรับปรุงระบบให้ดียิ่งขึ้น
          </p>
        </section>
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
