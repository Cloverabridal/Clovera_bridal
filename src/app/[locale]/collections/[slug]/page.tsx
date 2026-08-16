import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { collectionSlugs, collectionLookCounts } from "@/content/collections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/layout/CtaBand";

type Collection = {
  slug: string;
  name: string;
  year: string;
  tagline: string;
  description: string;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    collectionSlugs.map((slug) => ({ locale, slug })),
  );
}

async function getCollection(locale: string, slug: string) {
  const t = await getTranslations({ locale, namespace: "collections" });
  const items = t.raw("items") as Collection[];
  return items.find((item) => item.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/collections/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const collection = await getCollection(locale, slug);
  if (!collection) return {};
  return { title: collection.name, description: collection.tagline };
}

export default async function CollectionDetailPage({
  params,
}: PageProps<"/[locale]/collections/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const collection = await getCollection(locale, slug);
  if (!collection) notFound();

  const tCommon = await getTranslations("common");
  const tCollections = await getTranslations("collections");
  const lookCount =
    collectionLookCounts[slug as keyof typeof collectionLookCounts] ?? 6;

  return (
    <>
      <section className="border-b border-line py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <Link
              href="/collections"
              className="text-xs uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-gold"
            >
              ← {tCommon("backToCollections")}
            </Link>
            <SectionHeading
              className="mt-6 max-w-3xl"
              eyebrow={`${collection.year} Collection`}
              heading={collection.name}
              body={collection.description}
            />
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {Array.from({ length: lookCount }, (_, i) => i + 1).map(
              (look, index) => (
                <Reveal key={look} delay={(index % 3) * 0.08}>
                  <MediaFrame
                    label={`${collection.name} — Look ${String(look).padStart(2, "0")}`}
                    aspect="aspect-[3/4]"
                    caption
                  />
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 text-center">
        <Button href="/book" variant="primary">
          {tCollections("cta")}
        </Button>
      </section>

      <CtaBand
        heading={tCommon("bookAppointment")}
        ctaLabel={tCommon("bookNow")}
      />
    </>
  );
}
