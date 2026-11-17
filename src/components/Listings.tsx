import { site } from "@/content/site";
import { Photo } from "./Photo";
import { Container, Eyebrow, Section } from "./ui";

/** Current listings from site content. Renders nothing when the list is empty. */
export function Listings() {
  if (site.listings.length === 0) return null;
  const listingsUrl = site.zillow.profileUrl ? `${site.zillow.profileUrl}#listings-and-sales` : null;

  return (
    <Section className="border-t border-line">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Homes for sale</Eyebrow>
            <h2 className="text-3xl font-medium sm:text-4xl">Current listings.</h2>
          </div>
          <p className="max-w-sm leading-relaxed md:text-right">
            Listed by Get It Sold Realty. Prices and availability as of {site.listingsAsOf}.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {site.listings.map((listing, i) => (
            <li key={listing.address}>
              <article className="group relative">
                <Photo
                  image={listing.image}
                  fallbackAlt=""
                  shape={i === 0 ? "arch" : "rounded"}
                  caption={listing.type === "Lot" ? "Lot for sale" : "For sale"}
                  sizes="(min-width: 1248px) 400px, (min-width: 768px) 33vw, 100vw"
                  className="aspect-[4/3] w-full"
                />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-xl font-medium">
                      {listingsUrl ? (
                        <a
                          href={listingsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-4 after:absolute after:inset-0 group-hover:underline focus-visible:underline"
                        >
                          {listing.address}
                          <span className="sr-only"> (view on Zillow, opens in a new tab)</span>
                        </a>
                      ) : (
                        listing.address
                      )}
                    </h3>
                    <p className="mt-1 text-[15px]">{listing.city}</p>
                  </div>
                  <p className="shrink-0 text-xl font-medium text-navy">{listing.price}</p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-4 text-sm">
                  {listing.details.map((d, j) => (
                    <span key={d} className="flex items-center gap-3">
                      {j > 0 && <span aria-hidden className="h-3 w-px bg-line" />}
                      <span className="font-medium text-navy">{d}</span>
                    </span>
                  ))}
                  <span aria-hidden className="h-3 w-px bg-line" />
                  <span>{listing.highlight}</span>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {listingsUrl && (
          <a
            href={listingsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 font-medium text-navy underline-offset-4 hover:underline"
          >
            See all listings and sales on Zillow
            <span aria-hidden>↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </Container>
    </Section>
  );
}
