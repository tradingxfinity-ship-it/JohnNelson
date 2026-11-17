/**
 * Editable site content for Get It Sold Realty.
 *
 * Figures, headlines, contact details, and image paths live here so they can
 * be updated without touching page layouts. Image paths point to files in
 * /public. Set an image to `null` to show the neutral placeholder instead.
 */

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
} | null;

export const site = {
  name: "Get It Sold Realty",
  shortName: "Get It Sold",
  team: "Irma and John Nelson",
  city: "San Antonio",

  /** Optional logo file in /public, e.g. "/images/logo.svg". Text wordmark is used when null. */
  logo: null as SiteImage,

  hero: {
    heading: "San Antonio’s #1 Real Estate Couple",
    body: "Buy, sell, or rent with Irma and John Nelson. Get local guidance from a team with 19 years of experience helping people make their next move in San Antonio.",
  },

  stats: [
    { value: "290+", label: "homes sold" },
    { value: "$100M+", label: "in real estate sales" },
    { value: "19", label: "years of experience" },
  ],

  zillow: {
    rating: "5.0",
    reviewCount: "101",
    /** Paste the team’s Zillow profile URL here to show the “Read reviews on Zillow” link. */
    profileUrl: null as string | null,
    /**
     * Only add testimonials the client has supplied word for word.
     * Example: { quote: "…", name: "First L.", context: "Sold in 2025" }
     */
    testimonials: [] as { quote: string; name: string; context?: string }[],
  },

  contact: {
    phoneDisplay: "(210) 870-7340",
    phoneHref: "tel:+12108707340",
    email: "getitsoldsa@gmail.com",
    addressLines: ["14439 NW Military Hwy, Suite 108-478", "San Antonio, TX 78231"],
  },

  images: {
    /** Original portrait of Irma and John. Drop the file in /public/images and set it here. */
    teamPortrait: null as SiteImage,
    /** Second team photo used in “Meet Irma and John” and on the About page. Falls back to teamPortrait. */
    teamCandid: null as SiteImage,
    /** Supporting property photos for the service pages. */
    buy: null as SiteImage,
    sell: null as SiteImage,
    rent: null as SiteImage,
  },
};

export const navLinks = [
  { href: "/buy", label: "Buy" },
  { href: "/sell", label: "Sell" },
  { href: "/rent", label: "Rent" },
  { href: "/about", label: "About" },
];

export const CONTACT_HREF = "/#contact";
