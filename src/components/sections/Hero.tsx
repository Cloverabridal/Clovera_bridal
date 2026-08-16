import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-0">
        <Reveal className="order-2 lg:order-1">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-gold">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            {t("heading")}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            {t("sub")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/book" variant="primary">
              {t("ctaPrimary")}
            </Button>
            <Button href="/collections" variant="secondary">
              {t("ctaSecondary")}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="order-1 lg:order-2">
          <MediaFrame
            label="Clovera Bridal — hero photography"
            aspect="aspect-[4/5] lg:aspect-[3/4]"
            className="lg:h-[85vh] lg:max-h-[820px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
