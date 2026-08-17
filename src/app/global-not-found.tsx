import type { Metadata } from "next";
import Link from "next/link";
import { displace, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Not Found | Clovera Bridal",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${displace.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col items-center justify-center bg-paper px-6 text-center text-ink">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">404</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
          The page you&apos;re looking for isn&apos;t here. Let&apos;s take
          you back to Clovera Bridal.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex min-h-11 items-center justify-center border border-ink px-7 text-[13px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          Back to Home
        </Link>
      </body>
    </html>
  );
}
