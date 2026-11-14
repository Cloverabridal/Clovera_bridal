import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryCarousel } from "@/components/sections/GalleryCarousel";
import { homeSlides } from "@/content/gallery";

/** Home-page strip of featured bride photos that links to the full gallery. */
export async function GalleryHighlights() {
  const t = await getTranslations("gallery");
  const locale = await getLocale();
  const slides = homeSlides(locale === "vi" ? "vi" : "en");
  if (slides.length === 0) return null;

  return (
    <section className="overflow-hidden bg-surface-dark py-20 text-paper sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold-soft">
              {t("homeEyebrow")}
            </p>
            <h2 className="mt-3 font-serif text-2xl leading-tight sm:text-3xl">
              {t("homeHeading")}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-xs uppercase tracking-[0.14em] text-gold-soft underline decoration-gold-soft/40 underline-offset-4 transition-colors hover:text-paper"
          >
            {t("homeCta")} →
          </Link>
        </Reveal>
      </div>

      <GalleryCarousel
        slides={slides}
        slideLabel={t("slideLabel")}
        prevLabel={t("prev")}
        nextLabel={t("next")}
        regionLabel={t("carouselLabel")}
      />
    </section>
  );
}
