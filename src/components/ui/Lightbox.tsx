"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export type LightboxImage = { src: string; alt: string };

type LightboxProps = {
  images: LightboxImage[];
  /** Index of the image being shown, or null when closed. */
  index: number | null;
  onIndexChange: (index: number | null) => void;
  label: string;
};

/** Full-screen photo viewer: arrows, keyboard, swipe, scroll lock. */
export function Lightbox({ images, index, onIndexChange, label }: LightboxProps) {
  const t = useTranslations("common");
  const swipeStart = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = images.length;

  const close = useCallback(() => onIndexChange(null), [onIndexChange]);
  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [index, close, step]);

  if (index === null) return null;
  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col bg-surface-dark/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={close}
    >
      <div className="flex items-center justify-between px-6 py-5 sm:px-8">
        <span className="text-xs uppercase tracking-[0.2em] text-gold-soft">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
          aria-label={t("close")}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:bg-paper/10"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        className="relative flex-1 touch-pan-y px-3 pb-6 sm:px-20"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => {
          swipeStart.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipeStart.current === null) return;
          const dx = e.clientX - swipeStart.current;
          swipeStart.current = null;
          if (Math.abs(dx) > 60) step(dx > 0 ? -1 : 1);
        }}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="100vw"
          className="select-none object-contain p-3 sm:p-0"
          draggable={false}
          priority
        />
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label={t("previous")}
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-paper/20 bg-surface-dark/40 text-paper transition-colors hover:bg-paper/10 sm:left-5"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11.5 3.5L6 9l5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label={t("next")}
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-paper/20 bg-surface-dark/40 text-paper transition-colors hover:bg-paper/10 sm:right-5"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M6.5 3.5L12 9l-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
