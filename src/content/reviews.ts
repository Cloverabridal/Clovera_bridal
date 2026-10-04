import type { CollectionSlug, ServiceSlug } from "@/content/collections";

/**
 * Brides' reviews shown on /reviews. Add only real, client-approved
 * reviews here — the page renders whatever is in this list.
 *
 * Photos live in public/reviews/ and are referenced as "/reviews/<file>.jpg".
 */

type Localized = { en?: string; vi?: string };

export type Review = {
  id: string;
  /** Bride's name as she wants it shown, or a label such as "Bride from Germany". */
  name: string | { en: string; vi: string };
  /** City or country, e.g. "Da Nang" or "Sydney, Australia". */
  location?: string;
  /** Wedding month as "YYYY-MM", e.g. "2026-05". */
  weddingDate?: string;
  gown?: { collection?: CollectionSlug; service?: ServiceSlug };
  rating?: 1 | 2 | 3 | 4 | 5;
  /** The main quote. Provide the language it was said in; the other is optional. */
  quote: Localized;
  /** Language the review was originally given in, so a translation can be flagged. */
  originalLanguage?: "en" | "vi";
  /** Portrait photo, e.g. "/reviews/anna.jpg" (3:4 or 9:16 works best). */
  photo?: string;
  /** Shown large, with a photo, at the top of the page (use for one review). */
  featured?: boolean;
  /** Extra short lines from the same review, shown beside a featured one. */
  highlights?: Localized[];
  /** Words from someone else in the same story (e.g. her partner). */
  companion?: { label: { en: string; vi: string }; quote: Localized };
};

export const reviews: Review[] = [
  {
    id: "germany",
    name: { en: "Bride from Germany", vi: "Cô dâu đến từ Đức" },
    originalLanguage: "en",
    featured: true,
    photo: "/reviews/bride-germany.jpg",
    quote: {
      en: "You're a very kind person, and I didn't feel any kind of pressure — just your understanding for me.",
      vi: "Bạn là một người rất tử tế, và tôi không hề cảm thấy áp lực — chỉ có sự thấu hiểu dành cho tôi.",
    },
    highlights: [
      {
        en: "I saw your designs on Google Maps, and that's why I decided to come here — I really like your idea of wedding dresses and your vision.",
        vi: "Tôi thấy các thiết kế của bạn trên Google Maps và quyết định đến đây — tôi rất thích ý tưởng và tầm nhìn của bạn về váy cưới.",
      },
      {
        en: "I really like that your whole personality is in the store — you can feel it when you are there.",
        vi: "Tôi rất thích việc cả cá tính của bạn hiện diện trong cửa hàng — bước vào là có thể cảm nhận được.",
      },
      {
        en: "I also like that you are flexible with my ideas. I love the dress.",
        vi: "Tôi cũng thích việc bạn linh hoạt với ý tưởng của tôi. Tôi yêu chiếc váy này.",
      },
    ],
    companion: {
      label: { en: "Her partner", vi: "Bạn đời của cô dâu" },
      quote: {
        en: "The dress is really beautiful and I'm so impressed. There were no problems of any kind — if there were any changes, she would follow immediately. The dress is just perfect.",
        vi: "Chiếc váy thật sự rất đẹp và tôi rất ấn tượng. Không có bất kỳ vấn đề nào — nếu cần chỉnh sửa gì, cô ấy đều làm ngay. Chiếc váy thật hoàn hảo.",
      },
    },
  },
];

/** Text in the visitor's language, falling back to whichever one exists. */
export function pickText(value: Localized | undefined, locale: string) {
  if (!value) return undefined;
  return value[locale as "en" | "vi"] ?? value.en ?? value.vi;
}

export function reviewName(review: Review, locale: string) {
  return typeof review.name === "string"
    ? review.name
    : (review.name[locale as "en" | "vi"] ?? review.name.en);
}
