import { site } from "@/content/site";
import { ourListings } from "@/lib/listings";
import { ListingCard } from "./ListingCard";
import { ArrowLink, Container, Eyebrow, Section } from "./ui";

/** The team's current listings on the homepage. Renders nothing when there are none. */
export async function Listings() {
  const { listings, source } = await ourListings();
  if (listings.length === 0) return null;

  return (
    <Section className="border-t border-line">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Homes for sale</Eyebrow>
            <h2 className="text-3xl font-medium sm:text-4xl">Our current listings.</h2>
          </div>
          <p className="max-w-sm leading-relaxed md:text-right">
            Listed by {site.name}.{source === "site" && ` Prices and availability as of ${site.listingsAsOf}.`}
          </p>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-3">
          {listings.slice(0, 3).map((l) => (
            <li key={l.ListingKey}>
              <ListingCard listing={l} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <ArrowLink href="/listings">See all our listings</ArrowLink>
          <ArrowLink href="/homes">Search all homes for sale</ArrowLink>
        </div>
      </Container>
    </Section>
  );
}
