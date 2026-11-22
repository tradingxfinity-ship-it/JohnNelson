import type { InquiryType } from "@/lib/inquiry";
import { site, type SiteImage } from "./site";

/**
 * Text for the Buy, Sell, and Rent pages. The page shows the copy for whichever
 * option is chosen in its inquiry form, so switching Buy/Sell/Rent there
 * updates the heading, text, photo, and steps too.
 */
export type ServiceCopy = {
  /** Page title (also used in each page's metadata) */
  title: string;
  eyebrow: string;
  headline: string;
  intro: string;
  image: SiteImage;
  imageAlt: string;
  steps: { title: string; body: string }[];
};

export const SERVICE_PAGES: Record<InquiryType, ServiceCopy> = {
  buy: {
    title: "Buy a Home in San Antonio",
    eyebrow: "Buying",
    headline: "Find a home in San Antonio.",
    intro:
      "Tell us where you’d like to live, what you want to spend, and when you hope to move. Irma and John will follow up to talk through your search.",
    image: site.images.buy,
    imageAlt: "A San Antonio home for sale",
    steps: [
      { title: "Share what you need", body: "Send your preferred areas, budget range, property type, and timeline." },
      { title: "Talk it through", body: "Irma and John reach out to understand your plans and answer your questions." },
      { title: "Start your search", body: "Get local guidance as you tour homes, compare options, and make an offer." },
    ],
  },
  sell: {
    title: "Sell Your Home in San Antonio",
    eyebrow: "Selling",
    headline: "Sell your home with a local San Antonio team.",
    intro:
      "Request a home valuation and Irma and John will follow up to talk about your property, what it could sell for, and the timing that works for you.",
    image: site.images.sell,
    imageAlt: "A San Antonio home recently sold",
    steps: [
      { title: "Request a valuation", body: "Share your property address, property type, and when you’re thinking of selling." },
      { title: "Get a personal follow-up", body: "Irma and John contact you to learn about your home and review its value with you." },
      { title: "Plan your sale", body: "Decide on pricing, preparation, and timing with a team that knows the local market." },
    ],
  },
  rent: {
    title: "Find a Rental in San Antonio",
    eyebrow: "Renting",
    headline: "Find a rental that fits your plans.",
    intro:
      "Whether you need a house, townhome, or apartment, tell us where you want to live, your monthly budget, and when you need to move in.",
    image: site.images.rent,
    imageAlt: "A San Antonio rental home",
    steps: [
      { title: "Tell us what you need", body: "Share your preferred areas, monthly budget, property type, and move-in date." },
      { title: "Narrow your search", body: "Irma and John follow up to help you focus on rentals that match your plans." },
      { title: "Move in on time", body: "Get help keeping your search on track for the date you need to move." },
    ],
  },
};
