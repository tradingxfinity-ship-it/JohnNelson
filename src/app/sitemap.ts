import type { MetadataRoute } from "next";
import { publishedAreas } from "@/content/areas";
import { getPosts } from "@/lib/blog";
import { ourListings } from "@/lib/listings";
import { SITE_URL } from "@/lib/siteUrl";

export const revalidate = 3600;

/** Add new pages here so search engines find them. Blog posts and our own listings are added automatically. */
const PAGES = [
  "",
  "/homes",
  "/listings",
  "/buy",
  "/sell",
  "/rent",
  "/portfolio",
  "/about",
  "/senior-transitions",
  "/veterans",
  "/land",
  "/luxury",
  "/building-investing",
  "/blog",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // A listing feed outage shouldn't take the whole sitemap down
  const listings = await ourListings()
    .then((r) => r.listings)
    .catch(() => []);

  return [
    ...PAGES.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...(publishedAreas.length ? ["/areas", ...publishedAreas.map((a) => `/areas/${a.slug}`)] : []).map((path) => ({ url: `${SITE_URL}${path}` })),
    ...getPosts().map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.date })),
    ...listings.map((l) => ({ url: `${SITE_URL}/homes/${encodeURIComponent(l.ListingKey)}` })),
  ];
}
