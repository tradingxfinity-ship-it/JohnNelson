import { site } from "@/content/site";
import { Container, Eyebrow, Section } from "./ui";

function Stars({ className = "text-gold" }: { className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L10 14.8l-5.4 2.9 1.2-5.9L1.4 7.7l6-.7z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Zillow reviews: a rating summary with reviews by type, beside the most recent
 * reviews (type of help, place, and date). Review text stays on Zillow.
 */
export function Reviews() {
  const { rating, reviewCount, profileUrl, breakdown, ratedOn, recentReviews } = site.zillow;
  const reviewsUrl = profileUrl ? `${profileUrl}#reviews` : undefined;
  const max = Math.max(...breakdown.map((b) => b.count));

  return (
    <Section className="border-t border-line">
      <Container className="grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-12">
        {/* Summary */}
        <div className="rounded-lg bg-navy p-7 text-white sm:p-8">
          <p className="text-sm font-medium text-white/70">Zillow rating</p>
          <div className="mt-3 flex items-end gap-4">
            <p className="text-6xl font-medium leading-none tracking-[-0.04em]">{rating}</p>
            <div className="pb-1">
              <Stars className="text-gold-light" />
              <p className="mt-1.5 text-sm text-white/80">{reviewCount} reviews</p>
            </div>
          </div>

          <h3 className="mt-8 text-sm font-medium text-white">Reviews by type</h3>
          <ul className="mt-3 space-y-3">
            {breakdown.map((b) => (
              <li key={b.label}>
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="text-white/85">{b.label}</span>
                  <span className="tabular-nums text-white/85">{b.count}</span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-white/15">
                  <div className="h-1 rounded-full bg-gold-light" style={{ width: `${Math.max(2, (b.count / max) * 100)}%` }} />
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-sm font-medium text-white">Clients rate them on</h3>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {ratedOn.map((r) => (
              <li key={r} className="rounded-full border border-white/20 px-3 py-1 text-[13px] text-white/85">
                {r}
              </li>
            ))}
          </ul>

          {reviewsUrl && (
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-white px-5 text-[15px] font-medium text-navy hover:bg-cloud"
            >
              Read all reviews on Zillow
              <span aria-hidden>↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>

        {/* Recent reviews */}
        <div>
          <Eyebrow>Client reviews</Eyebrow>
          <h2 className="text-[1.75rem] font-medium leading-tight sm:text-4xl">What clients say on Zillow.</h2>
          <p className="mt-4 max-w-xl leading-relaxed">
            Every one of Irma and John’s {reviewCount} Zillow reviews is five stars, from sellers, buyers, and renters
            across the San Antonio area.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {recentReviews.slice(0, 6).map((r, i) => (
              <li key={i} className="flex flex-col rounded-lg border border-line p-5">
                <div className="flex items-center justify-between gap-3">
                  <Stars />
                  <span className="text-[13px]">{r.date}</span>
                </div>
                <p className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-cloud px-2.5 py-0.5 text-xs font-medium text-navy">{r.kind}</span>
                  <span className="sr-only">{r.rating} out of 5 stars.</span>
                </p>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-navy">{r.description}</p>
                {reviewsUrl && (
                  <a
                    href={reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy underline-offset-4 hover:underline"
                  >
                    Read this review on Zillow
                    <span aria-hidden>↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
