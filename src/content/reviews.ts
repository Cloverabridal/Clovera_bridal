import type { CollectionSlug, ServiceSlug } from "@/content/collections";

/**
 * Brides' reviews shown on /reviews. Add only real, client-approved
 * reviews here — the page renders whatever is in these lists.
 *
 * Media lives in public/reviews/ and is referenced as "/reviews/<file>".
 */

/** A video testimonial. Vertical (9:16) clips work best. */
export type VideoReview = {
  id: string;
  /** How the bride is introduced, e.g. "Bride from Germany". */
  label: { en: string; vi: string };
  /** City or country shown under the label (optional). */
  location?: string;
  /** The gown she wore: a collection and/or the service she used. */
  gown?: { collection?: CollectionSlug; service?: ServiceSlug };
  video: string;
  poster: string;
};

export const videoReviews: VideoReview[] = [
  {
    id: "germany",
    label: { en: "Bride from Germany", vi: "Cô dâu đến từ Đức" },
    location: "Germany",
    video: "/reviews/bride-germany.mp4",
    poster: "/reviews/bride-germany.jpg",
  },
];

/** A written review. */
export type Review = {
  id: string;
  /** Bride's name as she wants it shown (first name + initial is fine). */
  name: string;
  /** City or country, e.g. "Da Nang" or "Sydney, Australia". */
  location?: string;
  /** Wedding month as "YYYY-MM", e.g. "2026-05". */
  weddingDate?: string;
  gown?: { collection?: CollectionSlug; service?: ServiceSlug };
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Provide the language it was written in; the other is optional. */
  quote: { en?: string; vi?: string };
  /** Optional portrait photo, e.g. "/reviews/anna.jpg" (4:5 works best). */
  photo?: string;
};

export const reviews: Review[] = [];
