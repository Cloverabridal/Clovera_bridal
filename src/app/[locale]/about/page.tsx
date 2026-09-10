import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/layout/CtaBand";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMetadata({
    locale,
    path: "/about",
    title: t("heading"),
    description: t("intro"),
  });
}

type Value = { title: string; body: string };

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");
  const values = t.raw("values") as Value[];

  return (
    <>
      <section className="border-b border-line py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              heading={t("heading")}
              body={t("intro")}
            />
          </Reveal>
          <Reveal
            delay={0.1}
            className="relative aspect-[4/5] overflow-hidden bg-paper-raised"
          >
            <Image
              src="/about/storefront.jpg"
              alt={t("storefrontAlt")}
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-paper-raised">
            <Image
              src="/about/vitrine.jpg"
              alt={t("storyImageAlt")}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              {t("storyEyebrow")}
            </p>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              {t("body1")}
            </p>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              {t("body2")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-paper-raised py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              {t("spaceEyebrow")}
            </p>
            <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
              {t("spaceHeading")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              {t("spaceBody")}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-6">
            {[
              { src: "/about/alcove.jpg", alt: t("spaceImageAlt1") },
              { src: "/about/gown-wall.jpg", alt: t("spaceImageAlt2") },
              { src: "/about/hangers.jpg", alt: t("spaceImageAlt3") },
            ].map((img, index) => (
              <Reveal
                key={img.src}
                delay={index * 0.08}
                className="relative aspect-[4/5] overflow-hidden bg-paper"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 640px) 30vw, 100vw"
                  className="object-cover"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl text-ink sm:text-4xl">
              {t("valuesHeading")}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.1}>
                <span className="font-serif text-2xl text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-xl text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading={tCommon("bookAppointment")}
        ctaLabel={tCommon("bookNow")}
      />
    </>
  );
}
