import type { Metadata } from "next";
import Link from "next/link";
import { HowItWorks } from "@/components/HowItWorks";
import { ListingCard } from "@/components/ListingCard";
import { HOW_IT_WORKS } from "@/content/howItWorks";
import { ListingNotice } from "@/components/ListingNotice";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { PROPERTY_TYPES, searchListings, type ListingFilters } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Search Homes for Sale",
  description: "Search homes, land, and rentals for sale across San Antonio and the Hill Country with The Nelson Team.",
  alternates: { canonical: "/homes" },
};

type Params = Record<string, string | string[] | undefined>;

const PRICES = [100000, 200000, 300000, 400000, 500000, 750000, 1000000, 1500000];
const ROOMS = [1, 2, 3, 4, 5];

function readFilters(p: Params): ListingFilters {
  const one = (k: string) => (typeof p[k] === "string" ? (p[k] as string).trim() : "");
  const n = (k: string) => {
    const v = Number(one(k));
    return Number.isFinite(v) && v > 0 ? v : undefined;
  };
  const type = one("type");
  return {
    area: one("area").slice(0, 60) || undefined,
    minPrice: n("min"),
    maxPrice: n("max"),
    beds: n("beds"),
    baths: n("baths"),
    type: PROPERTY_TYPES.some((t) => t.value === type) ? type : undefined,
    page: n("page"),
  };
}

const money = (v: number) => (v >= 1000000 ? `$${v / 1000000}M` : `$${v / 1000}k`);
const selectClass =
  "select-chevron h-12 w-full rounded-md border border-line bg-white pl-3 pr-9 text-[15px] text-blue focus:border-blue focus:outline-none";

export default async function HomesPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const f = readFilters(params);
  const results = await searchListings(f);
  const pages = Math.max(1, Math.ceil(results.total / results.pageSize));
  const pageHref = (page: number) => {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (typeof v === "string" && v && k !== "page") q.set(k, v);
    if (page > 1) q.set("page", String(page));
    const s = q.toString();
    return `/homes${s ? `?${s}` : ""}`;
  };

  return (
    <Section className="pt-8! lg:pt-10!">
      <Container>
        <Eyebrow>Search homes</Eyebrow>
        <div className="flex flex-col gap-x-8 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">Find your next home.</h1>
          {HOW_IT_WORKS.search && (
            <HowItWorks flow={HOW_IT_WORKS.search} className="mt-5 self-start sm:mt-0 sm:self-auto" />
          )}
        </div>

        <form id="search" action="/homes" role="search" className="mt-8 grid grid-cols-2 gap-3 rounded-lg bg-cloud p-4 sm:p-5 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto]">
          <label className="col-span-2 lg:col-span-1">
            <span className="sr-only">City or ZIP code</span>
            <input
              type="search"
              name="area"
              defaultValue={f.area ?? ""}
              placeholder="City or ZIP code"
              maxLength={60}
              className="h-12 w-full rounded-md border border-line bg-white px-3 text-[15px] text-blue placeholder:text-slate/70 focus:border-blue focus:outline-none"
            />
          </label>
          <label>
            <span className="sr-only">Minimum price</span>
            <select name="min" defaultValue={f.minPrice ?? ""} className={selectClass}>
              <option value="">Min price</option>
              {PRICES.map((p) => (
                <option key={p} value={p}>
                  {money(p)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Maximum price</span>
            <select name="max" defaultValue={f.maxPrice ?? ""} className={selectClass}>
              <option value="">Max price</option>
              {PRICES.map((p) => (
                <option key={p} value={p}>
                  {money(p)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Bedrooms</span>
            <select name="beds" defaultValue={f.beds ?? ""} className={selectClass}>
              <option value="">Beds</option>
              {ROOMS.map((r) => (
                <option key={r} value={r}>
                  {r}+ bd
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Bathrooms</span>
            <select name="baths" defaultValue={f.baths ?? ""} className={selectClass}>
              <option value="">Baths</option>
              {ROOMS.slice(0, 4).map((r) => (
                <option key={r} value={r}>
                  {r}+ ba
                </option>
              ))}
            </select>
          </label>
          <label className="col-span-2 lg:col-span-1">
            <span className="sr-only">Property type</span>
            <select name="type" defaultValue={f.type ?? ""} className={selectClass}>
              <option value="">Any type</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="h-12 rounded-md bg-blue px-6 text-[15px] font-medium text-white transition-colors hover:bg-red col-span-2 lg:col-span-1"
          >
            Search
          </button>
        </form>

        {results.source === "site" && (
          <p className="mt-6 rounded-md border border-line px-4 py-3 text-[15px]">
            Full MLS search is coming soon. For now, these are our own listings.{" "}
            <Link href="/buy#contact" className="font-medium text-blue underline underline-offset-4">
              Tell us what you’re looking for
            </Link>{" "}
            and we’ll send matching homes.
          </p>
        )}

        <p className="mt-8 text-[15px]" aria-live="polite">
          {results.total === 1 ? "1 home" : `${results.total.toLocaleString("en-US")} homes`}
          {pages > 1 && ` · Page ${results.page} of ${pages}`}
        </p>

        {results.listings.length > 0 ? (
          <ul className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {results.listings.map((l, i) => (
              <li key={l.ListingKey}>
                <ListingCard listing={l} priority={i < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-lg bg-cloud p-8">
            <p className="text-lg text-blue">No homes match those filters. Try a wider price range or another area.</p>
            <ButtonLink href="/homes" variant="secondary" className="mt-6">
              Clear filters
            </ButtonLink>
          </div>
        )}

        {pages > 1 && (
          <nav aria-label="Results pages" className="mt-12 flex items-center justify-center gap-3">
            {results.page > 1 && (
              <ButtonLink href={pageHref(results.page - 1)} variant="secondary">
                ← Previous
              </ButtonLink>
            )}
            {results.page < pages && <ButtonLink href={pageHref(results.page + 1)}>Next →</ButtonLink>}
          </nav>
        )}

        {results.source === "lera" && <ListingNotice fetchedAt={results.fetchedAt} />}
      </Container>
    </Section>
  );
}
