import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/content/site";
import { displace, playfair, inter } from "@/lib/fonts";
import { pageMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { StructuredData } from "@/components/seo/StructuredData";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const base = pageMetadata({
    locale,
    path: "",
    title: t("defaultTitle"),
    description: t("description"),
  });

  return {
    ...base,
    metadataBase: new URL(siteConfig.url),
    title: {
      template: t("titleTemplate"),
      default: t("defaultTitle"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${displace.variable} ${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <NextIntlClientProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
        </NextIntlClientProvider>
        <StructuredData />
      </body>
    </html>
  );
}
