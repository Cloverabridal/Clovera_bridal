import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

/**
 * Builds correct per-page canonical + hreflang alternates and Open Graph
 * fields. Without this, every page would inherit the root layout's
 * canonical ("/") and Open Graph title/description, telling search engines
 * every page is a duplicate of the homepage.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string; // locale-agnostic path, e.g. "" for home, "/about"
  title: string;
  description: string;
}): Metadata {
  const enPath = path || "/";
  const viPath = path ? `/vi${path}` : "/vi";
  const canonicalPath = locale === "vi" ? viPath : enPath;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: { en: enPath, vi: viPath },
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: siteConfig.name,
      locale,
      type: "website",
      images: [
        {
          url: "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: "Clovera Bridal — Couture Wedding Dresses, Da Nang, Vietnam",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image.jpg"],
    },
  };
}
