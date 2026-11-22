# Website plan: decisions and gaps

Last updated November 22, 2026. This file records what has been decided for the Get It Sold Realty site, what the brand rebuild proposal (November 2026) asks for, and what is still missing.

## Decisions (locked in)

### Colors
- Texas flag colors: **Texas blue `#002868`** and **Texas red `#BF0A30`**, on white, with a cool off-white `#F5F6F9` for alternating sections.
- A brighter red, **`#FF5C70`**, is used for accents on blue backgrounds, where Texas red is too dark to read.
- Blue buttons fill red on hover. Tokens live in `src/app/globals.css` (`blue`, `red`, `red-light`).
- This replaces the proposal's "navy, warm white, red SOLD, gold accents". Gold is no longer used.

### Everything lives on this site
- Home search, listings, and the portfolio all live on this site. Nothing sends visitors to another site to search.
- The footer's "Search all MLS listings" link to realestateintx.com stays only until the site's own search is live, then it is removed.

### Listings: three separate areas
| Page | What's on it | Data source |
|---|---|---|
| **Our listings** (to build) | Homes Irma and John are selling now | Their own listings. Today these are in `site.listings`; later, the IDX feed filtered to John's office. |
| **Portfolio** (built) | Homes they've sold, with photo albums | Their own past sales and listing photos (`src/content/portfolio.ts`) |
| **Search homes** (to build) | Every home for sale in the area, from any agent | LERA MLS IDX feed |

### MLS data: LERA MLS via IDX
- John's MLS is **LERA MLS**, the former San Antonio Board of Realtors MLS (renamed August 2025, leramls.com).
- **LERA supplies the IDX feed.** A broker must sign LERA's Participant Data Access Agreement, which lists a fee of $200 per quarter (confirm with LERA). If a developer receives the feed directly, the developer signs LERA's Third Party Processing Agreement.
- The data agreement ties the listings to **one named website domain**. The site's final domain must be decided before it is signed.
- Recommended approach: **our own search pages** built on LERA's web feed (RESO format), so listings match the site's design and get their own pages. The alternative is an IDX vendor's embedded search (Showcase IDX, Buying Buddy, iHomefinder, OSI IDX). **Final choice still to confirm.**

### LERA IDX display rules the site must follow
From the MLS Rules (Section 18, September 2024 version) and LERA's data agreement (October 2025). Ask LERA for the current rules when access is requested.
- Show only fields LERA allows. Never show confidential fields (showing instructions, security details, listing agreement type).
- Active listings only. No expired or withdrawn listings. Hide any listing, or its address, if the seller opted out of internet display.
- Choose which listings to show only by objective criteria (area, price, property type).
- Every listing shows the **listing brokerage and listing agent**, plus the listing broker's phone or email, no smaller than the listing text.
- Search pages show **our brokerage's name** clearly.
- Show **LERA as the source** and its disclaimer: for consumers' personal, non-commercial use; deemed reliable but not guaranteed.
- Every page with LERA data shows **"Copyright LERA MLS LLC"** and a notice like "Based on information from LERA MLS LLC…".
- Refresh the data at least every **12 hours**.
- Don't modify other agents' listings. Any added information must be clearly separated and its source labeled.
- Don't share, export, or bulk-copy the data.
- Turn off reviews or automated value estimates next to a listing if its seller asks.
- Provide a phone or email for reporting errors in information we add, and fix false information.
- No misleading co-branding on listing pages.
- Tell LERA the site displays IDX listings and give LERA access to check it.

### Legal and disclosures
- **John supplies all legal details:** brokerage name and disclosures, licenses, the filled-in TREC "Information About Brokerage Services" form, and the LERA agreements.
- Homes are labeled by **city and ZIP only**, never street address. Raw Zillow data with addresses stays in the git-ignored `.portfolio-cache/`.
- Client review text is not copied from Zillow. The site shows ratings and review details, and links to Zillow.

## Proposal vs. the current site

✅ done · 🟡 partly done · ❌ missing · ⏸ waiting on John

### Brand
| Proposal | Site now | Status |
|---|---|---|
| Name "Get It SOLD Realty" with bold red SOLD | "Get It Sold Realty"; placeholder "GIS" logo | ⏸ need the real logo file |
| Team identity "The Nelson Team" | Footer only | ❌ |
| Brand line "A Legacy of Service" | Not used | ❌ |
| Promise "Real Experience. Personal Guidance. Results That Matter." | Not used | ❌ |
| Professional photos of John and Irma, real properties | One portrait (800px); real listing and sold photos | 🟡 need more and larger photos |
| Simple mobile navigation, fast, accessible | Yes | ✅ |
| Prominent valuation and consultation actions | Valuation form on Sell page; no "What's My Home Worth?" or "Schedule a Consultation" in the hero or header | 🟡 |

### Service pillars
| Pillar | Site now | Status |
|---|---|---|
| 1. Buy & Sell With Confidence | Buy and Sell pages | ✅ |
| 2. Senior Living & Life Transitions | Nothing | ❌ |
| 3. Building, Remodeling & Property Potential | Nothing; Reino Builders not mentioned | ❌ ⏸ affiliate disclosure |
| 4. Real Estate Investing | Nothing | ❌ |
| 5. Community, Service & Relationships (veteran-owned) | Section for military families, but it doesn't say John is a Marine veteran or that the business is veteran-owned | 🟡 |

### Homepage
| Proposal | Site now | Status |
|---|---|---|
| Hero "Your Home. Your Future. Our Commitment." | "San Antonio's #1 Real Estate Couple". The "#1" claim is unverifiable and should be replaced. | ❌ |
| Actions "What's My Home Worth?" and "Schedule a Consultation" | "I'm buying / selling / renting" and a search box | ❌ |
| Service choices | "How can we help you move?" | ✅ |
| Meet John and Irma | Yes | ✅ |
| Featured listings and property search | 3 current listings; search waits on IDX | 🟡 ⏸ |
| Why construction and investor experience matter | Nothing | ❌ |
| Senior transitions | Nothing | ❌ |
| Verified client reviews | Zillow rating, breakdown, and recent reviews with links | ✅ |
| Helpful videos | Nothing | ⏸ need a YouTube channel |
| Local resources | Nothing | ❌ |
| Contact form | Yes | ✅ |

### About page
| Proposal section | Site now | Status |
|---|---|---|
| "Real Estate Is About More Than Property. It's About People." | Different intro | ❌ |
| Experience Beyond the Contract (broker/owner, USMC veteran, investor, builder, Reino Builders) | Not covered | ❌ ⏸ brokerage wording |
| A Personal Touch (Irma) | Not covered | ❌ ⏸ Irma's title |
| Helping Families Navigate Life's Transitions | Not covered | ❌ |
| Rooted in Service (Marine service, outreach, recovery ministry) | Not covered | ❌ |
| Let's Talk About Your Next Chapter (sign-off) | Generic call to action | 🟡 |

### Navigation
| Proposal | Site now | Status |
|---|---|---|
| Home, About The Nelson Team, Sell Your Home, Contact | Home, About, Sell, Contact us | ✅ |
| Buy a Home / Property Search | Buy page; no search | 🟡 ⏸ IDX |
| Our listings (our decision) | Homepage section only | ❌ |
| Portfolio (our decision) | Yes | ✅ |
| Senior Transitions | No page | ❌ |
| Building & Investing | No page | ❌ |
| Client Reviews | Section on Home and About; no page of its own | 🟡 |
| Videos & Resources | No page | ⏸ |
| Rent (on our site, not in the proposal) | Rent page | ⏸ confirm they still want rentals |

### SEO, content, and leads
| Proposal | Site now | Status |
|---|---|---|
| Helpful local pages (no keyword stuffing) | None | ❌ |
| Articles: downsizing a parent's home, as-is vs. remodel, home condition, investing basics | None | ❌ |
| YouTube videos linked to service pages | None | ⏸ |
| IDX search | Planned (LERA) | ⏸ |
| Home valuation inquiry | Sell form | ✅ |
| Consultation scheduling | None (contact form only) | ❌ |
| CRM-connected contact workflow | Email only | ❌ ⏸ which CRM (Lofty?) |
| Verified testimonials with links to source | Zillow, linked | ✅ |
| Tracking (inquiries, bookings, search visibility) | No analytics | ❌ |

### To confirm before publishing (from John)
| Item | Status |
|---|---|
| Brokerage: Get It Sold Realty or Real Broker, LLC? The footer says Real Broker / Broker Associate, but About says John is the broker and owner. | ⏸ conflict to resolve |
| Broker disclosure wording; filled-in TREC brokerage services form | ⏸ |
| Irma's title and license | ⏸ |
| Stats: 290+ homes, $100M+, 19 years | ⏸ |
| Any senior-specialist designation before claiming one | ⏸ |
| Logo and brand assets | ⏸ |
| Current professional photos | ⏸ |
| Service-area list (11 areas on the site) | ⏸ |
| Reino Builders affiliation disclosure | ⏸ |
| Final website domain (needed for the LERA agreement) | ⏸ |
| Which broker signs the LERA data agreement; IDX vendor or direct feed | ⏸ |
| OK to keep using his listing photos on the Portfolio page | ⏸ |
| Whether rentals stay | ⏸ |
| YouTube channel, if any | ⏸ |

## Can be built now, without John
1. Rewrite the About page from the proposal copy, leaving the brokerage and Irma's title wording until John confirms them.
2. New homepage hero and actions ("What's My Home Worth?", "Schedule a Consultation"), replacing the "#1" claim.
3. Service pillars on the homepage, with pages for Senior Transitions and Building & Investing.
4. An "Our listings" page.
5. The "Search homes" pages and listing pages, built against the RESO data format and ready for LERA's feed.
6. Veteran-owned and "A Legacy of Service" messaging.
7. Local resource and article pages, once topics are approved.
