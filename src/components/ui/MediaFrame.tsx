import { cn } from "@/lib/cn";

type MediaFrameProps = {
  label: string;
  aspect?: string;
  caption?: boolean;
  className?: string;
};

/**
 * Elegant placeholder for photography/video that hasn't been supplied yet.
 * Swap the parent usage for a real `next/image` (or `<video>`) once assets
 * arrive — this component is intentionally the only thing that needs to change.
 */
export function MediaFrame({
  label,
  aspect = "aspect-[3/4]",
  caption = false,
  className,
}: MediaFrameProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-[#f4efe3] via-[#faf9f7] to-[#ece2c9]",
        aspect,
        className,
      )}
    >
      <div className="absolute inset-3 border border-gold/25 sm:inset-4" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          aria-hidden="true"
          className="font-serif text-[18vw] leading-none text-gold/15 sm:text-[8vw]"
        >
          C
        </span>
      </div>
      {caption && (
        <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-ink-soft/70 sm:bottom-6 sm:left-6">
          {label}
        </span>
      )}
    </div>
  );
}
