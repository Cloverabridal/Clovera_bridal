import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { collectionSlugs } from "@/content/collections";

const staticPaths = [
  "",
  "/about",
  "/services",
  "/collections",
  "/book",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...collectionSlugs.map((slug) => `/collections/${slug}`),
  ];

  return paths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    alternates: {
      languages: {
        en: `${siteConfig.url}${path}`,
        vi: `${siteConfig.url}/vi${path}`,
      },
    },
  }));
}
