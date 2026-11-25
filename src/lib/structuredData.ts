import { publishedAreas } from "@/content/areas";
import { site } from "@/content/site";
import { SITE_URL } from "./siteUrl";

export const BUSINESS_ID = `${SITE_URL}/#business`;

/**
 * The business and website, described for search engines on every page.
 * Ratings are left out on purpose: Google doesn't accept a business marking up
 * reviews of itself, including ones collected on Zillow.
 */
export function businessGraph() {
  const areas = [...new Set([...site.serviceAreas, ...publishedAreas.map((a) => a.name)])];
  const [streetAddress, cityLine] = site.contact.addressLines;
  const [, city, region, zip] = cityLine.match(/^(.*), (\w{2}) (\d{5})$/) ?? [];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": BUSINESS_ID,
        name: site.name,
        alternateName: site.brokerage.team,
        url: SITE_URL,
        logo: `${SITE_URL}${site.logo?.src ?? "/images/logo.png"}`,
        image: `${SITE_URL}${site.images.team?.src ?? "/images/logo.png"}`,
        telephone: site.contact.phoneHref.replace("tel:", ""),
        email: site.contact.email,
        address: { "@type": "PostalAddress", streetAddress, addressLocality: city, addressRegion: region, postalCode: zip, addressCountry: "US" },
        areaServed: areas.map((name) => ({ "@type": "Place", name: `${name}, Texas` })),
        knowsLanguage: site.languages,
        ...(site.zillow.profileUrl ? { sameAs: [site.zillow.profileUrl] } : {}),
      },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: site.name, publisher: { "@id": BUSINESS_ID } },
    ],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, n) => ({ "@type": "ListItem", position: n + 1, name: i.name, item: `${SITE_URL}${i.path}` })),
  };
}
