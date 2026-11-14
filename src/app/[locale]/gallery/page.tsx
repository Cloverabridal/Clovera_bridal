import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/layout/CtaBand";
import { AlbumGallery } from "@/components/gallery/AlbumGallery";
import { albums, albumPhotos } from "@/content/gallery";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/gallery">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return pageMetadata({
    locale,
    path: "/gallery",
    title: t("heading"),
    description: t("intro"),
  });
}

export default async function GalleryPage({
  params,
}: PageProps<"/[locale]/gallery">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("gallery");
  const tCommon = await getTranslations("common");
  const lang = locale === "vi" ? "vi" : "en";

  return (
    <>
      <section className="pb-8 pt-20 sm:pt-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              heading={t("heading")}
              body={t("intro")}
              as="h1"
            />
          </Reveal>

          {albums.length > 1 && (
            <nav
              aria-label={t("eyebrow")}
              className="mt-10 flex flex-wrap gap-3"
            >
              {albums.map((album) => (
                <a
                  key={album.slug}
                  href={`#${album.slug}`}
                  className="border border-line px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-gold hover:text-gold"
                >
                  {album.title[lang]}
                </a>
              ))}
            </nav>
          )}
        </div>
      </section>

      {albums.map((album) => (
        <section
          key={album.slug}
          id={album.slug}
          className="scroll-mt-32 pb-20 pt-12 sm:pb-24"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gold">
                  {album.couple[lang]}
                </p>
                <h2 className="mt-3 font-serif text-2xl text-ink sm:text-3xl">
                  {album.title[lang]}
                </h2>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">
                {t("photoCount", { count: album.photos.length })}
              </p>
            </Reveal>

            <AlbumGallery
              photos={albumPhotos(album, lang)}
              label={album.title[lang]}
            />
          </div>
        </section>
      ))}

      <CtaBand
        heading={tCommon("bookAppointment")}
        ctaLabel={tCommon("bookNow")}
      />
    </>
  );
}
