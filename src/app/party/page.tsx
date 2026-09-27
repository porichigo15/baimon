"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { splitParty } from "../../calc/splitParty";
import { applyDiscount, type DiscountType } from "../../calc/discount";
import { formatBaht } from "../../lib/format";
import { AdBanner } from "../../components/AdBanner";
import { Banner } from "../../components/Banner";
import { DiscountInput } from "../../components/DiscountInput";
import { DISPLAY_ADS } from "../../lib/config";

export default function PartyPage() {
  const [amount, setAmount] = useState("");
  const [people, setPeople] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState<DiscountType>("percent");
  const [shares, setShares] = useState<number[] | null>(null);
  const [base, setBase] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(amount);
    const count = Math.floor(Number(people));
    if (!Number.isFinite(value) || value < 0) return;
    if (!Number.isFinite(count) || count < 1) return;
    const reduced = applyDiscount(value, discountType, Number(discount) || 0);
    setBase(reduced);
    setHasDiscount(Number(discount) > 0);
    setShares(splitParty(reduced, count));

    window.scrollTo({ top: 700, behavior: "smooth" });
  }

  const total = shares ? shares.reduce((sum, share) => sum + share, 0) : null;

  return (
    <div className="relative pb-16">
      <div className="mx-auto flex max-w-150 flex-col px-5 pt-12 md:pt-20">
        <div className="text-center md:text-left">
          <h1 className="font-headline text-[28px] font-semibold text-on-surface md:text-[32px]">
            หารกัน
          </h1>
        </div>

        <Banner imagePath="/images/party.png" />

        <div className="glass-card w-full space-y-6 rounded-xl p-8 md:p-10 mt-4">
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
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  className="w-full bg-transparent p-4 text-on-surface outline-none placeholder:text-on-surface-variant/30"
                  placeholder="เช่น 1000"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="people" className="label-caps text-primary/80">
                แบ่งให้กี่คน
              </label>
              <div className="group border-b border-outline-variant/30 transition-all focus-within:border-b-2 focus-within:border-primary">
                <input
                  id="people"
                  type="number"
                  step="1"
                  min="1"
                  inputMode="numeric"
                  value={people}
                  onChange={(event) => setPeople(event.target.value)}
                  className="w-full bg-transparent p-4 text-on-surface outline-none placeholder:text-on-surface-variant/30"
                  placeholder="เช่น 4"
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
            <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/10 p-6">
              {hasDiscount && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-on-surface-variant">ยอดหลังหักส่วนลด</span>
                  <span className="font-bold text-primary">{formatBaht(base)}</span>
                </div>
              )}
              {shares.map((share, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="label-caps text-on-surface-variant">
                    คนที่ {index + 1}
                    {index === 0 && shares.length > 1 ? " (ได้เศษ)" : ""}
                  </span>
                  <span className="text-[20px] font-bold text-primary">
                    {formatBaht(share)}
                  </span>
                </div>
              ))}
              <p className="border-t border-primary/20 pt-2 text-right text-sm text-on-surface-variant">
                รวม {formatBaht(total ?? 0)}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 space-y-8">
          <section className="glass-card rounded-xl p-6 md:p-8">
            <h2 className="font-headline text-[20px] font-semibold text-primary">
              หลักการหารเงินและจัดการเศษสตางค์
            </h2>
            <p className="mt-3 leading-relaxed text-on-surface-variant">
              การหารบิลค่าอาหาร ทริปท่องเที่ยว หรือกิจกรรมกลุ่มหลายๆ คน มักเกิดปัญหาเศษสตางค์หารไม่ลงตัว Baimon ใช้ระบบ <strong>Penny Rounding Algorithm</strong> โดยคำนวณปัดเศษเป็นธรรม:
            </p>
            <div className="my-4 rounded-lg bg-surface-container-high p-4 text-center font-mono text-sm text-primary font-bold">
              ยอดจ่ายพื้นฐาน = ยอดรวมสุทธิ ÷ จำนวนคน (ปัดเศษ 2 ตำแหน่ง)
            </div>
            <p className="leading-relaxed text-on-surface-variant">
              หากมีเศษสตางค์คงเหลือจากการหาร ระบบจะนำเศษนั้นไปรวมไว้ที่ <strong>คนที่ 1</strong> เพื่อรับประกันว่ายอดรวมที่เพื่อนทุกคนโอนมารวมกันจะตรงกับยอดบิลจริงพอดี 100% ไม่ขาดไม่เกิน
            </p>
          </section>

          <section className="glass-card rounded-xl p-6 md:p-8">
            <h2 className="font-headline text-[20px] font-semibold text-primary">
              ตัวอย่างการหารเงินในกลุ่ม
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm text-on-surface-variant">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-on-surface font-semibold">
                    <th className="py-3 px-2">ยอดรวม</th>
                    <th className="py-3 px-2">จำนวนคน</th>
                    <th className="py-3 px-2">คนที่ 1 จ่าย (รวมเศษ)</th>
                    <th className="py-3 px-2">คนอื่นๆ แต่ละคนจ่าย</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  <tr>
                    <td className="py-3 px-2 font-medium text-on-surface">฿100.00</td>
                    <td className="py-3 px-2">3 คน</td>
                    <td className="py-3 px-2 text-primary font-semibold">฿33.34</td>
                    <td className="py-3 px-2">฿33.33</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-medium text-on-surface">฿1,000.00</td>
                    <td className="py-3 px-2">6 คน</td>
                    <td className="py-3 px-2 text-primary font-semibold">฿166.70</td>
                    <td className="py-3 px-2">฿166.66</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-medium text-on-surface">฿2,500.00</td>
                    <td className="py-3 px-2">4 คน</td>
                    <td className="py-3 px-2 text-primary font-semibold">฿625.00</td>
                    <td className="py-3 px-2">฿625.00</td>
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
                <h3 className="font-semibold text-on-surface">Q: รองรับการหารสูงสุดกี่คน?</h3>
                <p className="mt-1 text-sm text-on-surface-variant">
                  สามารถใส่จำนวนคนได้ตั้งแต่ 1 คนขึ้นไปได้ไม่จำกัด ระบบจะคำนวณและแจกแจงรายบุคคลให้อย่างละเอียดทันที
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-on-surface">Q: หากร้านมี Service Charge หรือภาษีมูลค่าเพิ่ม (VAT) ควรใส่ยอดไหน?</h3>
                <p className="mt-1 text-sm text-on-surface-variant">
                  ควรใส่ยอดรวมสุทธิสุดท้ายจากใบเสร็จ (Grand Total) เพื่อให้ผลรวมการหารกระจายยอดค่าบริการและภาษีให้ทุกคนอย่างเท่าเทียม
                </p>
              </div>
            </div>
          </section>
        </div>

        {DISPLAY_ADS && <AdBanner slot="0000000000" />}
      </div>
    </div>
  );
}