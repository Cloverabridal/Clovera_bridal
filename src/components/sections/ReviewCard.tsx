import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { pickText, reviewName, type Review } from "@/content/reviews";

type ReviewCardProps = {
  review: Review;
  locale: string;
  /** Resolved display name of the gown (collection or service), if any. */
  gownLabel?: string;
  /** href for the gown label when it points at a collection. */
  gownHref?: string;
  ratingLabel?: string;
};

function Stars({ rating, label }: { rating: number; label?: string }) {
  return (
    <div
      className="flex gap-1 text-gold"
      role="img"
      aria-label={label ?? `${rating} / 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        >
          <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />
        </svg>
      ))}
    </div>
  );
}

function formatWeddingDate(value: string, locale: string) {
  const date = new Date(`${value}-01T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(date);
}

export function ReviewCard({
  review,
  locale,
  gownLabel,
  gownHref,
  ratingLabel,
}: ReviewCardProps) {
  const quote = pickText(review.quote, locale);
  if (!quote) return null;

  const when = review.weddingDate
    ? formatWeddingDate(review.weddingDate, locale)
    : null;
  const meta = [review.location, when].filter(Boolean).join(" · ");

  return (
    <article className="border border-line bg-paper-raised">
      {review.photo && (
        <div className="relative aspect-[4/5] overflow-hidden bg-paper">
          <Image
            src={review.photo}
            alt={reviewName(review, locale)}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-7 sm:p-8">
        {review.rating && <Stars rating={review.rating} label={ratingLabel} />}
        <blockquote className="mt-5 font-serif text-xl leading-relaxed text-ink">
          “{quote}”
        </blockquote>
        <footer className="mt-6 border-t border-line pt-5">
          <p className="text-xs uppercase tracking-[0.2em] text-ink">
            {reviewName(review, locale)}
          </p>
          {meta && <p className="mt-1.5 text-sm text-ink-soft">{meta}</p>}
          {gownLabel &&
            (gownHref ? (
              <Link
                href={gownHref}
                className="mt-3 inline-block text-xs uppercase tracking-[0.14em] text-gold underline-offset-4 hover:underline"
              >
                {gownLabel} →
              </Link>
            ) : (
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-gold">
                {gownLabel}
              </p>
            ))}
        </footer>
      </div>
    </article>
  );
}
