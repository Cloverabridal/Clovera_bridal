import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg";
};

const headingSizes = {
  lg: "text-4xl sm:text-5xl",
  md: "text-3xl sm:text-4xl",
  sm: "text-2xl sm:text-3xl",
};

export function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "left",
  className,
  as: Heading = "h2",
  size = "lg",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "font-serif leading-[1.1] text-ink",
          headingSizes[size],
        )}
      >
        {heading}
      </Heading>
      {body && (
        <p className="mt-5 text-base leading-relaxed text-ink-soft">{body}</p>
      )}
    </div>
  );
}
