import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // English is the site's primary version: "/" always serves English,
  // regardless of the visitor's browser language or a previously chosen
  // locale. Switching to Vietnamese is opt-in via the header toggle only.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
