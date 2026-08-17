"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function LocaleSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const options: Array<{ code: "en" | "vi"; label: string }> = [
    { code: "en", label: "EN" },
    { code: "vi", label: "VI" },
  ];

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs tracking-[0.1em] text-paper/50",
        className,
      )}
    >
      {options.map((option, index) => (
        <span key={option.code} className="flex items-center gap-1">
          {index > 0 && <span aria-hidden="true">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: option.code })}
            aria-current={locale === option.code}
            className={cn(
              "cursor-pointer px-1 py-2 transition-colors hover:text-gold-soft",
              locale === option.code ? "text-paper" : "text-paper/50",
            )}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
