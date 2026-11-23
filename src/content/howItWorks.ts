/**
 * "How it works" walkthroughs, shown in an animated pop-up on the service
 * pages (src/components/HowItWorks.tsx). Buying and selling are written;
 * Renting and Search homes can be added with the same shape.
 */

export type HowIcon =
  | "approval"
  | "wishlist"
  | "tour"
  | "offer"
  | "inspect"
  | "keys"
  | "paperwork"
  | "valuation"
  | "prepare"
  | "market"
  | "offers"
  | "sold";

export type HowStep = {
  /** "tip" slides come before the numbered steps and are labeled as tips, not steps */
  kind?: "tip";
  title: string;
  body: string;
  /** A short practical note under the slide */
  tip: string;
  icon: HowIcon;
};

export type HowFlow = {
  /** Button and dialog label, e.g. "How buying works" */
  label: string;
  introTitle: string;
  introBody: string;
  steps: HowStep[];
  finaleTitle: string;
  finaleBody: string;
  actions: { label: string; href: string }[];
};

export const HOW_IT_WORKS: Partial<Record<"buy" | "sell" | "rent", HowFlow>> = {
  buy: {
    label: "How buying works",
    introTitle: "Buying a home, step by step.",
    introBody: "One tip before you start, then five steps from your first conversation to the keys in your hand, with Irma and John beside you the whole way.",
    steps: [
      {
        kind: "tip",
        title: "Get preapproved by a lender",
        body: "Before you shop, have a lender confirm how much you can borrow, so you know your budget and sellers take your offer seriously. We can suggest local lenders.",
        tip: "Paying cash? You’ll show proof of funds instead of a preapproval letter.",
        icon: "approval",
      },
      {
        title: "Tell us what you want",
        body: "Share the areas you like, your budget, your must-haves, and your timeline. We’ll shape the search around your life.",
        tip: "Think about your daily commute, schools, and how long you plan to stay.",
        icon: "wishlist",
      },
      {
        title: "Tour homes",
        body: "We set up showings, including video walkthroughs if you’re out of town, and give you an honest read on each home’s condition.",
        tip: "John’s building background helps spot issues worth a closer look.",
        icon: "tour",
      },
      {
        title: "Make an offer",
        body: "We look at recent sales nearby to price your offer, then negotiate the terms with you until it’s accepted.",
        tip: "Price isn’t everything: closing date, repairs, and terms matter too.",
        icon: "offer",
      },
      {
        title: "Inspection & appraisal",
        body: "Your inspector checks the home during the option period, and your lender orders an appraisal. We help you handle repairs or credits.",
        tip: "In Texas, the option period is your window to inspect and decide.",
        icon: "inspect",
      },
      {
        title: "Close & get your keys",
        body: "Sign the final papers at the title company. Once the loan funds and the deed records, the home is yours.",
        tip: "Do a final walkthrough before closing to make sure everything’s as agreed.",
        icon: "keys",
      },
    ],
    finaleTitle: "Welcome home.",
    finaleBody: "Ready to take the first step? Tell us what you’re looking for, or start browsing homes for sale.",
    actions: [
      { label: "Tell us what you’re looking for", href: "#contact" },
      { label: "Search homes", href: "/homes" },
    ],
  },
  sell: {
    label: "How selling works",
    introTitle: "Selling your home, step by step.",
    introBody: "One tip before you start, then six steps from pricing to closing, with Irma and John handling the details.",
    steps: [
      {
        kind: "tip",
        title: "Gather your paperwork",
        body: "Pull together your mortgage payoff details, survey, HOA documents, and receipts for upgrades. Having them ready keeps your sale moving.",
        tip: "Know of any issues? Note them now for your seller’s disclosure.",
        icon: "paperwork",
      },
      {
        title: "Find out what it’s worth",
        body: "We compare recent sales nearby and your home’s condition to recommend a smart list price.",
        tip: "Pricing right from day one usually beats cutting the price later.",
        icon: "valuation",
      },
      {
        title: "Get it ready to show",
        body: "Small repairs, fresh paint, and a clean, uncluttered space help buyers picture themselves living there. We’ll tell you what’s worth doing.",
        tip: "John’s building background helps you skip projects that won’t pay off.",
        icon: "prepare",
      },
      {
        title: "List & market it",
        body: "Professional photos, an online listing, and a sign in the yard put your home in front of buyers fast.",
        tip: "The first couple of weeks on the market usually bring the most attention.",
        icon: "market",
      },
      {
        title: "Showings & offers",
        body: "We schedule showings around your life, then walk you through every offer: price, terms, and timing.",
        tip: "The highest price isn’t always the best offer. Financing and terms matter too.",
        icon: "offers",
      },
      {
        title: "Inspection & appraisal",
        body: "The buyer’s inspector and appraiser visit. We help you answer repair requests and keep the deal on track.",
        tip: "In Texas, repair requests usually come during the buyer’s option period.",
        icon: "inspect",
      },
      {
        title: "Close & hand over the keys",
        body: "Sign at the title company, the sale funds, and the keys go to the new owners. Congratulations, it’s sold!",
        tip: "Line up your move-out date with your closing date before you list.",
        icon: "sold",
      },
    ],
    finaleTitle: "Ready to sell?",
    finaleBody: "Find out what your home could sell for, or see the homes we’ve already sold.",
    actions: [
      { label: "What’s my home worth?", href: "#contact" },
      { label: "See homes we’ve sold", href: "/portfolio" },
    ],
  },
};
