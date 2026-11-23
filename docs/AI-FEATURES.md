# AI features: Get It Sold Realty website

A plain-language overview of the AI we plan to build into the site and the private lead dashboard. Everything is custom-built for The Nelson Team, so each feature can be shaped around how Irma and John work.

**Status:** planned. Nothing here is live yet.

The AI is Claude, made by Anthropic. It runs through the client's own Anthropic account, and the client owns all the lead data.

---

## Phase 1: Instant lead response

This runs every time someone sends a form on the site (Buy, Sell, Rent, a listing question, or a consultation request).

### 1. Instant personal reply to the visitor
- Within about a minute, the visitor gets a friendly email that responds to what they actually wrote, not a generic "thanks for contacting us".
- It confirms what they asked for, explains what happens next, and links to helpful pages on the site, such as the selling walkthrough, home search or a related blog post.
- It is signed by The Nelson Team, says that Irma or John will follow up personally, and states that it was written with AI assistance.
- It never quotes prices or home values, never promises availability, and never gives legal, tax or lending advice.

### 2. Lead summary for Irma and John
They get an email for each new inquiry with:
- **Who:** name, phone, email, and how they prefer to be contacted.
- **What they want:** buying, selling or renting, and the area, budget, timeline and type of home.
- **Priority:** hot, warm or cold, with a one-line reason. For example: "Hot: wants to list in the next 30 days."
- **Life situation, if they mention it:** downsizing, a military move (PCS), relocating, an estate sale, first-time buyer.
- **Suggested next step,** such as "Call today; offer a free home valuation."
- **A ready-to-send reply draft** they can copy, edit and send.
- The email is a reply to the original inquiry, so everything stays in one thread.

### 3. Always-on backup
If the AI is ever slow or unavailable, the inquiry is still delivered exactly as it is today. No lead is ever lost because of the AI.

### 4. Saved from day one
Every inquiry and its AI summary is saved to the database, so the dashboard (Phase 2) starts with the full history.

---

## Phase 2: Private lead dashboard

A private, password-protected area of the site at `/admin`. Only Irma and John can sign in, using an emailed sign-in link or Google sign-in limited to their addresses.

### Core dashboard (not AI)
- **Lead inbox:** every inquiry in one list, newest first, with search and filters.
- **Status pipeline:** New → Contacted → Showing / Listing appointment → Under contract → Closed, or Lost.
- **Lead page:** contact details, the original message, notes, and a full activity history.
- **Follow-up dates** with reminders when they're due.
- **CSV export** of all leads at any time, so the data is never locked in.

### AI features in the dashboard
1. **Lead scoring:** each lead is ranked hot, warm or cold, with the reason shown, so the most urgent leads sit at the top.
2. **One-click reply drafts:** Claude writes a personal email based on the lead's message and notes. They edit it and send it from the dashboard. Nothing sends without their OK.
3. **Follow-up drafts:** when a follow-up is due, a suggested check-in message is ready. For example: "It's been two weeks since we toured homes in Helotes…"
4. **"Catch me up" summaries:** one click summarizes a lead's whole history before a call.
5. **Note cleanup:** they type quick notes after a call ("wants 4 bed, Alamo Ranch, needs to sell first") and Claude turns them into organized details on the lead (bedrooms, area, contingency).
6. **Plain-English search:** for example "sellers in Boerne from last month" or "veterans looking to buy under $400k."
7. **Repeat-visitor detection:** if the same person inquires twice, the inquiries are linked to one lead instead of creating a duplicate.
8. **Stale-lead nudges:** a flag on promising leads nobody has contacted in a while.
9. **Weekly digest email:** a short Monday summary of new leads, hot leads, follow-ups due and leads going cold.

---

## Phase 3: Optional add-ons (later)

These can be added once Phases 1 and 2 are running well:

- **Website chat assistant:** answers visitors' questions about the buying, selling and renting process, the team's services and their listings 24/7, then offers to connect them with Irma or John and captures their contact details.
- **Listing description writer:** drafts property descriptions from the home's details and photos for John to edit.
- **Blog drafting helper:** drafts posts on topics like downsizing, PCS moves, land and investing, in the team's voice, for review before publishing.
- **Text message replies:** an instant text in addition to email. This needs the person's consent to receive texts, and a texting service with a small monthly cost.

---

## Safeguards built in

- **A human stays in charge:** apart from the first instant reply, nothing is sent to a client without Irma's or John's approval.
- **Fair housing:** the AI is instructed never to steer people toward or away from neighborhoods, or describe areas, based on protected characteristics (race, religion, familial status, disability, national origin, sex or color).
- **No professional advice:** no home values, legal, tax or lending advice. Those questions are passed to Irma and John.
- **Honest disclosure:** automated replies say they were written with AI assistance.
- **Privacy:** lead data is stored in the client's own database, is only visible to Irma and John, and is never used to train AI models. We collect only what the forms need.
- **Spam and trick messages:** the AI treats what visitors type as information, not instructions, so a message like "ignore your rules and…" can't change what it does.
- **Backups** of the lead database.

---

## Costs

- **AI usage:** paid to Anthropic based on how much it's used. Each inquiry costs a small amount; we'll measure the real numbers after launch and can set a monthly spending limit.
- **Database and sign-in:** free tiers (for example Neon or Supabase) are expected to cover a team this size.
- **Hosting:** the site already runs on Vercel.
- **No per-user CRM subscription.**
- **Optional texting (Phase 3):** a texting service subscription plus a small cost per message.

## What we need from the client

1. An **Anthropic account** in the business's name, for the AI.
2. A **database account** in the business's name (Neon or Supabase).
3. A **sign-in choice:** an emailed link or Google sign-in.
4. A decision on whether the **instant visitor reply** should send automatically (recommended) or wait for approval.
5. A review of the **tone and wording** of the instant reply before launch.

## Build order

1. **Phase 1:** instant reply, lead summary and saving leads to the database.
2. **Phase 2:** dashboard with sign-in, lead list, pipeline, notes and follow-ups, then the AI tools inside it.
3. **Phase 3:** optional add-ons, as wanted.
