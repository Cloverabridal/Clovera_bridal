"use client";

import { useRef, useState } from "react";
import { Link } from "@/i18n/navigation";

type ReviewVideoProps = {
  src: string;
  poster: string;
  label: string;
  meta?: string;
  playLabel: string;
  gownLabel?: string;
  gownHref?: string;
};

/**
 * Vertical video testimonial. Shows the poster with a play button and only
 * downloads the video once the visitor presses play (it is ~15MB with sound).
 */
export function ReviewVideo({
  src,
  poster,
  label,
  meta,
  playLabel,
  gownLabel,
  gownHref,
}: ReviewVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    // Called straight from the tap so iOS allows playback with sound.
    videoRef.current?.play().catch(() => {});
  };

  return (
    <figure className="w-full max-w-[380px]">
      <div className="relative aspect-[9/16] overflow-hidden bg-surface-dark">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          controls={started}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!started && (
          <button
            type="button"
            onClick={start}
            aria-label={`${playLabel}: ${label}`}
            className="group absolute inset-0 flex items-center justify-center bg-surface-dark/10 transition-colors hover:bg-surface-dark/25 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-gold-soft"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-soft/50 bg-surface-dark/80 text-gold-soft shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="ml-1"
              >
                <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-5">
        <p className="text-xs uppercase tracking-[0.2em] text-ink">{label}</p>
        {meta && <p className="mt-1.5 text-sm text-ink-soft">{meta}</p>}
        {gownLabel &&
          (gownHref ? (
            <Link
              href={gownHref}
              className="mt-3 inline-block text-xs uppercase tracking-[0.14em] text-gold underline-offset-4 hover:underline"
            >
              {gownLabel} →
            </Link>
          ) : (
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-gold">
              {gownLabel}
            </p>
          ))}
      </figcaption>
    </figure>
  );
}
