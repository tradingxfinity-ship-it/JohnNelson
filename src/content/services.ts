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
