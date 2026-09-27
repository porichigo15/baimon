"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { DAILY_LIMIT, splitHalf } from "../../calc/splitHalf";
import { applyDiscount, type DiscountType } from "../../calc/discount";
import { formatBaht } from "../../lib/format";
import { AdBanner } from "../../components/AdBanner";
import { Banner } from "../../components/Banner";
import { DiscountInput } from "../../components/DiscountInput";
import { DISPLAY_ADS } from "../../lib/config";

export default function SplitHalfPage() {
  const [total, setTotal] = useState("");
  const [remaining, setRemaining] = useState("200");
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState<DiscountType>("percent");
  const [shares, setShares] = useState<[number, number] | null>(null);
  const [newRemaining, setNewRemaining] = useState<number | null>(null);
  const [base, setBase] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(total);
    if (!Number.isFinite(value) || value < 0) return;
    const limit = remaining.trim() === "" ? DAILY_LIMIT : Number(remaining);
    const validLimit = Number.isFinite(limit) && limit >= 0 ? limit : DAILY_LIMIT;

    const reduced = applyDiscount(value, discountType, Number(discount) || 0);
    const resultShares = splitHalf(reduced, validLimit);
    setBase(reduced);
    setHasDiscount(Number(discount) > 0);
    setShares(resultShares);
    setNewRemaining(Math.max(0, validLimit - resultShares[0]));

    window.scrollTo({ top: 700, behavior: "smooth" });
  }

  return (
    <div className="mx-auto flex max-w-150 flex-col px-5 pb-16 pt-6 md:pt-10">
      {DISPLAY_ADS && <AdBanner slot="0000000000" />}

      <div className="text-center md:text-left">
        <h1 className="font-headline text-[28px] font-semibold text-on-surface md:text-[32px]">
          คำนวณคนละครึ่ง
        </h1>
      </div>

      <Banner imagePath="/images/split-half.png" />

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

      <div className="glass-card relative overflow-hidden rounded-xl p-8 mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="label-caps text-primary/80">
              จำนวนเงินรวม (บาท)
            </label>
            <div className="group border-b border-outline-variant/30 transition-all focus-within:border-b-2 focus-within:border-primary">
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                inputMode="decimal"
                value={total}
                onChange={(event) => setTotal(event.target.value)}
                className="w-full bg-transparent p-4 text-on-surface outline-none placeholder:text-on-surface-variant/30"
                placeholder="เช่น 1000"
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

        {shares && (
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
                  {formatBaht(shares[0])}
                </p>
              </div>
              <div>
                <p className="label-caps mb-1 text-on-surface-variant">ต้องจ่ายเอง</p>
                <p className="text-[24px] font-bold text-on-surface">
                  {formatBaht(shares[1])}
                </p>
              </div>
              {newRemaining !== null && (
                <div className="border-t border-outline-variant/30 pt-4">
                  <p className="label-caps mb-1 text-on-surface-variant">
                    สิทธิ์คงเหลือหลังจ่ายบิลนี้
                  </p>
                  <p className="text-[18px] font-semibold text-primary">
                    {formatBaht(newRemaining)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 space-y-8">
        <section className="glass-card rounded-xl p-6 md:p-8">
          <h2 className="font-headline text-[20px] font-semibold text-primary">
            หลักการคำนวณคนละครึ่ง (50/50)
          </h2>
          <p className="mt-3 leading-relaxed text-on-surface-variant">
            การแบ่งจ่ายแบบคนละครึ่งเป็นการหารยอดเงินออกเป็น 2 ส่วนเท่าๆ กัน (50% ต่อ 50%) เหมาะสำหรับการหารค่าใช้จ่ายระหว่างคนสองคน หรือการคำนวณเงินสนับสนุนร่วมกับภาครัฐ โดยสูตรการคำนวณพื้นฐานคือ:
          </p>
          <div className="my-4 rounded-lg bg-surface-container-high p-4 text-center font-mono text-sm text-primary font-bold">
            ยอดจ่ายแต่ละฝ่าย = (ยอดเงินรวม - ส่วนลด) ÷ 2
          </div>
          <p className="leading-relaxed text-on-surface-variant">
            หากยอดเงินมีเศษสตางค์ ระบบจะปัดเศษให้อีกฝ่ายอย่างแม่นยำ เพื่อให้ผลรวมสุดท้ายตรงกับยอดเงินที่จ่ายจริงเสมอ
          </p>
        </section>

        <section className="glass-card rounded-xl p-6 md:p-8">
          <h2 className="font-headline text-[20px] font-semibold text-primary">
            ตารางตัวอย่างการคำนวณ
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm text-on-surface-variant">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface font-semibold">
                  <th className="py-3 px-2">ยอดรวม</th>
                  <th className="py-3 px-2">ส่วนลด</th>
                  <th className="py-3 px-2">รัฐช่วยจ่าย (50%)</th>
                  <th className="py-3 px-2">จ่ายเอง (50%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                <tr>
                  <td className="py-3 px-2 font-medium text-on-surface">฿100.00</td>
                  <td className="py-3 px-2">-</td>
                  <td className="py-3 px-2 text-primary font-semibold">฿50.00</td>
                  <td className="py-3 px-2">฿50.00</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium text-on-surface">฿300.00</td>
                  <td className="py-3 px-2">10% (฿30)</td>
                  <td className="py-3 px-2 text-primary font-semibold">฿135.00</td>
                  <td className="py-3 px-2">฿135.00</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium text-on-surface">฿500.00</td>
                  <td className="py-3 px-2">-</td>
                  <td className="py-3 px-2 text-primary font-semibold">฿250.00</td>
                  <td className="py-3 px-2">฿250.00</td>
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
              <h3 className="font-semibold text-on-surface">Q: ส่วนลดถูกหักก่อนหรือหลังการหาร?</h3>
              <p className="mt-1 text-sm text-on-surface-variant">
                ระบบของ Baimon จะนำส่วนลด (ทั้งแบบ % หรือบาท) ไปหักออกจากยอดรวมก่อน แล้วจึงนำยอดสุทธิมาหาร 50/50 ทำให้ได้ตัวเลขที่ถูกต้องตามบิลจริง
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-on-surface">Q: ข้อมูลที่กรอกจะถูกบันทึกหรือไม่?</h3>
              <p className="mt-1 text-sm text-on-surface-variant">
                ไม่มีการบันทึกข้อมูลใดๆ ทั้งสิ้น การคำนวณทั้งหมดเกิดขึ้นบนอุปกรณ์ของคุณผ่านเว็บเบราว์เซอร์ จึงมีความปลอดภัยและเป็นส่วนตัว 100%
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}