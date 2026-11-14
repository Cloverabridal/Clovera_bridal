"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox, type LightboxImage } from "@/components/ui/Lightbox";

export type AlbumPhoto = LightboxImage & { w: number; h: number };

type AlbumGalleryProps = {
  photos: AlbumPhoto[];
  label: string;
};

/**
 * Editorial masonry that keeps each photo's real proportions, with a
 * full-screen viewer on click.
 */
export function AlbumGallery({ photos, label }: AlbumGalleryProps) {
  const t = useTranslations("gallery");
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 lg:gap-5">
        {photos.map((photo, i) => (
          <Reveal key={photo.src} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${t("openPhoto")} ${i + 1}`}
              className="group relative block w-full cursor-zoom-in overflow-hidden bg-paper-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.w}
                height={photo.h}
                sizes="(min-width: 1024px) 32vw, 50vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority={i < 3}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-surface-dark/0 transition-colors duration-300 group-hover:bg-surface-dark/15"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox
        images={photos}
        index={index}
        onIndexChange={setIndex}
        label={label}
      />
    </>
  );
}
