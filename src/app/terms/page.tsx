import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ข้อกำหนดและเงื่อนไขการใช้งาน - Baimon (ใบหม่อน)",
  description: "ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์ Baimon (ใบหม่อน)",
};

const terms = [
  {
    title: "1. การยอมรับข้อกำหนด",
    body: "การเข้าถึงและใช้งานเว็บไซต์ Baimon (ใบหม่อน) ถือว่าคุณได้อ่าน เข้าใจ และตกลงที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขการใช้งานนี้ทั้งหมด หากคุณไม่ยอมรับข้อกำหนดเหล่านี้ กรุณาระงับการใช้งานเว็บไซต์",
  },
  {
    title: "2. วัตถุประสงค์ในการให้บริการ",
    body: "เว็บไซต์ Baimon ให้บริการเครื่องมือคำนวณและประมาณการค่าใช้จ่ายเพื่อความสะดวกของผู้ใช้งานเท่านั้น เราไม่ได้เป็นตัวแทนของหน่วยงานภาครัฐ ผู้ให้บริการทางการเงิน หรือสถาบันการเงินใดๆ ทั้งสิ้น",
  },
  {
    title: "3. ข้อจำกัดความรับผิดชอบ (Disclaimer)",
    body: "แม้ว่าเราจะพยายามพัฒนาให้ผลการคำนวณมีความถูกต้องและแม่นยำที่สุด แต่ข้อมูลและผลลัพธ์ที่ได้จากการคำนวณมีไว้เพื่อเป็นแนวทางเบื้องต้นเท่านั้น เราไม่รับประกันความสมบูรณ์ ความถูกต้อง หรือความเหมาะสมของผลลัพธ์ในทุกสถานการณ์ และจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากการนำผลการคำนวณไปใช้งาน",
  },
  {
    title: "4. ทรัพย์สินทางปัญญา",
    body: "เนื้อหา การออกแบบ โค้ด โลโก้ และเครื่องหมายการค้าบนเว็บไซต์นี้ เป็นทรัพย์สินของ Lomana Loma และได้รับการคุ้มครองตามกฎหมาย ห้ามมิให้คัดลอก ดัดแปลง หรือเผยแพร่เพื่อการค้าโดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร",
  },
  {
    title: "5. การแก้ไขเปลี่ยนแปลงข้อกำหนด",
    body: "เราขอสงวนสิทธิ์ในการปรับปรุง เปลี่ยนแปลง หรือแก้ไขข้อกำหนดการใช้งานนี้ได้ตลอดเวลาโดยไม่ต้องแจ้งให้ทราบล่วงหน้า การใช้งานเว็บไซต์อย่างต่อเนื่องหลังจากมีการเปลี่ยนแปลงถือว่าคุณยอมรับข้อกำหนดที่แก้ไขแล้ว",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-180 px-5 py-14 md:py-20">
      <div className="mb-2 flex items-center gap-2 text-primary">
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          verified_user
        </span>
        <span className="label-caps">Lomana Loma</span>
      </div>
      <h1 className="font-headline text-[28px] font-semibold text-on-surface md:text-[32px]">
        ข้อกำหนดและเงื่อนไขการใช้งาน
      </h1>
      <p className="mt-1 text-on-surface-variant">ปรับปรุงล่าสุด: 27 กันยายน 2569</p>

      <div className="mt-8 space-y-6">
        {terms.map((term) => (
          <section key={term.title} className="glass-card rounded-xl p-6">
            <h2 className="font-headline text-[18px] font-semibold text-primary">
              {term.title}
            </h2>
            <p className="mt-2 leading-relaxed text-on-surface-variant">
              {term.body}
            </p>
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
