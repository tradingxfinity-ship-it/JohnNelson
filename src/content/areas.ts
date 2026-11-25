import type { Faq } from "@/components/Faqs";
import type { Topic } from "./services";
import type { SiteImage } from "./site";

/**
 * Pages for the areas Irma and John work in, at /areas/<slug>.
 *
 * `published: false` keeps a page out of Google, the sitemap, and the site's
 * links, so John and Irma can review it at its address first. Change it to
 * true once they approve it.
 *
 * Keep to facts about places and property. Never describe who lives in an area
 * or who it suits, and don't rate schools or safety (fair housing).
 */
export type Area = {
  slug: string;
  name: string;
  published: boolean;
  /** Page title, before "| Get It Sold Realty" */
  title: string;
  description: string;
  headline: string;
  intro: string[];
  image: NonNullable<SiteImage>;
  /** Small tab on the photo, for homes the team sold in the area */
  caption?: string;
  about: { headline: string; paragraphs: string[] };
  checks: Topic[];
  faqs: Faq[];
  /** Portfolio homes to show, by ZIP code */
  zips: string[];
  /** City names that match this area's current listings */
  listingCities: string[];
  related: { href: string; label: string }[];
};

export const areas: Area[] = [
  {
    slug: "canyon-lake",
    name: "Canyon Lake",
    published: false,
    title: "Canyon Lake Homes & Land",
    description:
      "Buying or selling a home, lot, or land at Canyon Lake, Texas? Irma and John Nelson have sold homes and land around the lake and know what to check before you buy.",
    headline: "Canyon Lake homes and land.",
    intro: [
      "Canyon Lake is one of the areas where Irma and John have sold the most. Whether you’re buying a lake house, choosing a lot to build on, or selling a place you’ve owned for years, you’ll work with people who know the questions to ask here.",
    ],
    image: { src: "/images/portfolio/23.webp", alt: "Home in Canyon Lake sold by Irma and John Nelson", width: 1152, height: 864 },
    caption: "Sold in Canyon Lake",
    about: {
      headline: "About the area",
      paragraphs: [
        "Canyon Lake is in the Hill Country of northern Comal County, between San Antonio and Austin. The lake is a reservoir on the Guadalupe River, finished in 1964 and managed by the U.S. Army Corps of Engineers.",
        "The Canyon Lake area isn’t one city. It takes in several unincorporated communities around the lake, including Sattler, Startzville, Canyon City, Cranes Mill, and Hancock. Homes, rules, and utilities can be different from one subdivision to the next, so it helps to look at each property on its own.",
        "Canyon Lake is served by Comal ISD. Confirm the schools for a specific address with the district.",
      ],
    },
    checks: [
      { title: "Water and septic", body: "Find out whether a property has a water company or a private well, and whether it uses a septic system. For a lot, ask what a new system would need." },
      { title: "Subdivision rules", body: "Deed restrictions can cover home size, building materials, RVs, manufactured homes, and short-term rentals. Read them before you make an offer." },
      { title: "The lake and shoreline", body: "The Army Corps of Engineers manages the lake and the land next to it. Ask what’s allowed before you buy with a dock or a path to the water in mind." },
      { title: "Flood zones and slope", body: "Properties near the lake, the river, or a creek can be in a flood zone. On a hillside lot, slope and rock affect where a house can go and what it costs to build." },
    ],
    faqs: [
      { q: "Can I build on a Canyon Lake lot?", a: "Often, but check first. Look at the deed restrictions, the survey, access, water, septic, flood zone, and slope. John’s homebuilding background helps you think through those questions before you buy." },
      { q: "Can I rent out a Canyon Lake home short term?", a: "It depends on the property. Subdivision restrictions may limit or ban short-term rentals, and state and local hotel taxes can apply. Check the rules for the specific address before counting on rental income." },
      { q: "Do lake homes flood?", a: "Some properties near the lake, the Guadalupe River, or a creek are in mapped flood zones and some aren’t. Check the flood map, ask for any flood history the seller has disclosed, and get an insurance quote early." },
    ],
    zips: ["78133", "78070"],
    listingCities: ["Canyon Lake"],
    related: [
      { href: "/land", label: "Land and acreage" },
      { href: "/blog/before-you-buy-land", label: "What to check before you buy land" },
    ],
  },
  {
    slug: "boerne",
    name: "Boerne",
    published: false,
    title: "Boerne Homes, Land & Acreage",
    description:
      "Buy or sell a home, lot, or acreage in Boerne and Kendall County, Texas with Irma and John Nelson of Get It Sold Realty. What to check before you buy.",
    headline: "Boerne homes, land, and acreage.",
    intro: [
      "Boerne offers in-town homes, newer subdivisions, and Hill Country acreage. Irma and John help you compare them, and look closely at what each property would take to own, build on, or sell.",
    ],
    image: { src: "/images/ranch-home-front-porch.webp", alt: "Ranch-style home with a covered front porch", width: 1536, height: 1080 },
    about: {
      headline: "About the area",
      paragraphs: [
        "Boerne is the county seat of Kendall County, about 31 miles northwest of downtown San Antonio on Interstate 10. German settlers platted the town in 1852, and that history still shows around its older streets. Cibolo Creek runs through the city.",
        "Property outside the city limits can work very differently from property in town. Taxes, utilities, permits, and building rules can all change depending on which side of the line you’re on.",
        "Confirm the school district and campuses for a specific address before you buy.",
      ],
    },
    checks: [
      { title: "City or county", body: "Find out whether a property is inside the Boerne city limits. It affects taxes, utilities, permits, and what you can build." },
      { title: "Wells and septic", body: "Many rural properties use a private well and a septic system. Ask about well depth and output, and have both inspected." },
      { title: "Agricultural valuation", body: "Some acreage is taxed under an agricultural or wildlife valuation. Learn what keeps it in place, and what taxes could follow a change in use." },
      { title: "HOA and deed restrictions", body: "Rules can cover home size, exterior materials, fences, animals, and outbuildings. Ask for the documents early." },
    ],
    faqs: [
      { q: "Is it better to buy a lot or an existing home in Boerne?", a: "It depends on your budget, timeline, and how much you want to choose yourself. Building adds site work, utilities, permits, and time. John’s homebuilding background helps you compare the full cost of both before you decide." },
      { q: "Can I keep horses or livestock on a Boerne property?", a: "On some properties, yes. Deed restrictions, HOA rules, and city rules can limit the type and number of animals, so check the specific property before you make an offer." },
      { q: "How do you price acreage for sale?", a: "Recent land sales nearby are the starting point. Then we look at access, water, views, restrictions, floodplain, improvements, and how much of the land can be used." },
    ],
    zips: ["78006", "78015"],
    listingCities: ["Boerne"],
    related: [
      { href: "/land", label: "Land and acreage" },
      { href: "/luxury", label: "Luxury homes" },
    ],
  },
  {
    slug: "helotes",
    name: "Helotes",
    published: false,
    title: "Helotes Homes for Sale & Selling Help",
    description:
      "Buy or sell a home in Helotes, Texas with Irma and John Nelson of Get It Sold Realty. Local property details to check, and a direct line to the team.",
    headline: "Buy or sell in Helotes.",
    intro: [
      "Helotes sits where northwest San Antonio meets the Hill Country, with homes that range from established subdivisions to larger lots. Irma and John help you understand each property before you buy, and price yours with care when you sell.",
    ],
    image: { src: "/images/portfolio/54.webp", alt: "Home in Helotes sold by Irma and John Nelson", width: 1152, height: 864 },
    caption: "Sold in Helotes",
    about: {
      headline: "About the area",
      paragraphs: [
        "Helotes is its own city in Bexar County, on the far northwest side of San Antonio and about 20 miles from downtown. State Highway 16, also called Bandera Road, runs through it and on toward Bandera.",
        "The town is known for John T. Floore’s Country Store, a longtime live music venue and dance hall, and for its yearly Cornyval festival.",
        "A Helotes mailing address doesn’t always mean the home is inside the city. Some addresses are in San Antonio or unincorporated Bexar County, which can change taxes and services.",
      ],
    },
    checks: [
      { title: "Which city it’s in", body: "Confirm whether the home is in Helotes, San Antonio, or unincorporated Bexar County. It affects property taxes, permits, and services." },
      { title: "HOA rules and fees", body: "Many subdivisions have an HOA. Review the fees, rules, and any gate or amenity costs along with the price of the home." },
      { title: "Larger lots", body: "On bigger lots, check for septic, easements, drainage, and any limits on outbuildings or fences." },
      { title: "Hillside and creek areas", body: "Look at slope, drainage, retaining walls, and the flood map, especially near creeks." },
    ],
    faqs: [
      { q: "Is Helotes part of San Antonio?", a: "No. Helotes is a separate city in Bexar County, although it’s part of the San Antonio metro area. Some homes with a Helotes mailing address are outside the Helotes city limits." },
      { q: "How do I find out what my Helotes home is worth?", a: "Request a valuation and we’ll look at recent sales near you, your lot, updates, and condition. An online estimate can’t see those details." },
      { q: "Should I update my home before I sell?", a: "Not always. Some repairs help a sale and others cost more than they return. John’s building background helps you decide which ones are worth doing." },
    ],
    zips: ["78023"],
    listingCities: ["Helotes"],
    related: [
      { href: "/sell", label: "Selling your home" },
      { href: "/blog/sell-as-is-or-remodel", label: "Should you sell as-is or remodel first?" },
    ],
  },
  {
    slug: "stone-oak",
    name: "Stone Oak",
    published: false,
    title: "Stone Oak Homes, San Antonio",
    description:
      "Buy or sell a home in Stone Oak and far north San Antonio with Irma and John Nelson of Get It Sold Realty. HOA, condition, and pricing help from a local team.",
    headline: "Buy or sell in Stone Oak.",
    intro: [
      "Stone Oak is made up of many separate neighborhoods, each with its own homes, age, and HOA. Irma and John help you compare them street by street, whether you’re buying or getting ready to sell.",
    ],
    image: { src: "/images/portfolio/29.webp", alt: "Home in far north San Antonio sold by Irma and John Nelson", width: 1152, height: 864 },
    caption: "Sold in 78258",
    about: {
      headline: "About the area",
      paragraphs: [
        "Stone Oak is a master-planned district in north central San Antonio, established in 1985. It lies north of Loop 1604, between Blanco Road on the west and U.S. 281 on the east.",
        "Homes here include patio homes, townhomes, and larger houses, in gated and ungated neighborhoods. Two homes with the same square footage can carry different HOA fees, rules, and upkeep.",
        "Confirm the school district and campuses for a specific address before you buy.",
      ],
    },
    checks: [
      { title: "HOA fees and rules", body: "Ask what the fees cover, whether there’s more than one association, and what rules apply to parking, exteriors, and leasing." },
      { title: "Roof, HVAC, and foundation", body: "In a neighborhood of similar age, big systems can come due around the same time. Find out what’s been replaced and when." },
      { title: "Updates compared with neighbors", body: "Kitchens, baths, and flooring vary a lot from house to house. We compare condition as well as size when we look at price." },
      { title: "Road noise and drainage", body: "Visit at different times of day, look at what’s planned nearby, and see how water drains from the lot." },
    ],
    faqs: [
      { q: "Is Stone Oak its own city?", a: "No. Stone Oak is a district within San Antonio, north of Loop 1604 between Blanco Road and U.S. 281." },
      { q: "How do HOA fees affect what I can afford?", a: "Your lender counts HOA dues when working out how much you can borrow, so ask for the current fees on each home before you compare prices." },
      { q: "What helps a Stone Oak home sell?", a: "Careful pricing against similar, recent sales, good photos, and repairs that buyers would otherwise ask for. We’ll walk the house with you and point out what’s worth doing." },
    ],
    zips: ["78258", "78260"],
    listingCities: [],
    related: [
      { href: "/luxury", label: "Luxury homes" },
      { href: "/sell", label: "Selling your home" },
    ],
  },
  {
    slug: "alamo-heights",
    name: "Alamo Heights",
    published: false,
    title: "Alamo Heights Homes",
    description:
      "Buy or sell a home in Alamo Heights, Texas with Irma and John Nelson of Get It Sold Realty, with a builder’s eye on older homes, remodels, and condition.",
    headline: "Buy or sell in Alamo Heights.",
    intro: [
      "Older homes have character, and they also have history behind the walls. John’s building and remodeling background is a real help in Alamo Heights, where an addition, a renovation, or a rebuild may be part of the decision.",
    ],
    image: { src: "/images/living-room-stone-fireplace.webp", alt: "Living room with a stone fireplace", width: 768, height: 576 },
    about: {
      headline: "About the area",
      paragraphs: [
        "Alamo Heights is a separate city of about two square miles, almost completely surrounded by San Antonio. It was incorporated in 1922 and sits about five miles north of downtown, along Broadway.",
        "Because it’s its own city, Alamo Heights has its own rules and permits. Terrell Hills and Olmos Park, next to it, are separate cities too, so check which one a home is in.",
        "The city is served by Alamo Heights ISD. Confirm the schools for a specific address with the district.",
      ],
    },
    checks: [
      { title: "Older systems", body: "Ask about the age of the wiring, plumbing, sewer line, foundation, and roof. Specialist inspections are often worth it on an older home." },
      { title: "Permits and past work", body: "Find out whether additions and remodels were permitted. Unpermitted work can come up later, when you sell or renovate." },
      { title: "Plans to remodel or rebuild", body: "Check the city’s rules on lot coverage, setbacks, trees, demolition, and design review before you buy with a project in mind." },
      { title: "Lot and land value", body: "On some streets, the lot is a big share of the price. We look at both the house and the land when we compare sales." },
    ],
    faqs: [
      { q: "Is Alamo Heights part of San Antonio?", a: "No. Alamo Heights is an independent city in Bexar County. San Antonio surrounds most of it." },
      { q: "Should I remodel an older home before selling it?", a: "Sometimes a clean, well-priced home sells better than one with a rushed remodel. We’ll help you compare the cost, the time, and the likely difference in price." },
      { q: "Do I need special inspections on an older home?", a: "A general inspection is the starting point. Depending on the house, it can make sense to add a foundation, sewer line, electrical, or plumbing inspection during the option period." },
    ],
    zips: ["78209"],
    listingCities: ["Alamo Heights"],
    related: [
      { href: "/building-investing", label: "Building and remodeling" },
      { href: "/senior-transitions", label: "Downsizing and inherited homes" },
    ],
  },
  {
    slug: "schertz",
    name: "Schertz",
    published: false,
    title: "Schertz Homes near JBSA-Randolph",
    description:
      "Buy or sell a home in Schertz, Texas, near Joint Base San Antonio-Randolph, with veteran-owned Get It Sold Realty. PCS timelines, VA loans, and local help.",
    headline: "Buy or sell in Schertz.",
    intro: [
      "Schertz is next door to Randolph, on the northeast side of the San Antonio area. Irma and John run a veteran-owned team, so report dates, VA loans, and selling on orders are familiar ground.",
    ],
    image: { src: "/images/portfolio/08.webp", alt: "Home in Schertz sold by Irma and John Nelson", width: 1152, height: 864 },
    caption: "Sold in Schertz",
    about: {
      headline: "About the area",
      paragraphs: [
        "Schertz spans parts of Guadalupe, Bexar, and Comal counties, between San Antonio and New Braunfels. It’s the largest city in the Randolph Metrocom, the group of cities around Randolph Air Force Base that also includes Cibolo, Universal City, Selma, and Converse.",
        "The city has grown quickly since the late 1990s, so you’ll find established neighborhoods as well as newer subdivisions.",
        "Because Schertz crosses county lines, taxes and school districts can differ from one address to another. Confirm both for any home you’re considering.",
      ],
    },
    checks: [
      { title: "County and tax rate", body: "Check which county, school district, and other taxing districts apply. The total rate can differ between two homes with a Schertz address." },
      { title: "Aircraft noise", body: "Randolph is an active base. Visit at different times of day, and ask about flight paths and any noise zones near the home." },
      { title: "New build or resale", body: "A builder’s sales agent works for the builder. Compare incentives, upgrades, and lot premiums with resale homes nearby, and get an inspection either way." },
      { title: "Flood maps", body: "Cibolo Creek runs through the area. Check the flood map and get an insurance quote before your option period ends." },
    ],
    faqs: [
      { q: "Can I buy in Schertz before I arrive?", a: "Yes. We can set up video walkthroughs and plan the search around your report date. Ask your lender about signing options if you won’t be here for closing." },
      { q: "Can I use a VA loan on a new home?", a: "Often, if you’re eligible and the builder and property meet the requirements. Talk with a VA-approved lender early so you know your numbers before you sign a builder contract." },
      { q: "What if I get orders and need to sell?", a: "Call as soon as you know your dates. We’ll work back from your move to plan pricing, preparation, and showings, and talk through renting it out if that suits you better." },
    ],
    zips: ["78154", "78108"],
    listingCities: ["Schertz"],
    related: [
      { href: "/veterans", label: "Veterans and military families" },
      { href: "/blog/buying-on-pcs-orders", label: "Buying a home on PCS orders" },
    ],
  },
];

export const publishedAreas = areas.filter((a) => a.published);
export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
