"use client";

import { useState, useSyncExternalStore } from "react";
import type { FormEvent } from "react";
import { splitThaiHelp, THAI_HELP_DAILY_CAP } from "../../calc/splitThaiHelp";
import { formatBaht } from "../../lib/format";
import { AdBanner } from "../../components/AdBanner";

const STORAGE_KEY = "baimon-thai-help-day";

interface StoredDay {
  date: string;
  remaining: number;
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function todayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getRemaining(): number {
  if (typeof window === "undefined") return THAI_HELP_DAILY_CAP;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw) as StoredDay;
      if (stored.date === todayString()) return stored.remaining;
    }
  } catch {
    // fall through to a fresh daily budget
  }
  return THAI_HELP_DAILY_CAP;
}

function saveRemaining(remaining: number): void {
  const stored: StoredDay = { date: todayString(), remaining };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  listeners.forEach((listener) => listener());
}

interface Result {
  govShare: number;
  userShare: number;
}

export default function ThaiHelpPage() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const remaining = useSyncExternalStore(
    subscribe,
    getRemaining,
    () => THAI_HELP_DAILY_CAP
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(amount);
    if (!Number.isFinite(value) || value < 0) return;
    const { govShare, userShare, newRemaining } = splitThaiHelp(value, remaining);
    setResult({ govShare, userShare });
    saveRemaining(newRemaining);
  }

  function handleReset() {
    setResult(null);
    saveRemaining(THAI_HELP_DAILY_CAP);
  }

  return (
    <section>
      <h1 className="text-2xl font-bold text-gray-900">คำนวณไทยช่วยไทย 60/40</h1>
      <p className="mt-1 text-sm text-gray-600">
        รัฐสนับสนุนสูงสุด{" "}
        <span className="font-semibold text-sky-700">{formatBaht(THAI_HELP_DAILY_CAP)} / วัน</span>
      </p>

      <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
        เหลือวงเงินสนับสนุนวันนี้: <span className="font-bold">{formatBaht(remaining)}</span>
        <button
          type="button"
          onClick={handleReset}
          className="ml-3 text-xs font-medium text-sky-600 underline hover:text-sky-800"
        >
          รีเซ็ตสิทธิ์วันนี้
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            ยอดเงินที่จ่าย (บาท)
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
            placeholder="เช่น 1500"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700"
        >
          คำนวณและบันทึกสิทธิ์
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">รัฐช่วยจ่าย (เงินสนับสนุน)</span>
            <span className="text-xl font-bold text-sky-700">{formatBaht(result.govShare)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">ต้องจ่ายเอง</span>
            <span className="text-xl font-bold text-gray-900">{formatBaht(result.userShare)}</span>
          </div>
          <p className="border-t border-gray-100 pt-2 text-right text-sm text-gray-700">
            เหลืองบสิทธิ์วันนี้ <span className="font-bold">{formatBaht(remaining)}</span>
          </p>
        </div>
      )}

      <AdBanner slot="2222222222" />
    </section>
  );
}