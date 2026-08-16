import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export async function AtelierIntro() {
  const t = await getTranslations("home.intro");

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
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-ink-soft">
            {t("body")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
