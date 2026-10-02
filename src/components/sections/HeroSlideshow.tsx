"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Clip = { src: string; poster: string };

const RESUME_EVENTS = ["touchend", "pointerup", "click"] as const;

export function HeroSlideshow({ clips }: { clips: Clip[] }) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const current = clips[index];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React doesn't reliably reflect the `muted` prop onto the element, and
    // iOS Safari only allows autoplay when the video is truly muted.
    video.muted = true;
    video.defaultMuted = true;

    let cancelled = false;

    const resume = () => {
      video.play().catch(() => {});
      RESUME_EVENTS.forEach((e) => window.removeEventListener(e, resume));
    };

    video.play().catch(() => {
      if (cancelled) return;
      // Autoplay was blocked (iPhone Low Power Mode, in-app browsers such as
      // Zalo or Messenger): start the clip on the visitor's first tap instead.
      RESUME_EVENTS.forEach((e) =>
        window.addEventListener(e, resume, { passive: true }),
      );
    });

    return () => {
      cancelled = true;
      RESUME_EVENTS.forEach((e) => window.removeEventListener(e, resume));
    };
  }, [current.src, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <Image
        src={clips[0].poster}
        alt="Clovera Bridal"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    );
  }

  // A single clip loops on itself natively; multiple clips cycle in
  // sequence via onEnded (loop would suppress the "ended" event needed
  // to advance).
  const single = clips.length === 1;

  return (
    <AnimatePresence mode="sync">
      <motion.video
        key={current.src}
        ref={videoRef}
        src={current.src}
        poster={current.poster}
        autoPlay
        muted
        loop={single}
        playsInline
        onEnded={single ? undefined : () => setIndex((i) => (i + 1) % clips.length)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </AnimatePresence>
  );
}
