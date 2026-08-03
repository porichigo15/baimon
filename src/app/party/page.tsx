"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { splitParty } from "../../calc/splitParty";
import { formatBaht } from "../../lib/format";
import { AdBanner } from "../../components/AdBanner";

export default function PartyPage() {
  const [amount, setAmount] = useState("");
  const [people, setPeople] = useState("");
  const [shares, setShares] = useState<number[] | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(amount);
    const count = Math.floor(Number(people));
    if (!Number.isFinite(value) || value < 0) return;
    if (!Number.isFinite(count) || count < 1) return;
    setShares(splitParty(value, count));
  }

  const total = shares ? shares.reduce((sum, share) => sum + share, 0) : null;

  return (
    <section>
      <h1 className="text-2xl font-bold text-gray-900">หารกัน</h1>
      <p className="mt-1 text-sm text-gray-600">แบ่งเงินกันเองให้เท่าๆ กันทุกคน</p>

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
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="เช่น 1000"
          />
        </div>
        <div>
          <label htmlFor="people" className="block text-sm font-medium text-gray-700">
            แบ่งให้กี่คน
          </label>
          <input
            id="people"
            type="number"
            step="1"
            min="1"
            inputMode="numeric"
            value={people}
            onChange={(event) => setPeople(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="เช่น 4"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
        >
          คำนวณ
        </button>
      </form>

      {shares && (
        <div className="mt-6 space-y-3 rounded-2xl border border-gray-200 p-5">
          {shares.map((share, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="font-medium text-gray-600">
                คนที่ {index + 1}
                {index === 0 && shares.length > 1 ? " (ได้เศษ)" : ""}
              </span>
              <span className="text-lg font-bold text-gray-900">{formatBaht(share)}</span>
            </div>
          ))}
          <p className="border-t border-gray-100 pt-2 text-right text-sm text-gray-700">
            รวม {formatBaht(total ?? 0)}
          </p>
        </div>
      )}

      <AdBanner slot="3333333333" />
    </section>
  );
}