# Get It Sold Realty website

Next.js 15 (App Router), TypeScript, and Tailwind CSS v4. Pages: `/`, `/buy`, `/sell`, `/rent`, `/portfolio`, `/about`.

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Plan and decisions

The locked-in direction (colors, listings, LERA MLS rules) and what is still missing from the brand rebuild proposal are in [`docs/WEBSITE-PLAN.md`](docs/WEBSITE-PLAN.md).

## Editing content

Almost everything you'd want to change lives in **`src/content/site.ts`**:

- Hero heading and intro, the three stats (290+, $100M+, 19)
- Zillow rating, review count, profile URL, and optional testimonials
- Current listings (`listings`, shown on the homepage; update as homes sell, or empty the list to hide the section)
- Service areas and languages (About page and footer)
- Phone, email, and address
- Image slots (team portrait, team photo, Buy/Sell/Rent property photos, optional logo)

Form options (budget ranges, timelines, property types) are in `src/lib/inquiry.ts`.

## Assets still needed

| Item | Where it goes |
| --- | --- |
| Larger portrait of Irma and John (1200px+ wide) | `irma-john-portrait.jpg` (set as `images.team`) is 800px wide, so it can look slightly soft on large high-resolution screens |
| Zillow testimonials (optional) | `zillow.testimonials`. Use only exact quotes the client supplies |
| Logo with a transparent background, or SVG (optional) | `logo` uses `public/images/logo.png`, cropped from the supplied PNG. It has a white background, so the footer shows it on a white plate; a transparent version would sit directly on the blue |

Images in use: `images.team` (the portrait of Irma and John, on Home and About), `images.contact` (behind the contact form), and `images.buy` / `sell` / `rent`. The other photos in `public/images` are available to swap in.

Example image entry (use the photo's real pixel size; Next.js resizes and serves optimized versions):

```ts
hero: {
  src: "/images/irma-john-portrait-large.jpg",
  alt: "Irma and John Nelson standing outside a San Antonio home",
  width: 1600,
  height: 2000,
},
```

Until a photo is set, a neutral line-drawing placeholder holds its place.

## Listings and home search

- `/listings` shows the team's own current listings, `/homes` searches homes for sale, and `/homes/<key>` shows one home.
- All three read from `src/lib/listings.ts`, which uses RESO field names (the standard behind LERA MLS's Web API).
- **Before the feed is connected:** the pages show the team's own listings from `site.listings` in `src/content/site.ts`.
- **To connect LERA:** after John's broker signs LERA's data agreement, set `LERA_RESO_URL`, `LERA_RESO_TOKEN`, and `LERA_OFFICE_MLS_ID` (see `.env.example`). The feed is re-read hourly, inside LERA's 12-hour limit. Expired and withdrawn listings, and listings whose sellers opted out of internet display, are left out. Pages showing LERA data carry LERA's required source, disclaimer, and copyright notices (`src/components/ListingNotice.tsx`). The full rules are in `docs/WEBSITE-PLAN.md`.
- The feed's exact base URL and field support should be checked against LERA's documentation when access is granted.

## Blog

Posts are Markdown files in `content/blog/`. To add one, copy an existing file, rename it (the file name becomes the web address, e.g. `content/blog/my-post.md` → `/blog/my-post`), and edit the header:

```
---
title: Post title
description: One or two sentences for search results and the post list
date: 2026-11-22
cover: /images/ranch-home-front-porch.webp
coverAlt: Single-story ranch home with a front porch
category: seniors
youtube: VIDEO_ID
---
```

- `category` is one of `seniors`, `veterans`, `land`, `luxury`, `building-investing`, `buying`, `selling` (see `src/lib/blog.ts`). Each specialty page shows its latest posts under "From our blog".
- `cover` is optional: a photo from `public/images/` (e.g. `/images/ranch-home-front-porch.webp`), with `coverAlt` describing it. It shows on the post card, at the top of the post, and in link previews.
- `youtube` is optional: the video ID from a YouTube link (the part after `v=`). It embeds above the post using YouTube's privacy-enhanced player.
- Add `draft: true` to hide a post.
- The body supports `##` and `###` headings, paragraphs, `-` and `1.` lists, `>` quotes, `**bold**`, `*italic*`, and `[links](/path)`.
- The four starter posts were drafted for John and Irma to review before launch.

## Sales map

The homepage map (`src/components/SalesMap.tsx`) reads its pins from `src/content/sales.ts`: the 82 sales with locations on the Zillow profile map (its most recent 100) and the 3 current listings, with coordinates rounded to about 1 km so past clients' homes aren't pinpointed. Zillow's own map can't be embedded, so add new sales to that file (keep the rounding). For the full sales history, export it from the MLS and add the rows the same way.

Map tiles come from OpenStreetMap's free tile server, which is fine for a small site. If traffic grows, switch the URL in `SalesMapClient.tsx` to a hosted provider (MapTiler, Stadia Maps, or CARTO with an API key).

## Portfolio

`/portfolio` shows 68 sold homes from the team's Zillow map, with filter buttons by area. 53 homes have a full photo album (5 in `soldAlbums.ts`, the rest in `public/images/portfolio/<zillow-id>/`); the others show one cover photo (`public/images/portfolio/NN.webp`). Homes with albums are listed first. Every card opens the shared photo viewer (`src/components/AlbumViewer.tsx`); visitors can arrow through the whole portfolio, and homes with an album offer “View all N photos”.

Albums were only kept where Zillow's sale date matches the team's own sale. If a home was resold later, Zillow shows the newer listing's photos, so those homes keep just their cover. Data lives in `src/content/portfolio.ts`; homes are labeled by city and ZIP, not street address.

Collection progress (60 of 82 sold homes visited; the rest are listed in `remaining.txt`) is saved in `.portfolio-cache/`, which is git-ignored because it contains street addresses.

## Recently sold albums

The homepage hero turns like a carousel through the cover photo of each sold album (`src/components/HeroCarousel.tsx`): every 4.5 seconds the main photo shrinks into a pill and slides left while the next pill grows into its place. It pauses on hover or focus and with its pause button, and stays still for visitors who prefer reduced motion. Clicking the main photo opens that home's album.

The homepage “Recently sold” section (`src/components/SoldGallery.tsx`) shows the photo albums of the five sold homes on the Zillow profile (104 photos, 1152px WebP, in `public/images/sold/<slug>/`). Clicking a home opens a full-screen viewer with arrow-key, swipe, and thumbnail navigation. Homes are labeled by city and ZIP code, not street address. To add a home, put its photos in a new folder as `01.webp`, `02.webp`, … and add an entry to `src/content/soldAlbums.ts`.

## Inquiry email setup

The form posts to `/api/inquiry`, which validates on the server and sends one email per inquiry over SMTP:

- **Subject:** e.g. `New home valuation request from <name>`
- **Body:** a branded HTML email (`src/lib/inquiryEmail.ts`) with Reply, Call, and Text buttons, every answer, and the visitor's message, plus a plain-text version. Preview: `docs/previews/inquiry-email.png`
- **Reply-To:** the visitor's email, so hitting Reply answers them directly

Environment variables (server-side only; never commit `.env.local`):

| Variable | Required | Notes |
| --- | --- | --- |
| `SMTP_HOST` | yes | e.g. `smtp.gmail.com` |
| `SMTP_PORT` | no | default `465` |
| `SMTP_SECURE` | no | default `true` on port 465 |
| `SMTP_USER` | yes | SMTP login |
| `SMTP_PASS` | yes | SMTP password or app password |
| `INQUIRY_TO_EMAIL` | no | delivery address, or several separated by commas; default `getitsoldsa@gmail.com`. Keep personal addresses here, not in the code: the repository is public |
| `INQUIRY_FROM_EMAIL` | no | From address; default `SMTP_USER` |
| `NEXT_PUBLIC_SITE_URL` | once the custom domain is live | the live URL, used for canonical links, the sitemap, and share previews. Defaults to https://johnnelson.vercel.app |
| `EMAIL_TRANSPORT=log` | dev only | prints emails to the terminal instead of sending. Ignored in production |

**Using the Gmail account (getitsoldsa@gmail.com):**

1. Turn on 2-Step Verification for the Google account.
2. Go to Google Account → Security → App passwords and create one (name it “Website”).
3. Set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=getitsoldsa@gmail.com`, `SMTP_PASS=<the 16-character app password>`.

Any SMTP provider works the same way (Google Workspace, Microsoft 365, Postmark, SendGrid, Amazon SES, Resend SMTP). Add the variables in your host's dashboard (for example Vercel → Project → Settings → Environment Variables) and redeploy.

If SMTP isn't configured or the provider rejects the message, visitors see an error, keep everything they typed, and can retry. Details are logged on the server.

### Spam protection

- Hidden honeypot field, plus a minimum time on the form before submitting. Suspected bots get a quiet “success” and no email is sent.
- Per-IP rate limit (5 inquiries per 10 minutes). This is in memory and per server instance. For stricter limits on serverless hosting, swap in a shared store or add Cloudflare Turnstile.
- Server-side validation of every field, including allowed option values, plus a request size limit.

## Structure

```
src/
  app/                 pages, layout, /api/inquiry route
  components/          Header, Footer, InquiryForm, InquirySection, ServicePage, StatsStrip, Photo, ui
  content/site.ts      editable content
  lib/inquiry.ts       form fields and validation shared by client and server
  lib/email.ts         SMTP sending
```

## Area pages

Pages at `/areas/<slug>` live in `src/content/areas.ts`. New ones start with `published: false`, which keeps them out of Google, the sitemap, the footer, and the About page while still viewable at their address. Set `published: true` once they're approved. Keep them to facts about places and property: never describe who lives in an area or who it suits, and don't rate schools or safety (fair housing).
