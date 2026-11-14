"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";

export type CarouselSlide = { src: string; w: number; h: number; alt: string };

type GalleryCarouselProps = {
  slides: CarouselSlide[];
  slideLabel: string;
  prevLabel: string;
  nextLabel: string;
  regionLabel: string;
};

const INTERVAL_MS = 3800;

/**
 * Auto-advancing photo strip. Every slide links to the gallery. Pauses while
 * the visitor hovers, focuses or touches it, and never auto-advances for
 * people who prefer reduced motion.
 */
export function GalleryCarousel({
  slides,
  slideLabel,
  prevLabel,
  nextLabel,
  regionLabel,
}: GalleryCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const advance = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    // Slide positions relative to the first slide (the track has left padding).
    const offsets = items.map((el) => el.offsetLeft - items[0].offsetLeft);
    const left = track.scrollLeft;
    const atEnd = left + track.clientWidth >= track.scrollWidth - 4;

    if (dir === 1) {
      const next = offsets.find((o) => o > left + 4);
      track.scrollTo({
        left: atEnd || next === undefined ? 0 : next,
        behavior: "smooth",
      });
    } else {
      const prev = [...offsets].reverse().find((o) => o < left - 4);
      track.scrollTo({
        left: prev ?? track.scrollWidth,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || slides.length < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) advance(1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [advance, paused, reduceMotion, slides.length]);

  const arrow =
    "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper/10 focus-visible:outline-2 focus-visible:outline-gold-soft";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={regionLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => window.setTimeout(() => setPaused(false), 6000)}
    >
      <ul
        ref={trackRef}
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 pb-2 pl-6 pr-6 [scrollbar-width:none] sm:scroll-pl-8 sm:gap-5 sm:pl-8 sm:pr-8 xl:scroll-pl-[calc((100vw-80rem)/2+2rem)] xl:pl-[calc((100vw-80rem)/2+2rem)] xl:pr-[calc((100vw-80rem)/2+2rem)] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <li
            key={slide.src}
            className="h-[22rem] shrink-0 snap-start sm:h-[28rem] lg:h-[32rem]"
            style={{ aspectRatio: `${slide.w} / ${slide.h}` }}
          >
            <Link
              href="/gallery"
              aria-label={`${slideLabel} (${i + 1}/${slides.length})`}
              className="group relative block h-full w-full overflow-hidden bg-surface-dark-soft"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={slide.w}
                height={slide.h}
                sizes="(min-width: 1024px) 700px, 90vw"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                priority={i < 2}
              />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-8 flex max-w-7xl justify-end gap-3 px-6 sm:px-8">
        <button type="button" onClick={() => advance(-1)} aria-label={prevLabel} className={arrow}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M11.5 3.5L6 9l5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" onClick={() => advance(1)} aria-label={nextLabel} className={arrow}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M6.5 3.5L12 9l-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
