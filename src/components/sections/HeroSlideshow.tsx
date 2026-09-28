"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Clip = { src: string; poster: string };

export function HeroSlideshow({ clips }: { clips: Clip[] }) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const current = clips[index];

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

  return (
    <AnimatePresence mode="sync">
      <motion.video
        key={current.src}
        src={current.src}
        poster={current.poster}
        autoPlay
        muted
        playsInline
        onEnded={() => setIndex((i) => (i + 1) % clips.length)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </AnimatePresence>
  );
}
