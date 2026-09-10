import { siteConfig, contactDetails, socialLinks } from "@/content/site";

/**
 * LocalBusiness (ClothingStore) structured data — helps Google show the
 * studio as a real Da Nang business in local search and knowledge panels.
 * Rendered once, site-wide, from the locale layout.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    alternateName: "CLOVERA Bridal",
    description:
      "Luxury bridal house in Da Nang, Vietnam — wedding gown rental, made-to-measure, and fully bespoke couture, with insured worldwide shipping.",
    url: siteConfig.url,
    image: `${siteConfig.url}/opengraph-image.jpg`,
    logo: `${siteConfig.url}/logo.png`,
    telephone: contactDetails.phoneHref.replace("tel:", ""),
    email: contactDetails.email,
    priceRange: "$$$",
    currenciesAccepted: "VND, USD",
    address: {
      "@type": "PostalAddress",
      streetAddress: "27 Dinh Gia Trinh Street",
      addressLocality: "Hoa Xuan Ward, Cam Le District",
      addressRegion: "Da Nang",
      postalCode: "550000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 16.0096466,
      longitude: 108.2155295,
    },
    areaServed: [
      { "@type": "City", name: "Da Nang" },
      { "@type": "Country", name: "Vietnam" },
      "Worldwide",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: socialLinks.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      // Structured data must be a raw JSON string in the DOM.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
