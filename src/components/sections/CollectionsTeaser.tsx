import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export async function CollectionsTeaser() {
  const t = await getTranslations("home.collections");
  const tCollections = await getTranslations("collections");
  const items = tCollections.raw("items") as Array<{
    slug: string;
    name: string;
    year: string;
    tagline: string;
  }>;

  return (
    <section className="bg-paper-raised py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            heading={t("heading")}
            body={t("body")}
          />
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.1}>
              <Link
                href={`/collections/${item.slug}`}
                className="group block"
              >
                <MediaFrame
                  label={`${item.name} ${item.year}`}
                  aspect="aspect-[4/5]"
                  className="transition-opacity duration-300 group-hover:opacity-90"
                />
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">
                    {item.year}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    {item.tagline}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/collections" variant="secondary">
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
