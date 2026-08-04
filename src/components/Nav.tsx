"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LineIcon } from "./LineIcon";

const items = [
  { href: "/party", label: "หารกัน" },
  { href: "/thai-help", label: "ไทยช่วยไทย" },
  { href: "/split-half", label: "คนละครึ่ง" },
  { href: "https://lin.ee/ZiAamj3r", label: "เพิ่มเพื่อน" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 md:flex" aria-label="เครื่องมือคำนวณ">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`label-caps transition-colors duration-200 flex items-center gap-2 ${
              active
                ? "border-b-2 border-primary pb-1 text-primary"
                : "text-on-surface-variant/70 hover:text-primary"
            }`}
          >
            {item.label}
            {item.href.startsWith("https://lin.ee") && <LineIcon />}
          </Link>
        );
      })}
    </nav>
  );
}