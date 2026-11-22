import "server-only";
import { site } from "@/content/site";

/**
 * Listings for the Search homes and Our listings pages.
 *
 * Field names follow the RESO Data Dictionary, the standard LERA MLS uses for
 * its Web API feed. When LERA_RESO_URL and LERA_RESO_TOKEN are set, listings
 * come from LERA (see docs/WEBSITE-PLAN.md for the display rules this file and
 * the pages follow). Until then, the team's own listings from site content are
 * served in the same shape, so the pages work before the feed is connected.
 */

export type ListingPhoto = { url: string; width?: number; height?: number };

export type Listing = {
  /** Stable key used in the page URL */
  ListingKey: string;
  ListingId?: string;
  StandardStatus: string;
  ListPrice: number;
  /** Null when the seller has withheld the address from internet display */
  UnparsedAddress: string | null;
  City: string;
  StateOrProvince: string;
  PostalCode: string;
  PropertyType: string;
  BedroomsTotal?: number;
  BathroomsTotalInteger?: number;
  LivingArea?: number;
  LotSizeAcres?: number;
  YearBuilt?: number;
  PublicRemarks?: string;
  ListAgentFullName?: string;
  ListOfficeName?: string;
  ListOfficePhone?: string;
  ModificationTimestamp?: string;
  Media: ListingPhoto[];
  /** True for the team's own listings */
  isOurs: boolean;
};

export type ListingFilters = {
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  type?: string;
  page?: number;
};

export type ListingResults = {
  listings: Listing[];
  total: number;
  page: number;
  pageSize: number;
  /** "lera" when results come from the LERA MLS feed; "site" for the team's own listings */
  source: "lera" | "site";
  /** When the feed was last read (LERA source only) */
  fetchedAt?: string;
};

export const PAGE_SIZE = 24;

/** LERA allows refreshing no less often than every 12 hours; read the feed hourly. */
const REVALIDATE_SECONDS = 60 * 60;

/** Statuses that may be shown. Expired and withdrawn listings are never displayed (MLS rule 18.3.12). */
const DISPLAY_STATUSES = ["Active", "ActiveUnderContract", "Pending"];

export function feedConfigured() {
  return Boolean(process.env.LERA_RESO_URL && process.env.LERA_RESO_TOKEN);
}

export async function searchListings(filters: ListingFilters): Promise<ListingResults> {
  return feedConfigured() ? searchLera(filters) : searchSite(filters);
}

/** The team's own current listings, from the feed when connected. */
export async function ourListings(): Promise<ListingResults> {
  if (feedConfigured() && process.env.LERA_OFFICE_MLS_ID) return searchLera({}, true);
  return searchSite({});
}

export async function getListing(key: string): Promise<{ listing: Listing; source: "lera" | "site" } | null> {
  const local = siteListings().find((l) => l.ListingKey === key);
  if (local) return { listing: local, source: "site" };
  if (!feedConfigured()) return null;
  const rows = await leraQuery({ filter: `ListingKey eq '${key.replace(/'/g, "''")}'`, top: 1, skip: 0 });
  const listing = rows.value.map(fromReso).find(displayable);
  return listing ? { listing, source: "lera" } : null;
}

export const PROPERTY_TYPES = [
  { value: "Residential", label: "Homes" },
  { value: "Land", label: "Land" },
  { value: "Residential Income", label: "Multi-family" },
  { value: "Residential Lease", label: "Rentals" },
];

// ---------- LERA MLS (RESO Web API) ----------

const SELECT = [
  "ListingKey",
  "ListingId",
  "StandardStatus",
  "ListPrice",
  "UnparsedAddress",
  "City",
  "StateOrProvince",
  "PostalCode",
  "PropertyType",
  "BedroomsTotal",
  "BathroomsTotalInteger",
  "LivingArea",
  "LotSizeAcres",
  "YearBuilt",
  "PublicRemarks",
  "ListAgentFullName",
  "ListOfficeName",
  "ListOfficePhone",
  "ListOfficeMlsId",
  "ModificationTimestamp",
  "InternetEntireListingDisplayYN",
  "InternetAddressDisplayYN",
].join(",");

type ResoRow = Record<string, unknown> & { Media?: { MediaURL?: string; Order?: number; ImageWidth?: number; ImageHeight?: number }[] };

async function leraQuery({ filter, top, skip, orderby }: { filter: string; top: number; skip: number; orderby?: string }) {
  const params = new URLSearchParams({
    $filter: filter,
    $top: String(top),
    $skip: String(skip),
    $select: SELECT,
    $expand: "Media($select=MediaURL,Order,ImageWidth,ImageHeight;$orderby=Order)",
    $count: "true",
  });
  if (orderby) params.set("$orderby", orderby);
  const res = await fetch(`${process.env.LERA_RESO_URL!.replace(/\/$/, "")}/Property?${params}`, {
    headers: { Authorization: `Bearer ${process.env.LERA_RESO_TOKEN}`, Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS, tags: ["lera"] },
  });
  if (!res.ok) throw new Error(`LERA feed request failed (${res.status})`);
  return (await res.json()) as { value: ResoRow[]; "@odata.count"?: number };
}

async function searchLera(f: ListingFilters, oursOnly = false): Promise<ListingResults> {
  const q = (s: string) => `'${s.replace(/'/g, "''")}'`;
  const clauses = [
    `(${DISPLAY_STATUSES.map((s) => `StandardStatus eq ${q(s)}`).join(" or ")})`,
    // Sellers who opted out of internet display are never shown (MLS rule 18.2.3)
    "InternetEntireListingDisplayYN ne false",
  ];
  if (oursOnly) clauses.push(`ListOfficeMlsId eq ${q(process.env.LERA_OFFICE_MLS_ID!)}`);
  const area = f.area?.trim();
  if (area) clauses.push(/^\d{5}$/.test(area) ? `PostalCode eq ${q(area)}` : `contains(tolower(City), ${q(area.toLowerCase())})`);
  if (f.minPrice) clauses.push(`ListPrice ge ${f.minPrice}`);
  if (f.maxPrice) clauses.push(`ListPrice le ${f.maxPrice}`);
  if (f.beds) clauses.push(`BedroomsTotal ge ${f.beds}`);
  if (f.baths) clauses.push(`BathroomsTotalInteger ge ${f.baths}`);
  if (f.type) clauses.push(`PropertyType eq ${q(f.type)}`);

  const page = Math.max(1, f.page ?? 1);
  const data = await leraQuery({
    filter: clauses.join(" and "),
    top: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
    orderby: "ModificationTimestamp desc",
  });
  const listings = data.value.map(fromReso).filter(displayable);
  return {
    listings,
    total: data["@odata.count"] ?? listings.length,
    page,
    pageSize: PAGE_SIZE,
    source: "lera",
    fetchedAt: new Date().toISOString(),
  };
}

function fromReso(r: ResoRow): Listing {
  const str = (k: string) => (typeof r[k] === "string" ? (r[k] as string) : undefined);
  const num = (k: string) => (typeof r[k] === "number" ? (r[k] as number) : undefined);
  const ours = Boolean(process.env.LERA_OFFICE_MLS_ID) && str("ListOfficeMlsId") === process.env.LERA_OFFICE_MLS_ID;
  return {
    ListingKey: str("ListingKey") ?? "",
    ListingId: str("ListingId"),
    StandardStatus: str("StandardStatus") ?? "",
    ListPrice: num("ListPrice") ?? 0,
    // Hide the address when the seller withheld it (MLS rule 18.2.3)
    UnparsedAddress: r.InternetAddressDisplayYN === false ? null : (str("UnparsedAddress") ?? null),
    City: str("City") ?? "",
    StateOrProvince: str("StateOrProvince") ?? "TX",
    PostalCode: str("PostalCode") ?? "",
    PropertyType: str("PropertyType") ?? "",
    BedroomsTotal: num("BedroomsTotal"),
    BathroomsTotalInteger: num("BathroomsTotalInteger"),
    LivingArea: num("LivingArea"),
    LotSizeAcres: num("LotSizeAcres"),
    YearBuilt: num("YearBuilt"),
    PublicRemarks: str("PublicRemarks"),
    ListAgentFullName: str("ListAgentFullName"),
    ListOfficeName: str("ListOfficeName"),
    ListOfficePhone: str("ListOfficePhone"),
    ModificationTimestamp: str("ModificationTimestamp"),
    Media: (r.Media ?? [])
      .filter((m) => m.MediaURL)
      .map((m) => ({ url: m.MediaURL!, width: m.ImageWidth, height: m.ImageHeight })),
    isOurs: ours,
  };
}

function displayable(l: Listing) {
  return Boolean(l.ListingKey) && DISPLAY_STATUSES.includes(l.StandardStatus);
}

// ---------- The team's own listings from site content ----------

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function siteListings(): Listing[] {
  return site.listings.map((l) => {
    const [, city = "", state = "TX", zip = ""] = l.city.match(/^(.*?),\s*([A-Z]{2})\s*(\d{5})?$/) ?? [];
    const n = (re: RegExp) => {
      const m = l.details.join(" ").match(re);
      return m ? Number(m[1].replace(/,/g, "")) : undefined;
    };
    return {
      ListingKey: slug(`${l.address} ${zip}`),
      StandardStatus: "Active",
      ListPrice: Number(l.price.replace(/[^0-9.]/g, "")),
      UnparsedAddress: l.address,
      City: city,
      StateOrProvince: state,
      PostalCode: zip,
      PropertyType: l.type === "Lot" ? "Land" : "Residential",
      BedroomsTotal: n(/([\d.]+)\s*bd/),
      BathroomsTotalInteger: n(/([\d.]+)\s*ba/),
      LivingArea: n(/([\d,]+)\s*sqft/),
      PublicRemarks: l.highlight,
      ListAgentFullName: site.brokerage.agent,
      ListOfficeName: site.name,
      ListOfficePhone: site.contact.phoneDisplay,
      Media: [{ url: l.image.src, width: l.image.width, height: l.image.height }],
      isOurs: true,
    };
  });
}

/** The site only holds the team's own listings, so every result here is theirs. */
function searchSite(f: ListingFilters): ListingResults {
  const area = f.area?.trim().toLowerCase();
  const listings = siteListings().filter(
    (l) =>
      (!area || l.City.toLowerCase().includes(area) || l.PostalCode === area) &&
      (!f.minPrice || l.ListPrice >= f.minPrice) &&
      (!f.maxPrice || l.ListPrice <= f.maxPrice) &&
      (!f.beds || (l.BedroomsTotal ?? 0) >= f.beds) &&
      (!f.baths || (l.BathroomsTotalInteger ?? 0) >= f.baths) &&
      (!f.type || l.PropertyType === f.type),
  );
  return { listings, total: listings.length, page: 1, pageSize: PAGE_SIZE, source: "site" };
}

// ---------- Formatting ----------

export const formatPrice = (n: number) =>
  n ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : "Price on request";

export function listingFacts(l: Listing) {
  return [
    l.BedroomsTotal != null && `${l.BedroomsTotal} bd`,
    l.BathroomsTotalInteger != null && `${l.BathroomsTotalInteger} ba`,
    l.LivingArea != null && `${l.LivingArea.toLocaleString("en-US")} sqft`,
    l.LotSizeAcres != null && l.PropertyType === "Land" && `${l.LotSizeAcres} acres`,
  ].filter(Boolean) as string[];
}

export const listingTitle = (l: Listing) => l.UnparsedAddress ?? `Home in ${l.City}`;
export const listingPlace = (l: Listing) => `${l.City}, ${l.StateOrProvince} ${l.PostalCode}`.trim();
