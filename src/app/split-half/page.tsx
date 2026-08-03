"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { splitHalf } from "../../calc/splitHalf";
import { formatBaht } from "../../lib/format";
import { AdBanner } from "../../components/AdBanner";

export default function SplitHalfPage() {
  const [total, setTotal] = useState("");
  const [shares, setShares] = useState<[number, number] | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(total);
    if (!Number.isFinite(value) || value < 0) return;
    setShares(splitHalf(value));
  }

  return (
    <section>
      <h1 className="text-2xl font-bold text-gray-900">คำนวณคนละครึ่ง</h1>
      <p className="mt-1 text-sm text-gray-600">แบ่งเงินเท่ากัน 2 คน</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            จำนวนเงินรวม (บาท)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            value={total}
            onChange={(event) => setTotal(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="เช่น 1000"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-pink-600 px-4 py-2 font-medium text-white hover:bg-pink-700"
        >
          คำนวณ
        </button>
      </form>

      {shares && (
        <div className="mt-6 space-y-3 rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">คนที่ 1 จ่าย</span>
            <span className="text-xl font-bold text-gray-900">{formatBaht(shares[0])}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">คนที่ 2 จ่าย</span>
            <span className="text-xl font-bold text-gray-900">{formatBaht(shares[1])}</span>
          </div>
          <p className="border-t border-gray-100 pt-2 text-right text-sm text-gray-500">
            รวม {formatBaht(shares[0] + shares[1])}
          </p>
        </div>
      )}

      <AdBanner slot="1111111111" />
    </section>
  );
}