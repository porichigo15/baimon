"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "หน้าแรก" },
  { href: "/party", label: "หารกัน" },
  { href: "/thai-help", label: "ไทยช่วยไทย" },
  { href: "/split-half", label: "คนละครึ่ง" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="md:hidden"
        aria-label="เมนู"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        onClick={() => setOpen(true)}
      >
        <span className="material-symbols-outlined text-on-surface">menu</span>
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-60">
            <button
              type="button"
              aria-label="ปิดเมนู"
              className="absolute inset-0 h-full w-full cursor-default bg-black/40"
              onClick={() => setOpen(false)}
            />
            <div
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="เมนูหลัก"
              className="absolute inset-y-0 right-0 flex w-72 flex-col bg-surface-container-low shadow-2xl transition-transform duration-300"
            >
              <div className="flex items-center justify-between border-b border-outline-variant/40 p-5">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo.png" alt="Baimon Logo" className="h-8 w-8" />
                  <span className="font-headline text-[18px] font-bold text-primary">
                    Baimon (ใบหม่อน)
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="ปิดเมนู"
                  className="text-on-surface-variant transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-4" aria-label="เมนูมือถือ">
                {items.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`rounded-lg px-4 py-3 text-[15px] transition-colors ${
                        active
                          ? "bg-primary/10 font-bold text-primary"
                          : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}