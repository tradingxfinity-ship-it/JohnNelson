import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { ArrowLink, ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { portfolio } from "@/content/portfolio";
import { totalSold } from "@/content/sales";
import { CONTACT_HREF, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Irma and John Nelson",
  description:
    "Meet Irma and John Nelson, the broker/owner team behind Get It Sold Realty. 19 years, 290+ homes sold, and $100M+ in sales across San Antonio and the Hill Country.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Honest communication",
    body: "Straight answers and regular updates, so you always know where things stand.",
  },
  {
    title: "Hands-on, start to finish",
    body: "You work with Irma and John directly, from the first conversation to moving day.",
  },
  {
    title: "19 years in San Antonio",
    body: "Local knowledge of neighborhoods across San Antonio, Canyon Lake, and the Hill Country.",
  },
  {
    title: "One team for every move",
    body: "Buying, selling, or renting, plus property management and notary services.",
  },
];

// Distinct from the homes in the mosaic above
const militaryImage = {
  src: "/images/sold/san-antonio-78249/01.webp",
  alt: "Two-story home with a covered front porch sold by the team",
  width: 1152,
  height: 864,
};

const military = [
  { title: "Relocation", body: "Help understanding the area and planning your move, wherever you’re coming from." },
  { title: "Move-in timelines", body: "A search planned around report dates and moving windows." },
  { title: "The right part of town", body: "Neighborhoods compared for your commute, budget, and family." },
];

export default function AboutPage() {
  // Homes per community in the portfolio, most first
  const byCity = [...portfolio.reduce((m, h) => m.set(h.city, (m.get(h.city) ?? 0) + 1), new Map<string, number>())]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  // Three home exteriors for the mosaic: preferred ZIPs first, then any other album home (no land)
  const albumHomes = portfolio.filter((h) => (h.album || h.photos?.length) && !h.details.includes("Land"));
  const preferred = ["78258", "78248", "78213"];
  const mosaic = [
    ...preferred.map((zip) => albumHomes.find((h) => h.zip === zip)).filter((h) => h !== undefined),
    ...albumHomes.filter((h) => !preferred.includes(h.zip)),
  ].slice(0, 3);

  return (
    <>
      {/* Intro */}
      <section className="pb-16 pt-10 lg:pb-24 lg:pt-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[6fr_5fr] lg:gap-16">
          <div>
            <Eyebrow>About Get It Sold Realty</Eyebrow>
            <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[4.5rem]">
              Meet Irma and John Nelson.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed sm:text-xl sm:leading-relaxed">
              A San Antonio real estate couple who have spent 19 years helping people buy, sell, and rent homes,
              townhomes, and apartments, with honest communication and hands-on guidance at every step.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={CONTACT_HREF}>Talk to Irma and John</ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary">
                See homes we’ve sold
              </ButtonLink>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {["Broker/owner team", `Se habla español`, "San Antonio, Texas"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brass" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Photo
            image={site.images.team}
            fallbackAlt="Irma and John Nelson"
            shape="archRight"
            caption="Irma and John Nelson"
            priority
            sizes="(min-width: 1248px) 520px, (min-width: 1024px) 42vw, 100vw"
            className="aspect-[5/4] w-full"
          />
        </Container>
      </section>

      {/* Numbers */}
      <section aria-label="By the numbers" className="bg-navy">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {[
              ...site.stats,
              { value: site.zillow.rating, label: `Zillow rating, ${site.zillow.reviewCount} reviews` },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse gap-1 border-white/15 py-8 lg:py-10 ${
                  i % 2 === 1 ? "border-l pl-6 lg:pl-10" : "pr-6 lg:pr-10"
                } ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-10" : ""}`}
              >
                <dt className="text-[15px] text-white/70">{s.label}</dt>
                <dd className="text-4xl font-medium tracking-[-0.03em] text-white lg:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* How we work */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[4fr_7fr] lg:gap-20">
          <div>
            <Eyebrow>How we work</Eyebrow>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-4xl">What working with us looks like.</h2>
            <p className="mt-5 max-w-sm leading-relaxed">
              Through Get It Sold Realty, John is the broker and owner, and clients work with Irma and John themselves.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="bg-white p-7 lg:p-8">
                <span className="text-sm font-medium text-brass">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-medium">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Homes we've sold */}
      <Section className="border-t border-line">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Our work</Eyebrow>
              <h2 className="text-[1.75rem] font-medium leading-tight sm:text-4xl">Homes we’ve helped sell.</h2>
            </div>
            <ArrowLink href="/portfolio" className="text-[15px]">
              See all {portfolio.length} homes in our portfolio
            </ArrowLink>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-[2fr_1fr] sm:grid-rows-2 lg:gap-4">
            {mosaic.map((h, i) => (
              <Link
                key={h.src}
                href="/portfolio"
                className={`group relative block overflow-hidden rounded-lg bg-ivory ${
                  i === 0
                    ? "aspect-[4/3] rounded-tl-[clamp(64px,14vw,180px)] sm:row-span-2 sm:aspect-auto sm:min-h-[460px]"
                    : "aspect-[4/3] sm:aspect-auto sm:min-h-[220px]"
                }`}
              >
                <Image
                  src={h.src}
                  alt={`Home sold in ${h.city}, TX ${h.zip}`}
                  fill
                  sizes={i === 0 ? "(min-width: 640px) 66vw, 100vw" : "(min-width: 640px) 33vw, 100vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span className="absolute bottom-0 left-0 rounded-tr-lg bg-white px-4 pb-1.5 pt-3 text-xs font-medium uppercase tracking-[0.12em] text-navy">
                  {h.city} · Sold {h.sold}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Military families */}
      <Section className="bg-ivory">
        <Container className="grid gap-12 lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-16">
          <Photo
            image={militaryImage}
            fallbackAlt="A San Antonio home"
            shape="arch"
            caption="Relocating to San Antonio"
            captionOn="ivory"
            sizes="(min-width: 1024px) 480px, 100vw"
            className="aspect-[4/3] w-full"
          />
          <div>
            <Eyebrow>Military families and veterans</Eyebrow>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-3xl">
              Helping military families make their next move.
            </h2>
            <p className="mt-4 leading-relaxed">
              Irma and John work with service members, veterans, and their families moving to, from, and within the
              San Antonio area, whether they’re buying, selling, or renting.
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {military.map((m) => (
                <li key={m.title} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                  <h3 className="text-base font-medium">{m.title}</h3>
                  <p className="text-[15px] leading-relaxed">{m.body}</p>
                </li>
              ))}
            </ul>
            <ArrowLink href={CONTACT_HREF} className="mt-6 text-[15px]">
              Tell us about your move
            </ArrowLink>
          </div>
        </Container>
      </Section>

      {/* Where we work */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[4fr_7fr] lg:gap-20">
          <div>
            <Eyebrow>Where we work</Eyebrow>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-4xl">San Antonio and the Hill Country.</h2>
            <p className="mt-5 max-w-sm leading-relaxed">
              From city neighborhoods to lake and Hill Country homes, Irma and John help clients across the region,
              in {site.languages.join(" and ")}.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-navy">Service areas</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.serviceAreas.map((a) => (
                  <li key={a} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-navy">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-navy">Homes in our portfolio</h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {byCity.map(([city, n]) => (
                  <li key={city} className="flex items-baseline justify-between py-3">
                    <span className="text-navy">{city}</span>
                    <span className="text-sm tabular-nums">
                      {n} {n === 1 ? "home" : "homes"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Reviews */}
      <section className="border-t border-line py-14 lg:py-16">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <p className="text-5xl font-medium tracking-[-0.03em] text-navy">{site.zillow.rating}</p>
            <div>
              <p className="flex gap-0.5 text-brass" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L10 14.8l-5.4 2.9 1.2-5.9L1.4 7.7l6-.7z" />
                  </svg>
                ))}
              </p>
              <p className="mt-1 text-[15px]">
                {site.zillow.reviewCount} reviews on Zillow · {totalSold} sales listed
              </p>
            </div>
          </div>
          {site.zillow.profileUrl && (
            <a
              href={site.zillow.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-navy underline-offset-4 hover:underline"
            >
              Read reviews on Zillow
              <span aria-hidden>↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </Container>
      </section>

      {/* Call to action */}
      <section className="relative isolate overflow-hidden bg-navy py-20 lg:py-26">
        {site.images.contact && (
          <Image src={site.images.contact.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />
        )}
        <div aria-hidden className="absolute inset-0 -z-10 bg-navy/80" />
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-medium text-white sm:text-4xl">Ready to talk about your move?</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Share a few details and Irma and John will follow up personally, or call{" "}
              <a href={site.contact.phoneHref} className="font-medium text-white underline underline-offset-4">
                {site.contact.phoneDisplay}
              </a>
              .
            </p>
          </div>
          <ButtonLink href={CONTACT_HREF} variant="inverse" className="w-full sm:w-auto">
            Talk to Irma and John
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
