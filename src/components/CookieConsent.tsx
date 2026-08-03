"use client";

import { useSyncExternalStore } from "react";
import { getConsent, subscribeConsent, writeConsent } from "../lib/consent";

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null);

  if (consent) return null;

  return (
    <div
      role="dialog"
      aria-label="การยอมรับคุกกี้"
      className="fixed inset-x-0 bottom-4 z-50 px-4"
    >
      <div className="glass-card mx-auto flex w-full max-w-2xl flex-col items-center gap-4 rounded-xl p-5 sm:flex-row">
        <span className="material-symbols-outlined text-primary" aria-hidden="true">
          cookie
        </span>
        <p className="flex-1 text-sm text-on-surface-variant">
          เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานเว็บไซต์และแสดงโฆษณาที่เกี่ยวข้อง
          คุณสามารถเลือกการยอมรับได้ตลอดเวลา
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => writeConsent("declined")}
            className="rounded-lg border border-outline-variant/40 px-4 py-2 text-sm text-on-surface transition-colors hover:bg-surface-container-high"
          >
            ปฏิเสธ
          </button>
          <button
            type="button"
            onClick={() => writeConsent("accepted")}
            className="calculate-btn-gradient rounded-lg px-4 py-2 text-sm font-bold text-on-primary transition-all hover:brightness-110"
          >
            ยอมรับทั้งหมด
          </button>
        </div>
      </div>
    </div>
  );
}