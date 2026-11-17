# Get It Sold Realty website

Next.js 15 (App Router), TypeScript, and Tailwind CSS v4. Pages: `/`, `/buy`, `/sell`, `/rent`, `/about`.

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

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
| High-resolution portrait of Irma and John (1200px+ wide) | The current `irma-john-nelson.jpg` is 240×240, so it's shown small in a portrait panel and a home photo fills the hero. With a larger file, point `images.hero` at it to put the couple in the homepage hero |
| Zillow testimonials (optional) | `zillow.testimonials`. Use only exact quotes the client supplies |
| Logo file (optional) | `logo`. A text wordmark is used until then |

Images in use: `images.hero` (homepage), `images.teamPortrait` (home + About), and `images.buy` / `sell` / `rent`. The other photos in `public/images` are available to swap in.

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

## Sales map

The homepage map (`src/components/SalesMap.tsx`) reads its pins from `src/content/sales.ts`: 12 recent sales and the 3 current listings from the Zillow profile, with coordinates rounded to about 1 km so past clients' homes aren't pinpointed. Zillow's own map can't be embedded, so add new sales to that file (keep the rounding). For the full sales history, export it from the MLS and add the rows the same way.

Map tiles come from OpenStreetMap's free tile server, which is fine for a small site. If traffic grows, switch the URL in `SalesMapClient.tsx` to a hosted provider (MapTiler, Stadia Maps, or CARTO with an API key).

## Inquiry email setup

The form posts to `/api/inquiry`, which validates on the server and sends one email per inquiry over SMTP:

- **Subject:** `New Buy|Sell|Rent inquiry from <name>`
- **Body:** every submitted field (plain text and HTML)
- **Reply-To:** the visitor's email, so hitting Reply answers them directly

Environment variables (server-side only; never commit `.env.local`):

| Variable | Required | Notes |
| --- | --- | --- |
| `SMTP_HOST` | yes | e.g. `smtp.gmail.com` |
| `SMTP_PORT` | no | default `465` |
| `SMTP_SECURE` | no | default `true` on port 465 |
| `SMTP_USER` | yes | SMTP login |
| `SMTP_PASS` | yes | SMTP password or app password |
| `INQUIRY_TO_EMAIL` | no | delivery address; default `getitsoldsa@gmail.com` |
| `INQUIRY_FROM_EMAIL` | no | From address; default `SMTP_USER` |
| `NEXT_PUBLIC_SITE_URL` | recommended | the live URL, used for canonical links |
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
