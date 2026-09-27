import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import Script from "next/script";
import { Nav } from "../components/Nav";
import { CookieConsent } from "../components/CookieConsent";
import { MobileMenu } from "../components/MobileMenu";
import { AD_CLIENT_ID } from "../lib/config";
import "./globals.css";

const notoSansThai = localFont({
  src: "../../fonts/NotoSansThai_Condensed-Regular.ttf",
  variable: "--font-noto-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Baimon (ใบหม่อน)",
  description: "คำนวณคนละครึ่ง ไทยช่วยไทย 60/40 และหารเงินกันเอง",
  other: {
    "google-adsense-account": AD_CLIENT_ID,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${notoSansThai.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <header className="sticky top-0 z-50 border-b border-outline-variant/40 bg-surface/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 w-full max-w-300 items-center justify-between px-5 md:px-10">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="font-headline text-[20px] font-bold text-primary flex items-center gap-3"
              >
                <img src="/images/logo.png" alt="Baimon Logo" className="h-10 w-10" />
                Baimon (ใบหม่อน)
              </Link>
            </div>
            <Nav />
            <MobileMenu />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-outline-variant/40 bg-surface-container-lowest">
          <div className="mx-auto flex w-full max-w-300 flex-col items-center justify-between gap-8 px-5 py-12 md:flex-row md:items-center md:px-10">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <div className="font-headline text-[20px] font-bold text-on-surface">
                Baimon (ใบหม่อน)
              </div>
              <p className="label-caps text-on-surface-variant/60">
                © 2026 Baimon (ใบหม่อน) - Lomana Loma
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link className="label-caps text-on-surface-variant transition-colors hover:text-primary" href="/about">
                เกี่ยวกับเรา
              </Link>
              <Link className="label-caps text-on-surface-variant transition-colors hover:text-primary" href="/terms">
                ข้อกำหนดการใช้งาน
              </Link>
              <Link className="label-caps text-on-surface-variant transition-colors hover:text-primary" href="/privacy">
                นโยบายความเป็นส่วนตัว
              </Link>
              <Link className="label-caps text-on-surface-variant transition-colors hover:text-primary" href="/contact">
                ติดต่อเรา
              </Link>
            </div>
          </div>
        </footer>
        <CookieConsent />
      </body>
    </html>
  );
}