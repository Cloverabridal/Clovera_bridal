import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "left",
  className,
  as: Heading = "h2",
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
      <Heading className="font-serif text-4xl leading-[1.1] text-ink sm:text-5xl">
        {heading}
      </Heading>
      {body && (
        <p className="mt-5 text-base leading-relaxed text-ink-soft">{body}</p>
      )}
    </div>
  );
}
