import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("heading"), description: t("intro") };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");

  const details = [
    { label: t("addressLabel"), lines: [t("addressLine1"), t("addressLine2")] },
    { label: t("emailLabel"), lines: [t("email")], href: `mailto:${t("email")}` },
    { label: t("phoneLabel"), lines: [t("phone")] },
    { label: t("hoursLabel"), lines: [t("hours")] },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            heading={t("heading")}
            body={t("intro")}
          />
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((detail, index) => (
            <Reveal key={detail.label} delay={index * 0.08}>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                {detail.label}
              </p>
              <div className="mt-3 space-y-1 text-sm leading-relaxed text-ink-soft">
                {detail.lines.map((line) =>
                  detail.href ? (
                    <a
                      key={line}
                      href={detail.href}
                      className="block transition-colors hover:text-ink"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={line}>{line}</p>
                  ),
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-16">
          <Button href="/book" variant="primary">
            {tCommon("bookAppointment")}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
