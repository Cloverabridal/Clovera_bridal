export const collectionSlugs = ["venus-in-bloom", "venus-in-flight"] as const;

export type CollectionSlug = (typeof collectionSlugs)[number];

// Number of placeholder "look" frames to render in each collection gallery
// until real photography is supplied. Adjust freely per collection.
export const collectionLookCounts: Record<CollectionSlug, number> = {
  "venus-in-bloom": 6,
  "venus-in-flight": 6,
};

export const serviceSlugs = [
  "made-to-measure",
  "ready-to-order",
  "bespoke-design",
  "bridal-accessories",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
