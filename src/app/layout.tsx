import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "baimon (ใบหม่อน) - คำนวนแบ่งเงิน",
  description: "คำนวณคนละครึ่ง ไทยช่วยไทย 60/40 และหารเงินกันเอง",
};

const navItems = [
  { href: "/split-half", label: "คนละครึ่ง" },
  { href: "/thai-help", label: "ไทยช่วยไทย" },
  { href: "/party", label: "หารกัน" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold text-pink-600">
              baimon (ใบหม่อน)
            </Link>
            <nav className="flex gap-4 text-sm text-gray-700">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-pink-600">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">{children}</main>
        <footer className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
          baimon (ใบหม่อน) คำนวณแบ่งเงิน
        </footer>
      </body>
    </html>
  );
}