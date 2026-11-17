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
    /** Team’s Zillow profile. Shows the “Read reviews on Zillow” link when set. */
    profileUrl: "https://www.zillow.com/profile/getitsoldsa" as string | null,
    /**
     * Only add testimonials the client has supplied word for word.
     * Example: { quote: "…", name: "First L.", context: "Sold in 2025" }
     */
    testimonials: [] as { quote: string; name: string; context?: string }[],
  },

  /** Communities listed as service areas on the team’s Zillow profile. */
  serviceAreas: [
    "San Antonio",
    "Stone Oak",
    "Alamo Heights",
    "Shavano Park",
    "Castle Hills",
    "Helotes",
    "Boerne",
    "Schertz",
    "Cibolo",
    "Seguin",
    "Lytle",
  ],

  languages: ["English", "Spanish"],

  /**
   * Current listings, from the team’s Zillow profile (November 2026).
   * Update or remove these as homes sell. An empty list hides the section.
   */
  listingsAsOf: "November 2026",
  listings: [
    {
      address: "12107 Carson Cove",
      url: "https://www.zillow.com/homedetails/12107-Carson-Cv-San-Antonio-TX-78253/83994143_zpid/",
      city: "San Antonio, TX 78253",
      price: "$332,500",
      type: "House",
      details: ["3 bd", "2 ba", "2,142 sqft"],
      highlight: "Private backyard",
      image: {
        src: "/images/carson-cove.webp",
        alt: "Brick single-story home with an arched entry and two-car garage at 12107 Carson Cove",
        width: 1536,
        height: 1080,
      },
    },
    {
      address: "2210 Knights Wood",
      url: "https://www.zillow.com/homedetails/2210-Knights-Wood-San-Antonio-TX-78231/26431190_zpid/",
      city: "San Antonio, TX 78231",
      price: "$285,000",
      type: "House",
      details: ["2 bd", "1 ba", "1,097 sqft"],
      highlight: "Cozy fireplace",
      image: {
        src: "/images/knights-wood.webp",
        alt: "White cottage-style home with a metal roof under a large oak at 2210 Knights Wood",
        width: 1535,
        height: 1024,
      },
    },
    {
      address: "1645 Whispering Hills, Lot 67",
      url: "https://www.zillow.com/homedetails/1645-Whispering-Hills-Dr-67-Canyon-Lake-TX-78133/344625656_zpid/",
      city: "Canyon Lake, TX 78133",
      price: "$69,000",
      type: "Lot",
      details: ["Land"],
      highlight: "Scenic Hill Country views",
      image: {
        src: "/images/whispering-hills-lot.webp",
        alt: "Wooded Hill Country lot with cedar trees and tall grass at 1645 Whispering Hills",
        width: 1080,
        height: 1152,
      },
    },
  ] as {
    address: string;
    /** Listing page on Zillow */
    url?: string;
    city: string;
    price: string;
    type: string;
    details: string[];
    highlight: string;
    image: NonNullable<SiteImage>;
  }[],

  contact: {
    phoneDisplay: "(210) 870-7340",
    phoneHref: "tel:+12108707340",
    email: "getitsoldsa@gmail.com",
    addressLines: ["14439 NW Military Hwy, Suite 108-478", "San Antonio, TX 78231"],
  },

  images: {
    /** Interior photos beside the “How can we help you move?” list. */
    services: [
      { src: "/images/dining-room-green-wall.webp", alt: "Dining room with a green paneled wall and wood table", width: 768, height: 576 },
      { src: "/images/vintage-tile-bathroom.webp", alt: "Bathroom with vintage green tile and arched mirrors", width: 768, height: 576 },
      { src: "/images/living-room-beamed-ceiling.webp", alt: "Living room with a beamed vaulted ceiling", width: 768, height: 576 },
      { src: "/images/kitchen-tile-floor.webp", alt: "Bright kitchen with white cabinets and tile floor", width: 768, height: 576 },
    ] as NonNullable<SiteImage>[],
    /** Arch-topped photo in the military families section. */
    military: {
      src: "/images/ranch-home-oak-tree.webp",
      alt: "Brick ranch home under a large live oak tree",
      width: 1536,
      height: 1080,
    } as SiteImage,
    /** Photo row on the About page. */
    aboutGallery: [
      { src: "/images/two-story-home-porch.webp", alt: "Two-story home with a covered front porch", width: 1536, height: 1080 },
      { src: "/images/living-room-arched-door.webp", alt: "Bright living room with an arched door and fireplace", width: 768, height: 576 },
    ] as NonNullable<SiteImage>[],
    /** Portrait of Irma and John beside “Meet the team” on the homepage. */
    team: {
      src: "/images/irma-john-portrait.jpg",
      alt: "Irma and John Nelson",
      width: 800,
      height: 639,
    } as SiteImage,
    /** Tall photo beside the About page introduction. */
    aboutHero: {
      src: "/images/sold/san-marcos-78666/03.webp",
      alt: "Bright living room with a vaulted, beamed ceiling in a home sold by the team",
      width: 1152,
      height: 864,
    } as SiteImage,
    /** Original portrait of Irma and John, shown small and round (see TeamByline). */
    teamPortrait: {
      src: "/images/irma-john-nelson.jpg",
      alt: "Irma and John Nelson",
      width: 240,
      height: 240,
    } as SiteImage,
    /** Supporting property photos for the service pages. */
    buy: {
      src: "/images/stone-home-exterior.webp",
      alt: "Stone two-story home with a two-car garage under shade trees",
      width: 1535,
      height: 1025,
    } as SiteImage,
    sell: {
      src: "/images/living-room-fireplace.webp",
      alt: "Staged living room with a brick fireplace and dark wood floors",
      width: 768,
      height: 576,
    } as SiteImage,
    rent: {
      src: "/images/two-story-home-exterior.webp",
      alt: "Two-story brick and siding home with a front porch and driveway",
      width: 768,
      height: 576,
    } as SiteImage,
  },
};

export const navLinks = [
  { href: "/buy", label: "Buy" },
  { href: "/sell", label: "Sell" },
  { href: "/rent", label: "Rent" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
];

export const CONTACT_HREF = "/#contact";
