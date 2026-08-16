import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  experimental: {
    // Our root layout lives at app/[locale]/layout.tsx (a dynamic segment),
    // so Next can't compose a normal root not-found from layout + not-found.
    // This renders app/global-not-found.tsx for genuinely unmatched URLs.
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
