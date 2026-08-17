import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  collectionSlugs,
  collectionVideos,
  getLookImages,
  type CollectionSlug,
} from "@/content/collections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { VideoClip } from "@/components/ui/VideoClip";
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
  const collectionSlug = slug as CollectionSlug;
  const images = getLookImages(collectionSlug);
  const videos = collectionVideos[collectionSlug] ?? [];

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
            {images.map((src, index) => (
              <Reveal key={src} delay={(index % 3) * 0.06}>
                <div className="relative aspect-[3/4] overflow-hidden bg-paper-raised">
                  <Image
                    src={src}
                    alt={`${collection.name} — Look ${String(index + 1).padStart(2, "0")}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover"
                    priority={index < 2}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {videos.length > 0 && (
        <section className="border-t border-line bg-paper-raised py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">
                In Motion
              </p>
              <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
                {collection.name}, filmed
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {videos.map((video, index) => (
                <Reveal key={video.src} delay={(index % 3) * 0.08}>
                  <div className="aspect-[9/16] overflow-hidden bg-ink">
                    <VideoClip
                      src={video.src}
                      poster={video.poster}
                      alt={`${collection.name} in motion`}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

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
