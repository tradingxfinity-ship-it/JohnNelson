/**
 * The site's public address, with no trailing slash. Used for canonical links,
 * the sitemap, structured data, and share previews.
 *
 * NEXT_PUBLIC_SITE_URL wins when set. Otherwise Vercel's production domain is
 * used, which becomes the custom domain once one is added to the project.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url =
    explicit || vercel || (process.env.NODE_ENV === "production" ? "johnnelson.vercel.app" : "http://localhost:3000");
  return (/^https?:\/\//.test(url) ? url : `https://${url}`).replace(/\/+$/, "");
}

export const SITE_URL = resolveSiteUrl();
