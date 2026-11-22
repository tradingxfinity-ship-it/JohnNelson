import Image from "next/image";
import Link from "next/link";
import { formatPrice, listingFacts, listingPlace, listingTitle, type Listing } from "@/lib/listings";

/** A listing in a results grid. Shows the listing brokerage, as LERA's IDX rules require. */
export function ListingCard({ listing, priority = false }: { listing: Listing; priority?: boolean }) {
  const photo = listing.Media[0];
  const facts = listingFacts(listing);
  const remote = photo?.url.startsWith("http");
  const status =
    listing.StandardStatus === "Active"
      ? listing.PropertyType === "Land"
        ? "Land for sale"
        : "For sale"
      : listing.StandardStatus === "Pending"
        ? "Pending"
        : "Under contract";

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-cloud">
        {photo && (
          <Image
            src={photo.url}
            alt=""
            fill
            unoptimized={remote}
            priority={priority}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
        <span className="absolute bottom-0 left-0 rounded-tr-lg bg-white px-4 pb-1.5 pt-3 text-xs font-medium uppercase tracking-[0.12em] text-blue">
          {status}
        </span>
        {listing.isOurs && (
          <span className="absolute right-3 top-3 rounded-full bg-blue px-3 py-1 text-xs font-medium text-white">
            Our listing
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-medium">
            <Link
              href={`/homes/${encodeURIComponent(listing.ListingKey)}`}
              className="underline-offset-4 after:absolute after:inset-0 group-hover:underline focus-visible:underline"
            >
              {listingTitle(listing)}
            </Link>
          </h3>
          <p className="mt-0.5 text-[15px]">{listingPlace(listing)}</p>
        </div>
        <p className="shrink-0 text-lg font-medium text-blue">{formatPrice(listing.ListPrice)}</p>
      </div>
      {facts.length > 0 && (
        <p className="mt-3 flex flex-wrap gap-x-3 border-t border-line pt-3 text-sm font-medium text-blue">
          {facts.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </p>
      )}
      {listing.ListOfficeName && (
        <p className="mt-2 text-sm">Listing courtesy of {listing.ListOfficeName}</p>
      )}
    </article>
  );
}
