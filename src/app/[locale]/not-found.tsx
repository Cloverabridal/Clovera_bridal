import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-24">
      <div className="mx-auto max-w-xl px-6 text-center sm:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-soft">
          {t("body")}
        </p>
        <Button href="/" variant="primary" className="mt-9">
          {t("cta")}
        </Button>
      </div>
    </section>
  );
}
