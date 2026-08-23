import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { heroClips } from "@/content/collections";

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section className="relative flex h-[92vh] min-h-[640px] items-center justify-center overflow-hidden bg-surface-dark">
      <HeroSlideshow clips={heroClips} />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-surface-dark/85 via-surface-dark/25 to-surface-dark/55"
      />

      <Reveal className="relative z-10 mx-auto max-w-2xl px-6 text-center sm:px-8">
        <h1 className="font-serif text-3xl leading-[1.15] text-paper sm:text-4xl lg:text-5xl">
          {t("heading")}
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-paper/80">
          {t("sub")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="/book"
            variant="primary"
            className="border-gold-soft bg-gold-soft text-ink hover:border-paper hover:bg-paper hover:text-ink"
          >
            {t("ctaPrimary")}
          </Button>
          <Button
            href="/collections"
            variant="secondary"
            className="border-paper text-paper hover:bg-paper hover:text-ink"
          >
            {t("ctaSecondary")}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
