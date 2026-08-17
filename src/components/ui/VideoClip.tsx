"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type VideoClipProps = {
  src: string;
  poster: string;
  className?: string;
  alt?: string;
};

export function VideoClip({ src, poster, className, alt = "" }: VideoClipProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn("relative h-full w-full", className)}>
      {shouldReduceMotion ? (
        <Image
          src={poster}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover"
        />
      ) : (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover"
          aria-label={alt || undefined}
        />
      )}
    </div>
  );
}
