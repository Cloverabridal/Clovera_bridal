import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { contactDetails, socialLinks } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata({
    locale,
    path: "/contact",
    title: t("heading"),
    description: t("intro"),
  });
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");

  const mapQuery = encodeURIComponent(
    "27 Đinh Gia Trinh, Hòa Xuân, Đà Nẵng",
  );

  const details = [
    { label: t("addressLabel"), lines: [t("addressLine1"), t("addressLine2")] },
    {
      label: t("emailLabel"),
      lines: [contactDetails.email],
      href: `mailto:${contactDetails.email}`,
    },
    {
      label: t("phoneLabel"),
      lines: [contactDetails.phone],
      href: contactDetails.phoneHref,
    },
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
            size="sm"
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

        <Reveal delay={0.15} className="mt-16">
          <div className="flex items-baseline justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              {t("mapLabel")}
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-gold"
            >
              {t("directions")} →
            </a>
          </div>
          <div className="mt-4 aspect-[16/10] w-full overflow-hidden border border-line bg-paper-raised sm:aspect-[16/7]">
            <iframe
              title={t("mapLabel")}
              src={`https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-16 flex flex-wrap items-center gap-8">
          <Button href="/book" variant="primary">
            {tCommon("bookAppointment")}
          </Button>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="text-ink-soft transition-colors hover:text-gold"
              >
                <SocialIcon name={social.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
