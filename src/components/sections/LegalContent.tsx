import { Reveal } from "@/components/ui/Reveal";

type LegalContentProps = {
  heading: string;
  updated: string;
  body: string;
};

export function LegalContent({ heading, updated, body }: LegalContentProps) {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal>
          <h1 className="font-serif text-4xl text-ink sm:text-5xl">
            {heading}
          </h1>
          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-ink-soft/70">
            {updated}
          </p>
          <p className="mt-8 text-base leading-relaxed text-ink-soft">
            {body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
