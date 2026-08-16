import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { AtelierIntro } from "@/components/sections/AtelierIntro";
import { CollectionsTeaser } from "@/components/sections/CollectionsTeaser";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { CtaBand } from "@/components/layout/CtaBand";

export default async function HomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home.ctaBand");

  return (
    <>
      <Hero />
      <AtelierIntro />
      <CollectionsTeaser />
      <ServicesTeaser />
      <CtaBand heading={t("heading")} body={t("body")} ctaLabel={t("cta")} />
    </>
  );
}
