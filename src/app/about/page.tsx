import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา - Baimon (ใบหม่อน)",
  description: "เกี่ยวกับ Baimon (ใบหม่อน) เว็บไซต์คำนวณและแบ่งค่าใช้จ่ายสำหรับคนไทย โดย Lomana Loma",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-180 px-5 py-14 md:py-20">
      <div className="mb-2 flex items-center gap-2 text-primary">
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          verified_user
        </span>
        <span className="label-caps">Lomana Loma</span>
      </div>
      <h1 className="font-headline text-[28px] font-semibold text-on-surface md:text-[32px]">
        เกี่ยวกับเรา
      </h1>
      <p className="mt-1 text-on-surface-variant">
        Baimon (ใบหม่อน) — เครื่องมือคำนวณแบ่งเงินที่โปร่งใสและง่ายที่สุดสำหรับทุกคน
      </p>

      <div className="mt-8 space-y-6">
        <section className="glass-card rounded-xl p-6">
          <h2 className="font-headline text-[18px] font-semibold text-primary">
            ความเป็นมาและพันธกิจ
          </h2>
          <p className="mt-2 leading-relaxed text-on-surface-variant">
            <strong>Baimon (ใบหม่อน)</strong> ถูกพัฒนาขึ้นโดยทีมงาน <strong>Lomana Loma</strong> ด้วยความตั้งใจที่จะแก้ปัญหาความยุ่งยากในการคิดคำนวณค่าใช้จ่ายในชีวิตประจำวัน ไม่ว่าจะเป็นการหารค่าอาหารกับกลุ่มเพื่อน การแบ่งจ่ายตามโครงการช่วยเหลือของภาครัฐ เช่น คนละครึ่ง หรือโครงการไทยช่วยไทย 60/40
          </p>
          <p className="mt-3 leading-relaxed text-on-surface-variant">
            เรามุ่งมั่นสร้างเครื่องมือดิจิทัลที่ใช้งานง่าย โหลดรวดเร็ว มีความแม่นยำสูง และเคารพความเป็นส่วนตัวของผู้ใช้งานอย่างแท้จริง
          </p>
        </section>

        <section className="glass-card rounded-xl p-6">
          <h2 className="font-headline text-[18px] font-semibold text-primary">
            จุดเด่นของบริการเรา
          </h2>
          <ul className="mt-3 space-y-2 text-on-surface-variant">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">check_circle</span>
              <span><strong>คำนวณแม่นยำระดับสตางค์:</strong> จัดการเศษทศนิยมอย่างถูกต้องและเป็นธรรมสำหรับทุกคนในกลุ่ม</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">check_circle</span>
              <span><strong>คำนวณในเครื่องของคุณทันที (Client-side):</strong> ประมวลผลบนเบราว์เซอร์ของผู้ใช้โดยตรง ไม่มีการส่งข้อมูลตัวเลขไปยังเซิร์ฟเวอร์</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">check_circle</span>
              <span><strong>ปลอดภัย ไม่เก็บข้อมูลส่วนบุคคล:</strong> ไม่ต้องสมัครสมาชิก ไม่ต้องล็อกอิน ใช้งานได้ฟรีทันที</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">check_circle</span>
              <span><strong>รองรับส่วนลด:</strong> สามารถคำนวณส่วนลดทั้งแบบเปอร์เซ็นต์ (%) และบาท ก่อนแบ่งยอดได้</span>
            </li>
          </ul>
        </section>

        <section className="glass-card rounded-xl p-6">
          <h2 className="font-headline text-[18px] font-semibold text-primary">
            ทีมงานและผู้พัฒนา
          </h2>
          <p className="mt-2 leading-relaxed text-on-surface-variant">
            Baimon เป็นหนึ่งในผลงานสร้างสรรค์ภายใต้ <strong>Lomana Loma</strong> เราพัฒนาเว็บแอปพลิเคชันและเครื่องมือเพื่อเพิ่มความสะดวกสบายในการใช้ชีวิตประจำวัน หากคุณมีข้อเสนอแนะ ข้อคิดเห็น หรือต้องการร่วมงานกับเรา สามารถติดต่อเราได้เสมอ
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
