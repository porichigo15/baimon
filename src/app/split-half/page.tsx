"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { DAILY_LIMIT, splitHalf } from "../../calc/splitHalf";
import { applyDiscount, type DiscountType } from "../../calc/discount";
import { formatBaht } from "../../lib/format";
import { AdBanner } from "../../components/AdBanner";
import { Banner } from "../../components/Banner";
import { DiscountInput } from "../../components/DiscountInput";

export default function SplitHalfPage() {
  const [total, setTotal] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState<DiscountType>("percent");
  const [shares, setShares] = useState<[number, number] | null>(null);
  const [base, setBase] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(total);
    if (!Number.isFinite(value) || value < 0) return;
    const reduced = applyDiscount(value, discountType, Number(discount) || 0);
    setBase(reduced);
    setHasDiscount(Number(discount) > 0);
    setShares(splitHalf(reduced));
    
    window.scrollTo({ top: 700, behavior: "smooth" });
  }

  return (
    <div className="mx-auto flex max-w-150 flex-col px-5 pb-28 pt-12 md:pt-20">
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
              รัฐสนับสนุนสูงสุด {formatBaht(DAILY_LIMIT)} / วัน
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card relative overflow-hidden rounded-xl p-8 mt-6">
        <div className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-primary to-tertiary-container opacity-50" />
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
          <div className="mt-8 space-y-3 rounded-xl border border-primary/20 bg-surface-container-highest p-6">
            {hasDiscount && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">ยอดหลังหักส่วนลด</span>
                <span className="font-bold text-on-surface">{formatBaht(base)}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="label-caps text-on-surface-variant">รัฐจ่าย</span>
              <span className="text-[24px] font-bold text-primary">{formatBaht(shares[0])}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="label-caps text-on-surface-variant">เราจ่าย</span>
              <span className="text-[24px] font-bold text-primary">{formatBaht(shares[1])}</span>
            </div>
            <p className="border-t border-outline-variant/40 pt-2 text-right text-sm text-on-surface-variant">
              รวม {formatBaht(shares[0] + shares[1])}
            </p>
          </div>
        )}
      </div>

      <AdBanner slot="6666666666" />
    </div>
  );
}