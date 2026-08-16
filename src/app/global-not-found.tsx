import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Not Found | Clovera Bridal",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
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
        <a
          href="/"
          className="mt-9 inline-flex min-h-11 items-center justify-center border border-ink px-7 text-[13px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          Back to Home
        </a>
      </body>
    </html>
  );
}
