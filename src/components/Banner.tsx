"use client";

import { useState } from "react";

export function Banner({ imagePath }: { imagePath: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="mx-auto mt-10 w-full max-w-150">
        <div className="flex min-h-30 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-outline-variant/40 bg-surface-container-low p-4 text-center">
          <span className="material-symbols-outlined text-on-surface-variant/40" aria-hidden="true">
            image
          </span>
          <span className="label-caps text-on-surface-variant/50">
            เพิ่มไฟล์ {imagePath.replace(/^\//, "")} ในโฟลเดอร์ public/ เพื่อแสดงแบนเนอร์
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-150">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imagePath}
        alt="แบนเนอร์"
        className="h-40 w-full rounded-xl object-cover md:h-56"
        onError={() => setFailed(true)}
      />
    </div>
  );
}