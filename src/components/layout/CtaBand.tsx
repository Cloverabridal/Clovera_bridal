import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type CtaBandProps = {
  heading: ReactNode;
  body?: ReactNode;
  ctaLabel: string;
  ctaHref?: string;
  className?: string;
};

export function CtaBand({
  heading,
  body,
  ctaLabel,
  ctaHref = "/book",
  className,
}: CtaBandProps) {
  return (
    <section className={cn("bg-ink py-24 text-paper sm:py-28", className)}>
      <Reveal className="mx-auto max-w-2xl px-6 text-center sm:px-8">
        <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
          {heading}
        </h2>
        {body && <p className="mt-4 text-base text-paper/70">{body}</p>}
        <Button
          href={ctaHref}
          variant="secondary"
          className="mt-9 border-paper text-paper hover:bg-paper hover:text-ink"
        >
          {ctaLabel}
        </Button>
      </Reveal>
    </section>
  );
}
