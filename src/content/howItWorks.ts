/**
 * "How it works" walkthroughs, shown in an animated pop-up on the service
 * pages (src/components/HowItWorks.tsx). Buying is first; Selling, Renting,
 * and Search homes can be added with the same shape.
 */

export type HowIcon = "approval" | "wishlist" | "tour" | "offer" | "inspect" | "keys";

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

export const HOW_IT_WORKS: Record<"buy", HowFlow> = {
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
};
