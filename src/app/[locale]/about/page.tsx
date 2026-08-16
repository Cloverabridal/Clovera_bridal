import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/layout/CtaBand";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("heading"), description: t("intro") };
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
          <Reveal delay={0.1}>
            <MediaFrame label="Clovera Bridal atelier" aspect="aspect-[4/5]" />
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 sm:px-8">
          <Reveal>
            <p className="text-base leading-relaxed text-ink-soft">
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
