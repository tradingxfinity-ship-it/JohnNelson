/**
 * "How it works" walkthroughs, shown in an animated pop-up on the service
 * pages (src/components/HowItWorks.tsx): buying, selling, renting, and
 * using Search homes.
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
  | "sold"
  | "renterdocs"
  | "apply"
  | "lease"
  | "movein"
  | "alerts"
  | "search"
  | "listing"
  | "ask";

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

export const HOW_IT_WORKS: Partial<Record<"buy" | "sell" | "rent" | "search", HowFlow>> = {
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
  rent: {
    label: "How renting works",
    introTitle: "Renting a home, step by step.",
    introBody: "One tip before you start, then five steps from telling us what you need to moving in.",
    steps: [
      {
        kind: "tip",
        title: "Have your documents ready",
        body: "Landlords usually ask for ID, proof of income like pay stubs, rental references, and details about pets. Having them ready helps you apply fast.",
        tip: "Good rentals can go quickly, so it pays to be ready.",
        icon: "renterdocs",
      },
      {
        title: "Tell us what you need",
        body: "Share the areas you like, your monthly budget, the size of home, and your move-in date.",
        tip: "Think about your commute and how long you plan to stay.",
        icon: "wishlist",
      },
      {
        title: "Tour rentals",
        body: "We help you narrow the options and see the places that fit, in person or by video.",
        tip: "Ask what utilities and fees are included in the rent.",
        icon: "tour",
      },
      {
        title: "Apply",
        body: "Submit an application for the one you want. The landlord reviews income, rental history, and credit.",
        tip: "Most applications include a fee, so apply for the place you really want.",
        icon: "apply",
      },
      {
        title: "Sign the lease",
        body: "Review the lease terms, sign, and pay the deposit and first month’s rent. Your move-in date is set.",
        tip: "Read the rules on pets, repairs, and ending the lease early.",
        icon: "lease",
      },
      {
        title: "Move in",
        body: "Pick up your keys, do a move-in walkthrough, and make yourself at home.",
        tip: "Photograph the condition on move-in day to protect your deposit.",
        icon: "movein",
      },
    ],
    finaleTitle: "Ready to find your rental?",
    finaleBody: "Tell us what you need and Irma and John will help you find the right place.",
    actions: [
      { label: "Tell us what you need", href: "#contact" },
      { label: "Search homes", href: "/homes" },
    ],
  },
  search: {
    label: "How search works",
    introTitle: "Finding your next home, step by step.",
    introBody: "One tip before you start, then five steps from your first search to your offer.",
    steps: [
      {
        kind: "tip",
        title: "We’ll watch for you",
        body: "Tell us what you’re looking for and Irma and John will let you know when matching homes come up, so you don’t have to keep checking.",
        tip: "Some homes sell fast. A heads-up from us can make the difference.",
        icon: "alerts",
      },
      {
        title: "Search & filter",
        body: "Search by city or ZIP code, then narrow by price, bedrooms, bathrooms, and type.",
        tip: "Homes listed by Irma and John are marked “Our listing.”",
        icon: "search",
      },
      {
        title: "Open a home",
        body: "See the photos, price, and facts for each home in one place.",
        tip: "Tap any photo to see the full gallery.",
        icon: "listing",
      },
      {
        title: "Ask about it",
        body: "Press “Ask about this home” and your message goes straight to Irma and John, with the home already noted.",
        tip: "Ask about HOA fees, taxes, and how long it’s been on the market.",
        icon: "ask",
      },
      {
        title: "Tour it with us",
        body: "We set up a showing, in person or by video, and give you an honest read on the home.",
        tip: "Bring your list of must-haves to every showing.",
        icon: "tour",
      },
      {
        title: "Make it yours",
        body: "When you find the one, we price your offer and negotiate the terms with you.",
        tip: "Being preapproved makes your offer much stronger.",
        icon: "offer",
      },
    ],
    finaleTitle: "Ready to start looking?",
    finaleBody: "Start a search, or tell us what you want and we’ll send you matches.",
    actions: [
      { label: "Start searching", href: "#search" },
      { label: "Tell us what you want", href: "/buy#contact" },
    ],
  },
};
