/**
 * Service pillars and the copy for the Senior Transitions and Building &
 * Investing pages, from the brand rebuild proposal (November 2026).
 * Avoid credentials or numbers here until John confirms them (see docs/WEBSITE-PLAN.md).
 */

export type Pillar = {
  title: string;
  body: string;
  links: { href: string; label: string }[];
};

export const pillars: Pillar[] = [
  {
    title: "Buy & sell with confidence",
    body: "Listings, buyer representation, pricing, marketing, negotiation, and guidance through every step of the transaction. Renting? We help with that too.",
    links: [
      { href: "/buy", label: "Buying" },
      { href: "/sell", label: "Selling" },
      { href: "/rent", label: "Renting" },
    ],
  },
  {
    title: "Senior living & life transitions",
    body: "Downsizing, aging in place, inherited homes, and helping families through major housing decisions.",
    links: [{ href: "/senior-transitions", label: "Life transitions" }],
  },
  {
    title: "Building, remodeling & property potential",
    body: "Construction insight, renovation planning, and an honest read on a property’s condition before you decide.",
    links: [{ href: "/building-investing", label: "Building & remodeling" }],
  },
  {
    title: "Real estate investing",
    body: "Rental property analysis, investor purchases, and planning for long-term ownership.",
    links: [{ href: "/building-investing#investing", label: "Investing" }],
  },
  {
    title: "Community, service & relationships",
    body: "Veteran-owned leadership, local involvement, and relationships that last well beyond closing day.",
    links: [{ href: "/about#service", label: "Our story" }],
  },
];

export type Topic = { title: string; body: string };

export const seniorTransitions = {
  situations: [
    {
      title: "Downsizing",
      body: "Moving to a smaller home that’s easier to manage: pricing the home you’re leaving, timing the two moves, and deciding what to do with a lifetime of belongings.",
    },
    {
      title: "Aging in place",
      body: "Deciding whether a home can work for the years ahead, what changes it might need, and when selling makes more sense.",
    },
    {
      title: "Inherited homes",
      body: "Understanding your options for a family home you’ve inherited, from getting it ready to sell to renting it out, with your attorney or executor in the loop.",
    },
    {
      title: "Helping a parent move",
      body: "Supporting a parent’s move to a new living arrangement, keeping the whole family informed, and taking pressure off the timeline.",
    },
  ] satisfies Topic[],
  steps: [
    {
      title: "Talk it through",
      body: "A no-pressure conversation about your situation, your timing, and who else should be part of the decision.",
    },
    {
      title: "Lay out the options",
      body: "Sell, rent, update, or wait: what each choice means for your finances and your family, explained plainly.",
    },
    {
      title: "Move at your pace",
      body: "A plan built around your schedule, with Irma and John handling the details and keeping everyone updated.",
    },
  ] satisfies Topic[],
};

export const buildingInvesting = {
  building: [
    {
      title: "Construction insight",
      body: "Knowing what goes into building a home helps you judge quality, spot shortcuts, and ask the right questions.",
    },
    {
      title: "Renovation planning",
      body: "Which updates are worth doing before you sell, and which ones a buyer can take on after closing.",
    },
    {
      title: "Property condition",
      body: "A practical read on a home’s condition, so the inspection report doesn’t come as a surprise.",
    },
    {
      title: "Selling as-is or remodeling",
      body: "An honest comparison of selling now versus fixing up first, based on cost, timing, and likely price.",
    },
  ] satisfies Topic[],
  investing: [
    {
      title: "Rental property analysis",
      body: "Rent, expenses, and condition looked at together before you buy, not after.",
    },
    {
      title: "Investor purchases",
      body: "Finding and negotiating properties that fit your goals, whether that’s cash flow, appreciation, or a future home.",
    },
    {
      title: "Long-term ownership",
      body: "Planning for upkeep, improvements, and when to hold or sell.",
    },
  ] satisfies Topic[],
};

/** The specialty pages in the header's "Who we help" menu and the footer. */
export const specialties = [
  { href: "/senior-transitions", label: "Seniors & downsizing", blurb: "Downsizing, inherited homes, and helping parents move" },
  { href: "/veterans", label: "Veterans & military", blurb: "PCS moves, VA loans, and selling or renting when you get orders" },
  { href: "/land", label: "Land & acreage", blurb: "Hill Country lots, acreage, and building on your land" },
  { href: "/luxury", label: "Luxury homes", blurb: "Higher-value homes, marketed and negotiated with care" },
  { href: "/building-investing", label: "Building & investing", blurb: "Construction insight, remodeling, and investment property" },
];

export const veterans = {
  topics: [
    {
      title: "PCS moves to and from San Antonio",
      body: "Orders to Joint Base San Antonio, or leaving it? We plan your search or sale around report dates and moving windows, including when you’re still out of state.",
    },
    {
      title: "Buying with a VA loan",
      body: "We work alongside your VA-approved lender so your offer, inspection, and appraisal steps stay on track, and we explain what sellers need to know about VA offers.",
    },
    {
      title: "Selling when you get orders",
      body: "Pricing, preparing, and timing a sale around a departure date, with Irma and John handling showings while you’re busy with the move.",
    },
    {
      title: "Keeping your home as a rental",
      body: "If you’d rather hold on to your home, we’ll help you think through renting it out while you’re stationed elsewhere.",
    },
  ] satisfies Topic[],
  steps: [
    { title: "Tell us your timeline", body: "Report date, orders, or separation date: we start from the date that matters." },
    { title: "Plan from anywhere", body: "Video walkthroughs and clear updates when you can’t be here in person." },
    { title: "Move with confidence", body: "Closing and keys lined up with your move, not the other way around." },
  ] satisfies Topic[],
};

export const land = {
  topics: [
    {
      title: "Buying land",
      body: "Access, utilities, well and septic, surveys, deed restrictions, and flood zones checked before you commit, so the land fits what you plan to do with it.",
    },
    {
      title: "Selling land",
      body: "Pricing raw land and lots realistically, and presenting what a buyer or builder can do with them.",
    },
    {
      title: "Building on your land",
      body: "John’s homebuilding experience helps you think through site work, layout, and costs before you buy or build.",
    },
    {
      title: "Hill Country and lake lots",
      body: "From Canyon Lake lots to acreage outside the city, we know the communities and what makes each one different.",
    },
  ] satisfies Topic[],
};

export const luxury = {
  topics: [
    {
      title: "Presentation",
      body: "Professional photography and thoughtful preparation so a higher-value home shows at its best online and in person.",
    },
    {
      title: "Privacy and discretion",
      body: "Showings arranged with care and qualified buyers, for sellers who value their privacy.",
    },
    {
      title: "Quality and condition",
      body: "A builder’s eye on construction quality, finishes, and upkeep, for buyers and sellers alike.",
    },
    {
      title: "Negotiation",
      body: "Pricing and negotiation grounded in the local market, so the numbers hold up at appraisal and closing.",
    },
  ] satisfies Topic[],
};
