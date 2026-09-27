"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { splitThaiHelp, DAILY_LIMIT } from "../../calc/splitThaiHelp";
import { applyDiscount, type DiscountType } from "../../calc/discount";
import { formatBaht } from "../../lib/format";
import { AdBanner } from "../../components/AdBanner";
import { Banner } from "../../components/Banner";
import { DiscountInput } from "../../components/DiscountInput";
import { DISPLAY_ADS } from "../../lib/config";

interface Result {
  govShare: number;
  userShare: number;
  newRemaining: number;
}

export default function ThaiHelpPage() {
  const [amount, setAmount] = useState("");
  const [remaining, setRemaining] = useState("200");
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState<DiscountType>("percent");
  const [result, setResult] = useState<Result | null>(null);
  const [base, setBase] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(amount);
    if (!Number.isFinite(value) || value < 0) return;
    const limit = remaining.trim() === "" ? DAILY_LIMIT : Number(remaining);
    const validLimit = Number.isFinite(limit) && limit >= 0 ? limit : DAILY_LIMIT;

    const reduced = applyDiscount(value, discountType, Number(discount) || 0);
    const { govShare, userShare, newRemaining } = splitThaiHelp(reduced, validLimit);
    setBase(reduced);
    setHasDiscount(Number(discount) > 0);
    setResult({ govShare, userShare, newRemaining });

    window.scrollTo({ top: 700, behavior: "smooth" });
  }

  return (
    <div className="mx-auto max-w-150 px-5 pb-16 pt-12 md:py-16">
      <div className="text-center md:text-left">
        <h1 className="font-headline text-[28px] font-semibold text-on-surface md:text-[32px]">
          คำนวณไทยช่วยไทย 60/40
        </h1>
      </div>

      <Banner imagePath="/images/thai-help.png" />

      <div className="glass-card mb-6 flex items-center justify-between rounded-xl p-6 mt-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined" aria-hidden="true">verified_user</span>
          </div>
          <div>
            <p className="text-sm text-on-surface-variant">สวัสดิการภาครัฐ</p>
            <p className="font-semibold text-on-surface">
              รัฐสนับสนุนสูงสุด {formatBaht(DAILY_LIMIT)} / วัน (กำหนดสิทธิ์คงเหลือได้)
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="label-caps text-primary/80">
              ยอดเงินที่จ่าย (บาท)
            </label>
            <div className="group flex items-center gap-3 border-b border-outline-variant/30 transition-all focus-within:border-b-2 focus-within:border-primary">
              <span
                className="material-symbols-outlined text-on-surface-variant/50 transition-colors group-focus-within:text-primary"
                aria-hidden="true"
              >
                payments
              </span>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="w-full bg-transparent py-4 text-on-surface outline-none placeholder:text-on-surface-variant/30"
                placeholder="เช่น 1500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="remaining" className="label-caps text-primary/80">
              วงเงินสิทธิ์รัฐคงเหลือ (บาท)
            </label>
            <div className="group flex items-center gap-3 border-b border-outline-variant/30 transition-all focus-within:border-b-2 focus-within:border-primary">
              <span
                className="material-symbols-outlined text-on-surface-variant/50 transition-colors group-focus-within:text-primary"
                aria-hidden="true"
              >
                account_balance_wallet
              </span>
              <input
                id="remaining"
                type="number"
                step="0.01"
                min="0"
                inputMode="decimal"
                value={remaining}
                onChange={(event) => setRemaining(event.target.value)}
                className="w-full bg-transparent py-4 text-on-surface outline-none placeholder:text-on-surface-variant/30"
                placeholder="200"
              />
            </div>
          </div>

          <DiscountInput
            value={discount}
            type={discountType}
            onValueChange={setDiscount}
            onTypeChange={setDiscountType}
          />
          <button
            type="submit"
            className="calculate-btn-gradient flex w-full items-center justify-center gap-2 rounded-lg py-4 font-bold text-on-primary transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined" aria-hidden="true">calculate</span>
            คำนวณ
          </button>
        </form>

        {result && (
          <div className="mt-8 rounded-xl border-l-4 border-primary bg-surface-container-highest p-8">
            {hasDiscount && (
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">ยอดหลังหักส่วนลด</span>
                <span className="font-bold text-on-surface">{formatBaht(base)}</span>
              </div>
            )}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <p className="label-caps mb-1 text-on-surface-variant">
                  รัฐช่วยจ่าย (เงินสนับสนุน)
                </p>
                <p className="text-[24px] font-bold text-primary">
                  {formatBaht(result.govShare)}
                </p>
              </div>
              <div>
                <p className="label-caps mb-1 text-on-surface-variant">ต้องจ่ายเอง</p>
                <p className="text-[24px] font-bold text-on-surface">
                  {formatBaht(result.userShare)}
                </p>
              </div>
              <div className="border-t border-outline-variant/30 pt-4">
                <p className="label-caps mb-1 text-on-surface-variant">
                  สิทธิ์คงเหลือหลังจ่ายบิลนี้
                </p>
                <p className="text-[18px] font-semibold text-primary">
                  {formatBaht(result.newRemaining)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 space-y-8">
        <section className="glass-card rounded-xl p-6 md:p-8">
          <h2 className="font-headline text-[20px] font-semibold text-primary">
            หลักการคำนวณไทยช่วยไทย 60/40
          </h2>
          <p className="mt-3 leading-relaxed text-on-surface-variant">
            โครงการไทยช่วยไทย 60/40 เป็นระบบสนับสนุนค่าใช้จ่ายที่ภาครัฐช่วยออกให้ 60% ของยอดซื้อสินค้าหรือบริการ และผู้ใช้จ่ายเอง 40% โดยมีการกำหนดเพดานเงินสนับสนุนสูงสุดที่ <strong>200 บาท ต่อวัน</strong>
          </p>
          <div className="my-4 rounded-lg bg-surface-container-high p-4 text-center font-mono text-sm text-primary font-bold">
            รัฐช่วยจ่าย = ขั้นต่ำของ (ยอดสุทธิ × 60%, เพดาน 200 บาท)
          </div>
          <p className="leading-relaxed text-on-surface-variant">
            หากยอดเงินคำนวณ 60% เกิน 200 บาท รัฐจะช่วยจ่ายสูงสุดที่ 200 บาท ส่วนต่างที่เหลือผู้ใช้บริการจะเป็นผู้ชำระทั้งหมด
          </p>
        </section>

        <section className="glass-card rounded-xl p-6 md:p-8">
          <h2 className="font-headline text-[20px] font-semibold text-primary">
            ตารางตัวอย่างการคำนวณสัดส่วน 60/40
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm text-on-surface-variant">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface font-semibold">
                  <th className="py-3 px-2">ยอดรวม</th>
                  <th className="py-3 px-2">60% ของยอด</th>
                  <th className="py-3 px-2">รัฐช่วยจ่ายจริง (ไม่เกิน 200)</th>
                  <th className="py-3 px-2">จ่ายเอง</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                <tr>
                  <td className="py-3 px-2 font-medium text-on-surface">฿100.00</td>
                  <td className="py-3 px-2">฿60.00</td>
                  <td className="py-3 px-2 text-primary font-semibold">฿60.00</td>
                  <td className="py-3 px-2">฿40.00</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium text-on-surface">฿300.00</td>
                  <td className="py-3 px-2">฿180.00</td>
                  <td className="py-3 px-2 text-primary font-semibold">฿180.00</td>
                  <td className="py-3 px-2">฿120.00</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium text-on-surface">฿500.00</td>
                  <td className="py-3 px-2">฿300.00</td>
                  <td className="py-3 px-2 text-primary font-semibold">฿200.00 (ติดเพดาน)</td>
                  <td className="py-3 px-2">฿300.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="glass-card rounded-xl p-6 md:p-8">
          <h2 className="font-headline text-[20px] font-semibold text-primary">
            คำถามที่พบบ่อย (FAQ)
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-on-surface">Q: ยอดเท่าไรจึงจะได้รับเงินสนับสนุนจากรัฐเต็มเพดาน 200 บาท?</h3>
              <p className="mt-1 text-sm text-on-surface-variant">
                เมื่อมียอดใช้จ่ายตั้งแต่ประมาณ <strong>333.34 บาทขึ้นไป</strong> ยอด 60% จะอยู่ที่ 200 บาทพอดี ซึ่งจะได้รับสิทธิสนับสนุนสูงสุดของวัน
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-on-surface">Q: ถ้ามีส่วนลดร้านค้า ต้องคิดอย่างไร?</h3>
              <p className="mt-1 text-sm text-on-surface-variant">
                ระบบจะนำส่วนลดมาหักออกจากยอดเต็มก่อน แล้วจึงนำยอดที่ต้องชำระจริงไปคำนวณตามสัดส่วน 60/40
              </p>
            </div>
          </div>
        </section>
      </div>

      {DISPLAY_ADS && <AdBanner slot="0000000000" />}
    </div>
  );
}