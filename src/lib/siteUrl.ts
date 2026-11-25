/**
 * The site's public address, with no trailing slash. Used for canonical links,
 * the sitemap, structured data, and share previews.
 *
 * When the custom domain is live, set NEXT_PUBLIC_SITE_URL to it and redeploy.
 * Vercel's own production-domain variable isn't used: it can name a domain
 * that was added to the project before its DNS works, which would point search
 * engines at an address that doesn't load.
 */
const DEFAULT_URL = process.env.NODE_ENV === "production" ? "https://johnnelson.vercel.app" : "http://localhost:3000";

function resolveSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_URL;
  return (/^https?:\/\//.test(url) ? url : `https://${url}`).replace(/\/+$/, "");
}

export const SITE_URL = resolveSiteUrl();
