import { Reveal } from "@/components/ui/Reveal";

type LegalSection = { heading?: string; body: string };

type LegalContentProps = {
  heading: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalContent({
  heading,
  updated,
  intro,
  sections,
}: LegalContentProps) {
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
          <p className="mt-8 text-base leading-relaxed text-ink-soft">{intro}</p>
        </Reveal>

        <div className="mt-12 space-y-10">
          {sections.map((section, index) => (
            <Reveal key={section.heading ?? index} delay={0.05}>
              {section.heading && (
                <h2 className="font-serif text-xl text-ink sm:text-2xl">
                  <span className="mr-3 text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
              )}
              <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                {section.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
