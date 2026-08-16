import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BookingForm } from "@/components/forms/BookingForm";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/book">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "book" });
  return { title: t("heading"), description: t("intro") };
}

export default async function BookPage({
  params,
}: PageProps<"/[locale]/book">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("book");
  const tContact = await getTranslations("contact");

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            heading={t("heading")}
            body={t("intro")}
          />
          <div className="mt-10 space-y-1 text-sm text-ink-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              {tContact("addressLabel")}
            </p>
            <p>{tContact("addressLine1")}</p>
            <p className="mt-3">
              <a
                href={`mailto:${tContact("email")}`}
                className="transition-colors hover:text-ink"
              >
                {tContact("email")}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
