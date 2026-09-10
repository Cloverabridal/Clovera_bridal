"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

type GalleryLightboxProps = {
  images: string[];
  /** Collection name, used to build each image's alt text. */
  name: string;
};

export function GalleryLightbox({ images, name }: GalleryLightboxProps) {
  const t = useTranslations("common");
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? i : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [index, close, prev, next]);

  const alt = (i: number) => `${name} — Look ${String(i + 1).padStart(2, "0")}`;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {images.map((src, i) => (
          <Reveal key={src} delay={(i % 3) * 0.06}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block aspect-[3/4] w-full overflow-hidden bg-paper-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Image
                src={src}
                alt={alt(i)}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                priority={i < 2}
              />
            </button>
          </Reveal>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-[120] flex flex-col bg-surface-dark/95 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={name}
        >
          <div className="flex items-center justify-between px-6 py-5 text-paper sm:px-8">
            <span className="text-xs uppercase tracking-[0.2em] text-gold-soft">
              {String(index + 1).padStart(2, "0")} / {images.length}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label={t("close")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:bg-paper/10"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-8 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={prev}
              aria-label={t("previous")}
              className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:bg-paper/10 sm:left-4"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M11.5 3.5L6 9l5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="relative h-full w-full max-w-3xl">
              <Image
                key={images[index]}
                src={images[index]}
                alt={alt(index)}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={next}
              aria-label={t("next")}
              className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:bg-paper/10 sm:right-4"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M6.5 3.5L12 9l-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
