import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { CtaBand } from "@/components/layout/CtaBand";
import { FeaturedReview } from "@/components/sections/FeaturedReview";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { reviews } from "@/content/reviews";
import { socialLinks } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/reviews">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviews" });
  return pageMetadata({
    locale,
    path: "/reviews",
    title: t("heading"),
    description: t("intro"),
  });
}

export default async function ReviewsPage({
  params,
}: PageProps<"/[locale]/reviews">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("reviews");
  const tCommon = await getTranslations("common");
  const tCollections = await getTranslations("collections");
  const tServices = await getTranslations("services");

  const collectionNames = Object.fromEntries(
    (tCollections.raw("items") as { slug: string; name: string }[]).map((i) => [
      i.slug,
      i.name,
    ]),
  );
  const serviceNames = Object.fromEntries(
    (tServices.raw("items") as { slug: string; title: string }[]).map((i) => [
      i.slug,
      i.title,
    ]),
  );

  const gownInfo = (gown?: { collection?: string; service?: string }) => ({
    label: gown?.collection
      ? collectionNames[gown.collection]
      : gown?.service
        ? serviceNames[gown.service]
        : undefined,
    href: gown?.collection ? `/collections/${gown.collection}` : undefined,
  });

  const featured = reviews.find((r) => r.featured);
  const others = reviews.filter((r) => r !== featured);

  const rated = reviews.filter((r) => r.rating);
  const average = rated.length
    ? rated.reduce((sum, r) => sum + (r.rating ?? 0), 0) / rated.length
    : null;
  const averageText =
    average === null
      ? null
      : new Intl.NumberFormat(locale, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }).format(average);

  const featuredGown = gownInfo(featured?.gown);
  const originalLanguageName =
    featured?.originalLanguage && featured.originalLanguage !== locale
      ? (new Intl.DisplayNames(locale, { type: "language" }).of(
          featured.originalLanguage,
        ) ?? featured.originalLanguage)
      : undefined;
  const translatedNote = originalLanguageName
    ? t("translatedNote", {
        // Vietnamese writes "tiếng Anh" mid-sentence: lower-case only the
        // first letter of the name Intl returns ("Tiếng Anh").
        language:
          locale === "vi"
            ? originalLanguageName.charAt(0).toLocaleLowerCase("vi") +
              originalLanguageName.slice(1)
            : originalLanguageName,
      })
    : undefined;

  return (
    <>
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              heading={t("heading")}
              body={t("intro")}
              as="h1"
            />
            {averageText && (
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gold">
                {t("summary", { average: averageText, count: rated.length })}
              </p>
            )}
          </Reveal>

          {featured && (
            <div className="mt-16">
              <FeaturedReview
                review={featured}
                locale={locale}
                gownLabel={featuredGown.label}
                gownHref={featuredGown.href}
                translatedNote={translatedNote}
                ctaLabel={tCommon("bookAppointment")}
              />
            </div>
          )}

          {others.length > 0 && (
            <div className="mt-20 columns-1 gap-6 md:columns-2 lg:columns-3">
              {others.map((review, index) => {
                const gown = gownInfo(review.gown);
                return (
                  <Reveal
                    key={review.id}
                    delay={(index % 3) * 0.06}
                    className="mb-6 break-inside-avoid"
                  >
                    <ReviewCard
                      review={review}
                      locale={locale}
                      gownLabel={gown.label}
                      gownHref={gown.href}
                      ratingLabel={
                        review.rating
                          ? t("ratingLabel", { rating: review.rating })
                          : undefined
                      }
                    />
                  </Reveal>
                );
              })}
            </div>
          )}

          {reviews.length === 0 && (
            <Reveal
              delay={0.1}
              className="mt-14 border border-line bg-paper-raised px-6 py-16 text-center sm:px-12"
            >
              <h2 className="mx-auto max-w-xl font-serif text-xl leading-snug text-ink sm:text-2xl">
                {t("emptyHeading")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                {t("emptyBody")}
              </p>
              <div className="mt-8 flex items-center justify-center gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="text-ink-soft transition-colors hover:text-gold"
                  >
                    <SocialIcon name={social.icon} className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBand
        heading={t("ctaHeading")}
        body={t("ctaBody")}
        ctaLabel={t("ctaLabel")}
      />
    </>
  );
}
