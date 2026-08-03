"use client";

import type { DiscountType } from "../calc/discount";

interface DiscountInputProps {
  value: string;
  type: DiscountType;
  onValueChange: (value: string) => void;
  onTypeChange: (type: DiscountType) => void;
}

export function DiscountInput({
  value,
  type,
  onValueChange,
  onTypeChange,
}: DiscountInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="label-caps text-primary/80">ส่วนลด</span>
      <div className="grid grid-cols-[1fr_2fr] gap-3">
        <select
          value={type}
          onChange={(event) => onTypeChange(event.target.value as DiscountType)}
          aria-label="ประเภทส่วนลด"
          className="rounded-lg border border-outline-variant/30 bg-surface-container-high p-4 text-on-surface outline-none transition-all focus:ring-1 focus:ring-primary/50"
        >
          <option value="percent">%</option>
          <option value="baht">บาท</option>
        </select>
        <input
          type="number"
          min="0"
          step="0.01"
          inputMode="decimal"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          aria-label="ส่วนลด"
          placeholder={type === "percent" ? "เช่น 10" : "เช่น 50"}
          className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-high p-4 text-on-surface outline-none placeholder:text-on-surface-variant/30 transition-all focus:ring-1 focus:ring-primary/50"
        />
      </div>
    </div>
  );
}