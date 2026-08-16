import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export async function ServicesTeaser() {
  const t = await getTranslations("home.services");
  const tCommon = await getTranslations("common");
  const tServices = await getTranslations("services");
  const items = tServices.raw("items") as Array<{
    slug: string;
    title: string;
    description: string;
    price: string;
  }>;

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow={t("eyebrow")}
            heading={t("heading")}
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.08}>
              <Link
                href={`/services#${item.slug}`}
                className="group flex h-full flex-col bg-paper p-8 transition-colors hover:bg-paper-raised"
              >
                <span className="font-serif text-3xl text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-serif text-xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.14em] text-ink-soft/70">
                  {item.price}
                </p>
                <span className="mt-4 text-xs uppercase tracking-[0.14em] text-ink underline decoration-gold/50 underline-offset-4 group-hover:text-gold">
                  {tCommon("readMore")}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
