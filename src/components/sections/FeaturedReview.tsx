import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { pickText, reviewName, type Review } from "@/content/reviews";

type FeaturedReviewProps = {
  review: Review;
  locale: string;
  gownLabel?: string;
  gownHref?: string;
  /** e.g. "Translated from English", shown when the quote was given in another language. */
  translatedNote?: string;
  ctaLabel: string;
};

/** Large editorial layout: tall photo on one side, the bride's words on the other. */
export function FeaturedReview({
  review,
  locale,
  gownLabel,
  gownHref,
  translatedNote,
  ctaLabel,
}: FeaturedReviewProps) {
  const quote = pickText(review.quote, locale);
  if (!quote) return null;

  const name = reviewName(review, locale);
  const highlights = (review.highlights ?? [])
    .map((h) => pickText(h, locale))
    .filter((h): h is string => Boolean(h));
  const companionQuote = pickText(review.companion?.quote, locale);
  const companionLabel = review.companion
    ? (review.companion.label[locale as "en" | "vi"] ?? review.companion.label.en)
    : undefined;

  return (
    <article className="grid items-center gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
      {review.photo && (
        <Reveal className="relative mx-auto aspect-[9/16] w-full max-w-[26rem] overflow-hidden bg-paper-raised lg:mx-0">
          <Image
            src={review.photo}
            alt={name}
            fill
            sizes="(min-width: 1024px) 416px, 100vw"
            className="object-cover"
            priority
          />
        </Reveal>
      )}

      <Reveal delay={0.1}>
        <p className="text-xs uppercase tracking-[0.25em] text-gold">
          {[name, review.location].filter(Boolean).join(" · ")}
        </p>
        <blockquote className="mt-6 font-serif text-xl leading-snug text-ink sm:text-2xl lg:text-[1.7rem]">
          “{quote}”
        </blockquote>

        {highlights.length > 0 && (
          <ul className="mt-10 space-y-6 border-t border-line pt-8">
            {highlights.map((line) => (
              <li
                key={line}
                className="border-l-2 border-gold/60 pl-5 text-base leading-relaxed text-ink-soft"
              >
                “{line}”
              </li>
            ))}
          </ul>
        )}

        {companionQuote && (
          <figure className="mt-10 border border-line bg-paper-raised p-6 sm:p-7">
            <blockquote className="text-sm leading-relaxed text-ink-soft sm:text-base">
              “{companionQuote}”
            </blockquote>
            {companionLabel && (
              <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-ink">
                {companionLabel}
              </figcaption>
            )}
          </figure>
        )}

        {gownLabel &&
          (gownHref ? (
            <Link
              href={gownHref}
              className="mt-8 inline-block text-xs uppercase tracking-[0.14em] text-gold underline-offset-4 hover:underline"
            >
              {gownLabel} →
            </Link>
          ) : (
            <p className="mt-8 text-xs uppercase tracking-[0.14em] text-gold">
              {gownLabel}
            </p>
          ))}

        {translatedNote && (
          <p className="mt-8 text-xs italic text-ink-soft/70">{translatedNote}</p>
        )}

        <Button href="/book" variant="primary" className="mt-8">
          {ctaLabel}
        </Button>
      </Reveal>
    </article>
  );
}
