"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Floating "back to top" control. Stays hidden until the visitor has
 * scrolled a screenful down (useful on the long collection galleries),
 * then fades in at the bottom-right corner.
 */
export function ScrollToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("backToTop")}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-[5.25rem] right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold-soft/25 bg-surface-dark text-gold-soft shadow-lg shadow-surface-dark/25 transition-all duration-300 ease-out hover:bg-surface-dark-soft sm:bottom-[5.75rem] sm:right-8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
