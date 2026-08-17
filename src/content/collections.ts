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
    { src: "/video/bloom-look-21.mp4", poster: "/video/posters/bloom-look-21.jpg" },
  ],
  "venus-in-flight": [
    { src: "/video/flight-look-3.mp4", poster: "/video/posters/flight-look-3.jpg" },
    { src: "/video/flight-look-5.mp4", poster: "/video/posters/flight-look-5.jpg" },
    { src: "/video/flight-look-7.mp4", poster: "/video/posters/flight-look-7.jpg" },
  ],
};

// Home hero slideshow: cycles through Bloom clips first, then Flight.
export const heroClips: { src: string; poster: string }[] = [
  { src: "/video/intro-1.mp4", poster: "/video/posters/intro-1.jpg" },
  { src: "/video/intro-2.mp4", poster: "/video/posters/intro-2.jpg" },
  { src: "/video/bloom-look-1.mp4", poster: "/video/posters/bloom-look-1.jpg" },
  { src: "/video/bloom-look-2.mp4", poster: "/video/posters/bloom-look-2.jpg" },
  { src: "/video/flight-look-3.mp4", poster: "/video/posters/flight-look-3.jpg" },
  { src: "/video/flight-look-5.mp4", poster: "/video/posters/flight-look-5.jpg" },
  { src: "/video/flight-look-7.mp4", poster: "/video/posters/flight-look-7.jpg" },
];

export const serviceSlugs = [
  "made-to-measure",
  "ready-to-order",
  "bespoke-design",
  "bridal-accessories",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
