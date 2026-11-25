import type { Faq } from "@/components/Faqs";
import type { InquiryType } from "@/lib/inquiry";
import type { Topic } from "./services";
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
  /** Longer guidance and common questions below the steps */
  guide?: { headline: string; topics: Topic[]; links: { href: string; label: string }[] };
  faqs?: Faq[];
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
    guide: {
      headline: "What to know about buying in San Antonio.",
      topics: [
        { title: "Know the full monthly cost", body: "Property taxes, insurance, HOA dues, and utilities can change a lot from one home to the next, even at the same price. We look at them with you before you choose." },
        { title: "Compare city and county", body: "A home inside San Antonio, in a smaller city, or in the county can have different taxes, services, and rules. We help you check the specific address." },
        { title: "Look past the finishes", body: "Fresh paint doesn’t tell you about the roof, foundation, or drainage. John’s building background helps spot what deserves a closer look from your inspector." },
        { title: "Use your option period well", body: "In Texas, buyers commonly pay a fee for a set number of days to inspect the home and decide. Booking inspections right away gives you time to negotiate." },
        { title: "Buying and selling together", body: "If you need to sell first, we plan both moves at once: what your current home could bring, what you can spend, and how to line up the closings." },
        { title: "Buying from out of town", body: "Moving here for work or on military orders? We can set up video walkthroughs and plan the search around your dates." },
      ],
      links: [
        { href: "/homes", label: "Search homes" },
        { href: "/veterans", label: "Buying with a VA loan" },
        { href: "/land", label: "Buying land" },
      ],
    },
    faqs: [
      { q: "Do I need a preapproval before I look at homes?", a: "You can start talking with us anytime, but a lender’s preapproval shows your real budget and helps a seller take your offer seriously. Paying cash? You’ll usually show proof of funds instead." },
      { q: "Why do I have to sign an agreement before touring a home?", a: "Since January 1, 2026, Texas law requires a license holder to have a written agreement with a buyer before showing residential property. Read what it covers, how long it lasts, and how your agent is paid. Compensation is negotiable." },
      { q: "How much do I need for a down payment?", a: "It depends on the loan. Some programs allow a low down payment, and eligible VA borrowers may be able to buy with none. A lender can tell you what you qualify for, and you’ll also need to plan for closing costs." },
      { q: "How long does it take to buy a home?", a: "Finding the right home can take days or months. Once your offer is accepted, a financed purchase often takes about 30 to 45 days to close, depending on the lender, title work, and appraisal." },
      { q: "What is the option period in Texas?", a: "It’s a negotiated number of days, usually paid for with an option fee, when the buyer can end the contract for any reason. It’s the time to inspect the home and negotiate repairs." },
      { q: "Can I get a homestead exemption?", a: "If the home is your main residence, you can apply with the county appraisal district after you buy. It lowers the taxable value of your home. You never need to pay a company to apply for you." },
      { q: "Can you help me in Spanish?", a: "Yes. We speak English and Spanish." },
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
    guide: {
      headline: "What to know about selling in San Antonio.",
      topics: [
        { title: "Price from real sales", body: "Online estimates can’t see your kitchen, your lot, or your roof. We start with recent sales near you, then adjust for condition and updates." },
        { title: "Fix what matters", body: "Not every project pays you back. John’s building background helps you sort repairs buyers will insist on from upgrades you can skip." },
        { title: "Make the first weeks count", body: "A home gets the most attention when it’s new on the market. Photos, price, and preparation should be ready before it goes live." },
        { title: "Read the whole offer", body: "Financing, option period, repairs, and closing date can matter as much as price. We compare every offer with you, line by line." },
        { title: "Selling as-is", body: "If you don’t want to make repairs, we help you weigh a quick as-is sale against fixing up first, with the likely cost and price of each." },
        { title: "Selling an inherited home", body: "We work with your family, and your attorney or executor, on clearing the house, deciding what to repair, and choosing the right time to sell." },
      ],
      links: [
        { href: "/senior-transitions", label: "Downsizing and inherited homes" },
        { href: "/blog/sell-as-is-or-remodel", label: "Sell as-is or remodel first?" },
        { href: "/portfolio", label: "Homes we’ve sold" },
      ],
    },
    faqs: [
      { q: "How do I find out what my San Antonio home is worth?", a: "Send the form on this page. Irma and John will look at recent sales near you and talk with you about condition, updates, and timing before recommending a price." },
      { q: "Can I sell my house as-is?", a: "Yes. As-is means you don’t plan to make repairs. Buyers can still inspect, and most Texas home sellers still have to complete a seller’s disclosure notice about what they know." },
      { q: "What does it cost to sell a home in Texas?", a: "Common costs include broker compensation, title charges, your share of property taxes, any agreed repairs, and paying off your mortgage. Broker compensation isn’t set by law and is negotiable. We’ll estimate what you’d take home before you list." },
      { q: "How long will it take to sell?", a: "It depends on price, condition, location, and the market. After you accept an offer, a buyer using a loan often needs about 30 to 45 days to close. Cash can be faster." },
      { q: "Should I repair or remodel before selling?", a: "Start with safety, leaks, and anything likely to worry an inspector or appraiser. Bigger remodels don’t always return what they cost, so compare the numbers before you begin." },
      { q: "Can I sell an inherited house?", a: "Usually, once the right person has legal authority to sell. That may depend on a will, probate, or agreement among heirs, so talk with an attorney early. We can help with value, condition, and timing in the meantime." },
      { q: "Can I sell and buy at the same time?", a: "Yes. We’ll look at your equity, your loan options, and both closing dates, then talk through choices such as a longer closing or a short leaseback." },
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
