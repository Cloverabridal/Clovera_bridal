import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/layout/CtaBand";
import { getLookImage, type CollectionSlug } from "@/content/collections";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/collections">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collections" });
  return { title: t("heading"), description: t("intro") };
}

type Collection = {
  slug: string;
  name: string;
  year: string;
  tagline: string;
  description: string;
};

export default async function CollectionsPage({
  params,
}: PageProps<"/[locale]/collections">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("collections");
  const tCommon = await getTranslations("common");
  const items = t.raw("items") as Collection[];

  return (
    <>
      <section className="border-b border-line py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              heading={t("heading")}
              body={t("intro")}
            />
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
          {items.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.1}>
              <Link
                href={`/collections/${item.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-paper-raised">
                  <Image
                    src={getLookImage(item.slug as CollectionSlug, 1)}
                    alt={`${item.name} ${item.year}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                    priority={index === 0}
                  />
                </div>
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">
                    {item.year}
                  </p>
                  <h2 className="mt-2 font-serif text-3xl text-ink">
                    {item.name}
                  </h2>
                  <p className="mt-2 text-sm text-ink-soft">
                    {item.tagline}
                  </p>
                  <span className="mt-4 inline-block text-xs uppercase tracking-[0.14em] text-ink underline decoration-gold/50 underline-offset-4 group-hover:text-gold">
                    {tCommon("viewCollection")}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        heading={tCommon("bookAppointment")}
        ctaLabel={tCommon("bookNow")}
      />
    </>
  );
}
