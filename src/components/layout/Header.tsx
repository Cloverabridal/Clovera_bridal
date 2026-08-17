"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navLinks, contactDetails, socialLinks } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { LocaleSwitch } from "@/components/layout/LocaleSwitch";
import { cn } from "@/lib/cn";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.8c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1l-2 2z" />
    </svg>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink text-paper">
      {/* Utility bar */}
      <div className="hidden border-b border-paper/10 lg:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 sm:px-8">
          <a
            href={contactDetails.phoneHref}
            className="flex items-center gap-2 text-xs tracking-[0.08em] text-paper/60 transition-colors hover:text-gold-soft"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            {contactDetails.phone}
          </a>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="text-paper/60 transition-colors hover:text-gold-soft"
              >
                <SocialIcon name={social.icon} className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo-icon.png"
            alt=""
            width={80}
            height={78}
            priority
            className="h-10 w-auto sm:h-11"
          />
          <span className="font-serif text-xl tracking-wide text-paper sm:text-2xl">
            Clovera Bridal
          </span>
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
                  "text-[13px] uppercase tracking-[0.14em] transition-colors hover:text-gold-soft",
                  active ? "text-paper" : "text-paper/70",
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LocaleSwitch />
          <Button
            href="/book"
            variant="primary"
            className="border-gold-soft bg-gold-soft px-6 text-ink hover:border-paper hover:bg-paper hover:text-ink"
          >
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
                "absolute left-0 h-px w-6 bg-paper transition-all duration-200",
                open ? "top-2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-2 h-px w-6 bg-paper transition-opacity duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-px w-6 bg-paper transition-all duration-200",
                open ? "top-2 -rotate-45" : "top-4",
              )}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-paper/10 bg-ink px-6 pb-8 pt-2 lg:hidden"
        >
          <ul className="flex flex-col divide-y divide-paper/10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-sm uppercase tracking-[0.14em] text-paper"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={contactDetails.phoneHref}
            className="flex items-center gap-2 py-4 text-sm uppercase tracking-[0.14em] text-paper/70 transition-colors hover:text-gold-soft"
          >
            <PhoneIcon className="h-4 w-4" />
            {contactDetails.phone}
          </a>
          <div className="flex items-center gap-5 py-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="text-paper/60 transition-colors hover:text-gold-soft"
              >
                <SocialIcon name={social.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <LocaleSwitch />
            <Button
              href="/book"
              variant="primary"
              className="border-gold-soft bg-gold-soft text-ink hover:border-paper hover:bg-paper hover:text-ink"
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
