import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/layout/CtaBand";
import { serviceImages, type ServiceSlug } from "@/content/collections";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return pageMetadata({
    locale,
    path: "/services",
    title: t("heading"),
    description: t("intro"),
  });
}

type Service = {
  slug: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  cta: string;
};

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("services");
  const tCommon = await getTranslations("common");
  const items = t.raw("items") as Service[];

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

      {items.map((service, index) => {
        const imageFirst = index % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className="scroll-mt-24 border-b border-line py-20 sm:py-24"
          >
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
              <Reveal className={imageFirst ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/5] overflow-hidden bg-paper-raised">
                  <Image
                    src={serviceImages[service.slug as ServiceSlug]}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <Reveal
                delay={0.1}
                className={imageFirst ? "lg:order-1" : ""}
              >
                <span className="font-serif text-3xl text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
                  {service.description}
                </p>
                <ul className="mt-7 space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-ink-soft"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-4 shrink-0 bg-gold"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="mt-7 text-xs uppercase tracking-[0.14em] text-ink-soft/70">
                  {service.price}
                </p>
                <Button href="/book" variant="primary" className="mt-7">
                  {service.cta}
                </Button>
              </Reveal>
            </div>
          </section>
        );
      })}

      <CtaBand
        heading={tCommon("bookAppointment")}
        ctaLabel={tCommon("bookNow")}
      />
    </>
  );
}
