# Website plan: decisions and gaps

Last updated November 25, 2026. This file records what has been decided for the Get It Sold Realty site, what the brand rebuild proposal (November 2026) asks for, and what is still missing.

## Decisions (locked in)

### Colors
- **Texas blue `#002868`** and **logo red `#C80000`** (the red of "SOLD" in the logo, a pure red; it replaced Texas flag red `#BF0A30`), on white, with a cool off-white `#F5F6F9` for alternating sections.
- A brighter red, **`#FF5C5C`**, is used for accents on blue backgrounds, where the main red is too dark to read.
- Blue buttons fill red on hover. Tokens live in `src/app/globals.css` (`blue`, `red`, `red-light`).
- This replaces the proposal's "navy, warm white, red SOLD, gold accents". Gold is no longer used.

### Everything lives on this site
- Home search, listings, and the portfolio all live on this site. Nothing sends visitors to another site to search.
- The footer's link to realestateintx.com was removed in November 2026: that site is branded "The Nelson Team – Real Broker, LLC", and John has left Real Broker.

### Focus and specialty pages (from John, November 2026)
- Focus on homes, land, and luxury. Rentals stay part of the business but are low priority: the Rent page stays, linked from the footer and services list, not the main menu.
- Niche pages, each with material focused on its audience, under a **Who we help** dropdown in the main menu: Seniors & downsizing (`/senior-transitions`), Veterans & military (`/veterans`), Land & acreage (`/land`), Luxury homes (`/luxury`), Building & investing (`/building-investing`). The list lives in `specialties` in `src/content/services.ts`.
- Blog at `/blog` (Markdown files in `content/blog/`), with posts by topic shown on each specialty page and optional YouTube embeds per post. Four starter posts need John and Irma's review.

### Listings: three separate areas
| Page | What's on it | Data source |
|---|---|---|
| **Our listings** (built) | Homes Irma and John are selling now | Their own listings. Today these are in `site.listings`; later, the IDX feed filtered to John's office. |
| **Portfolio** (built) | Homes they've sold, with photo albums | Their own past sales and listing photos (`src/content/portfolio.ts`) |
| **Search homes** (built, waiting on MLS data) | Every home for sale in the area, from any agent | LERA MLS IDX feed |

### Priority: Google search (decided November 25, 2026)
SEO is the top priority. The free connectMLS frame is **ruled out**: its listings live on connectMLS's address, so they add nothing for Google to index here.

MLS route, in order:
1. **LERA's own data feed** into our search pages. Every listing is a server-rendered page on this domain, and the LERA rules (18.2.2) don't require blocking search engines from indexing IDX listings.
2. **Repliers** (listings API) if LERA's feed isn't practical. Same result, at a higher price.

Ruled out for SEO: **Buying Buddy**. Its SEO page says server pre-rendering covers WordPress and PHP sites only, and this site is Next.js.

SEO work on the site:
- ✅ Real canonical address, sitemap, robots file, share images (November 25, 2026)
- ❌ Custom domain (a vercel.app address is a weak base), then Google Search Console
- ✅ Business structured data on every page (no star ratings: Google doesn't accept a business marking up its own reviews)
- ✅ San Antonio or Hill Country in every main page title
- ✅ Area pages published November 26, 2026 at `/areas`: Canyon Lake, Boerne, Helotes, Stone Oak, Alamo Heights, Schertz. Linked from the footer and the About page's service areas. John is still reviewing the local details
- ✅ Buy and Sell pages expanded with guidance and common questions (about 700 and 660 words). Rent left short (low priority)
- 🟡 Vercel Web Analytics code added; turn it on in the Vercel project's Analytics tab
- ⏸ Regular blog posts, reviewed by John and Irma
- ⏸ Google Business Profile (John's account)
- ❌ When the MLS feed is live: city pages with live listings, and listings in the sitemap

### MLS data: LERA MLS via IDX
- John's MLS is **LERA MLS** (✅ confirmed November 2026 that he is an active member), the former San Antonio Board of Realtors MLS (renamed August 2025, leramls.com).
- **LERA supplies the IDX feed.** Options and fees, checked against leramls.com/idx-feeds-and-technical-services (November 2026):
  - **connectMLS framable search:** set up in MLS under Set-up, at **no additional charge**. Ruled out for SEO (see above).
  - **Broker IDX data feed** (RETS or Web API) for our own search: John signs LERA's IDX Data Feed Agreement, naming the website's domain and URLs. The agreement itself lists **no dollar amount**; MLS Rules Section 18.4 says IDX fees are set annually by LERA. The only published figure is **$200 per quarter plus tax**, in the Participant Data Access Agreement fee exhibit bundled with LERA's VOW agreement. **Ask LERA for the current IDX feed fee** (idx@leramls.com, 210-593-1206).
  - **Through an IDX vendor:** the vendor signs LERA's Third Party Processing Agreement and pays LERA's data fees. Showcase IDX and Zenlist list the broker's share of LERA's fee as $10 per month, on top of the vendor's own subscription.
  - **Vendors checked (November 2026), prices from vendor sites, to confirm:**
    - **Buying Buddy:** covers LERA; $49/month for one user, $77/month for two; includes its own CRM. Ruled out: its Google-indexable pages are for WordPress and PHP sites only.
    - **Repliers:** listings API covering SABOR/LERA, from $199/month; keeps our own search pages and design. Fallback if LERA's direct feed isn't practical.
    - **IDX Broker:** works on any site, from $60/month; LERA coverage not confirmed.
    - **OSI IDX:** approved LERA vendor, $25/month, but it is bundled with their own website, so it doesn't fit.
    - **Showcase IDX:** sold as a plugin, mainly for WordPress; whether it works on this site was not checked.
- The data agreement ties the listings to **one named website domain**. The site's final domain must be decided before it is signed.
- **Chosen approach: our own search pages** on LERA's web feed (RESO format), so listings match the site's design and each gets its own page on this domain.

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
- **John supplies all legal details:** brokerage name (now Get It Sold Realty; he left Real Broker in November 2026) and disclosures, licenses, the filled-in TREC "Information About Brokerage Services" form, and the LERA agreements.
- Homes are labeled by **city and ZIP only**, never street address. Raw Zillow data with addresses stays in the git-ignored `.portfolio-cache/`.
- Client review text is not copied from Zillow. The site shows ratings and review details, and links to Zillow.

## Proposal vs. the current site

✅ done · 🟡 partly done · ❌ missing · ⏸ waiting on John

### Brand
| Proposal | Site now | Status |
|---|---|---|
| Name "Get It SOLD Realty" with bold red SOLD | Real logo in the header and footer (`public/images/logo.png`) | ✅ |
| Team identity "The Nelson Team" | Homepage, About, footer | ✅ |
| Brand line "A Legacy of Service" | Homepage eyebrow, About sign-off | ✅ |
| Promise "Real Experience. Personal Guidance. Results That Matter." | Not used | ❌ |
| Professional photos of John and Irma, real properties | One portrait (800px); real listing and sold photos | 🟡 need more and larger photos |
| Simple mobile navigation, fast, accessible | Yes | ✅ |
| Prominent valuation and consultation actions | Hero and service pages: "What's my home worth?" and "Schedule a consultation" (consultation goes to the contact form; no booking calendar yet) | 🟡 |

### Service pillars
| Pillar | Site now | Status |
|---|---|---|
| 1. Buy & Sell With Confidence | Buy and Sell pages | ✅ |
| 2. Senior Living & Life Transitions | Homepage section and `/senior-transitions` | ✅ |
| 3. Building, Remodeling & Property Potential | `/building-investing`; Reino Builders not named yet | 🟡 ⏸ affiliate disclosure |
| 4. Real Estate Investing | `/building-investing#investing` | ✅ |
| 5. Community, Service & Relationships (veteran-owned) | Veteran-owned and Marine service on the homepage and About ("Rooted in service") | ✅ |

### Homepage
| Proposal | Site now | Status |
|---|---|---|
| Hero "Your Home. Your Future. Our Commitment." | Done; the "#1" claim is gone | ✅ |
| Actions "What's My Home Worth?" and "Schedule a Consultation" | Done, below the hero search box | ✅ |
| Service choices | "How can we help you move?" | ✅ |
| Meet John and Irma | Yes | ✅ |
| Featured listings and property search | Our listings section, `/listings`, and `/homes` search; full MLS results wait on the LERA feed | 🟡 ⏸ |
| Why construction and investor experience matter | "Experience beyond the real estate contract" section | ✅ |
| Senior transitions | Homepage section | ✅ |
| Verified client reviews | Zillow rating, breakdown, and recent reviews with links | ✅ |
| Helpful videos | Nothing | ⏸ need a YouTube channel |
| Local resources | Nothing | ❌ |
| Contact form | Yes | ✅ |

### About page
| Proposal section | Site now | Status |
|---|---|---|
| "Real Estate Is About More Than Property. It's About People." | Intro and homepage Meet section | ✅ |
| Experience Beyond the Contract (broker/owner, USMC veteran, investor, builder, Reino Builders) | Done, including broker/owner; Reino Builders not named yet | 🟡 ⏸ Reino disclosure |
| A Personal Touch (Irma) | Done, no title | 🟡 ⏸ Irma's title |
| Helping Families Navigate Life's Transitions | Done | ✅ |
| Rooted in Service (Marine service, outreach, recovery ministry) | Done | ✅ |
| Let's Talk About Your Next Chapter (sign-off) | Done | ✅ |

### Navigation
| Proposal | Site now | Status |
|---|---|---|
| Home, About The Nelson Team, Sell Your Home, Contact | Home, About, Sell, Contact us | ✅ |
| Buy a Home / Property Search | Buy page and `/homes` search | 🟡 ⏸ LERA feed |
| Our listings (our decision) | `/listings` | ✅ |
| Portfolio (our decision) | Yes | ✅ |
| Senior Transitions | `/senior-transitions` | ✅ |
| Building & Investing | `/building-investing` | ✅ |
| Client Reviews | Section on Home and About; no page of its own | 🟡 |
| Videos & Resources | No page | ⏸ |
| Rent (on our site, not in the proposal) | Rent page, footer only (John: rentals are low priority) | ✅ |

### SEO, content, and leads
| Proposal | Site now | Status |
|---|---|---|
| Helpful local pages (no keyword stuffing) | Six area pages at `/areas`, live | ✅ (John reviewing details) |
| Articles: downsizing a parent's home, as-is vs. remodel, home condition, investing basics | `/blog`: downsizing a parent's home, as-is vs. remodel, buying land, buying on PCS orders (drafts for review) | 🟡 ⏸ review |
| YouTube videos linked to service pages | Posts can embed a video (`youtube:` in the post header) | ⏸ need video links |
| IDX search | Built on the RESO format; connect with `LERA_RESO_URL`, `LERA_RESO_TOKEN`, `LERA_OFFICE_MLS_ID` | ⏸ LERA access |
| Home valuation inquiry | Sell form | ✅ |
| Consultation scheduling | None (contact form only) | ❌ |
| CRM-connected contact workflow | Email only | ❌ ⏸ which CRM (Lofty?) |
| Verified testimonials with links to source | Zillow, linked | ✅ |
| Tracking (inquiries, bookings, search visibility) | Visitor analytics code added, not turned on; inquiries and bookings not tracked; no Search Console yet | 🟡 |

### To confirm before publishing (from John)
| Item | Status |
|---|---|
| Brokerage: John has left Real Broker. The site now shows Get It Sold Realty as the brokerage and John as Broker/Owner (license 600636). Confirm the title, and whether the firm has its own TREC license number (`brokerage.firmLicense`). | 🟡 confirm firm license |
| Broker disclosure wording; filled-in TREC brokerage services form | ⏸ |
| Irma's title and license | ⏸ |
| Stats: 290+ homes, $100M+, 19 years | ⏸ |
| Any senior-specialist designation before claiming one | ⏸ |
| Logo and brand assets | ✅ Logo received (PNG on white). A transparent or SVG version would look sharper on blue. |
| Current professional photos | ⏸ |
| Service-area list (11 areas on the site) | ⏸ |
| Reino Builders affiliation disclosure | ⏸ |
| LERA MLS membership | ✅ Confirmed active member |
| Office MLS ID and agent MLS IDs (John, Irma) | ⏸ |
| Final website domain (needed for the LERA agreement) | ⏸ |
| LERA data agreement: John signs as Get It Sold Realty's broker for the direct feed, once LERA confirms the fee | ⏸ |
| OK to keep using his listing photos on the Portfolio page | ⏸ |
| Whether rentals stay | ✅ Keep, low priority |
| YouTube channel: John makes process videos; get the channel link | ⏸ |

## Can be built now, without John
Done on November 22, 2026:
1. ✅ About page rewritten from the proposal copy (brokerage title and Irma's title left out until John confirms).
2. ✅ New homepage hero and actions; "#1" claim removed.
3. ✅ Five service pillars on the homepage; `/senior-transitions` and `/building-investing` pages.
4. ✅ `/listings` (Our listings).
5. ✅ `/homes` search and `/homes/<key>` listing pages on a RESO data layer (`src/lib/listings.ts`), ready for LERA's feed, with LERA's notices built in.
6. ✅ Veteran-owned and "A Legacy of Service" messaging.

Still to do:
7. Local resource and article pages, once topics are approved.
8. A Client Reviews page, a booking calendar for consultations, analytics, and a CRM connection.
