export const collectionSlugs = ["venus-in-bloom", "venus-in-flight"] as const;

export type CollectionSlug = (typeof collectionSlugs)[number];

// Curated look photography per collection (30 selected from the client's
// full shoot, avoiding near-duplicate frames). Files live in
// public/collections/<slug>/lookNN.jpg. look01 is the designated cover shot
// used on teaser cards and the collections index.
export const collectionLookCounts: Record<CollectionSlug, number> = {
  "venus-in-bloom": 30,
  "venus-in-flight": 30,
};

export function getLookImage(slug: CollectionSlug, look: number) {
  return `/collections/${slug}/look${String(look).padStart(2, "0")}.jpg`;
}

export function getLookImages(slug: CollectionSlug) {
  return Array.from({ length: collectionLookCounts[slug] }, (_, i) =>
    getLookImage(slug, i + 1),
  );
}

// Short motion clips per collection (transcoded from the client's raw
// footage), shown alongside the photo gallery on each collection page.
export const collectionVideos: Record<
  CollectionSlug,
  { src: string; poster: string }[]
> = {
  "venus-in-bloom": [
    { src: "/video/intro-2.mp4", poster: "/video/posters/intro-2.jpg" },
    { src: "/video/bloom-look-1.mp4", poster: "/video/posters/bloom-look-1.jpg" },
    { src: "/video/bloom-look-2.mp4", poster: "/video/posters/bloom-look-2.jpg" },
  ],
  "venus-in-flight": [
    { src: "/video/flight-look-3.mp4", poster: "/video/posters/flight-look-3.jpg" },
    { src: "/video/flight-look-5.mp4", poster: "/video/posters/flight-look-5.jpg" },
    { src: "/video/flight-look-7.mp4", poster: "/video/posters/flight-look-7.jpg" },
  ],
};

// Home hero slideshow: leads with actual Venus in Bloom gown footage,
// then transitions into Venus in Flight.
export const heroClips: { src: string; poster: string }[] = [
  { src: "/video/bloom-look-1.mp4", poster: "/video/posters/bloom-look-1.jpg" },
  { src: "/video/bloom-look-2.mp4", poster: "/video/posters/bloom-look-2.jpg" },
  { src: "/video/bloom-look-21.mp4", poster: "/video/posters/bloom-look-21.jpg" },
  { src: "/video/flight-look-3.mp4", poster: "/video/posters/flight-look-3.jpg" },
  { src: "/video/flight-look-5.mp4", poster: "/video/posters/flight-look-5.jpg" },
  { src: "/video/flight-look-7.mp4", poster: "/video/posters/flight-look-7.jpg" },
];

export const serviceSlugs = [
  "rental",
  "made-to-measure",
  "custom-made",
  "worldwide-shipping",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

// One representative photo per service, pulled from the two collections.
export const serviceImages: Record<ServiceSlug, string> = {
  rental: getLookImage("venus-in-bloom", 9),
  "made-to-measure": getLookImage("venus-in-flight", 6),
  "custom-made": getLookImage("venus-in-bloom", 15),
  "worldwide-shipping": getLookImage("venus-in-flight", 18),
};
