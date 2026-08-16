"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navLinks } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { LocaleSwitch } from "@/components/layout/LocaleSwitch";
import { cn } from "@/lib/cn";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="font-serif text-2xl tracking-wide text-ink"
          onClick={() => setOpen(false)}
        >
          Clovera Bridal
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-[13px] uppercase tracking-[0.14em] transition-colors hover:text-gold",
                  active ? "text-ink" : "text-ink-soft",
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LocaleSwitch />
          <Button href="/book" variant="primary" className="px-6">
            {t("book")}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
        >
          <span className="relative block h-4 w-6" aria-hidden="true">
            <span
              className={cn(
                "absolute left-0 h-px w-6 bg-ink transition-all duration-200",
                open ? "top-2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-2 h-px w-6 bg-ink transition-opacity duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-px w-6 bg-ink transition-all duration-200",
                open ? "top-2 -rotate-45" : "top-4",
              )}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-paper px-6 pb-8 pt-2 lg:hidden"
        >
          <ul className="flex flex-col divide-y divide-line">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-sm uppercase tracking-[0.14em] text-ink"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <LocaleSwitch />
            <Button
              href="/book"
              variant="primary"
              onClick={() => setOpen(false)}
            >
              {t("book")}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
