import type { Metadata } from "next";
import { ListingCard } from "@/components/ListingCard";
import { ListingNotice } from "@/components/ListingNotice";
import { ArrowLink, ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { CONTACT_HREF, site } from "@/content/site";
import { ourListings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Our Listings",
  description: "Homes and land for sale with John and Irma Nelson of Get It Sold Realty in San Antonio and the Hill Country.",
  alternates: { canonical: "/listings" },
};

export default async function ListingsPage() {
  const results = await ourListings();

  return (
    <Section className="pt-10! lg:pt-16!">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Homes for sale</Eyebrow>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">Our listings.</h1>
            <p className="mt-5 text-lg leading-relaxed">
              Homes and land Irma and John are selling right now.
              {results.source === "site" && ` Prices and availability as of ${site.listingsAsOf}.`}
            </p>
          </div>
          <ArrowLink href="/homes" className="text-[15px]">
            Search all homes for sale
          </ArrowLink>
        </div>

        {results.listings.length > 0 ? (
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {results.listings.map((l, i) => (
              <li key={l.ListingKey}>
                <ListingCard listing={l} priority={i < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12 rounded-lg bg-cloud p-8">
            <p className="text-lg text-blue">No listings right now. New homes are added as soon as they’re listed.</p>
            <ButtonLink href={CONTACT_HREF} className="mt-6">
              Ask about upcoming listings
            </ButtonLink>
          </div>
        )}

        <div className="mt-16 flex flex-col gap-4 rounded-lg border border-line p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-medium">Thinking of selling?</h2>
            <p className="mt-1 text-[15px]">Find out what your home could sell for.</p>
          </div>
          <ButtonLink href="/sell#contact">What’s my home worth?</ButtonLink>
        </div>

        {results.source === "lera" && <ListingNotice fetchedAt={results.fetchedAt} />}
      </Container>
    </Section>
  );
}
