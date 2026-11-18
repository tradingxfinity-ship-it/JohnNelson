import type { Metadata } from "next";
import Image from "next/image";
import { AreaMap } from "@/components/AreaMap";
import { Photo } from "@/components/Photo";
import { Reviews } from "@/components/Reviews";
import { SoldCarousel } from "@/components/SoldCarousel";
import { ArrowLink, ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { portfolio } from "@/content/portfolio";
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
  // Homes with full albums (no land) for the carousel, a few strong exteriors first
  const albumHomes = portfolio.filter((h) => (h.album || h.photos?.length) && !h.details.includes("Land"));
  const preferred = ["78258", "78248", "78213"];
  const carouselHomes = [
    ...preferred.map((zip) => albumHomes.find((h) => h.zip === zip)).filter((h) => h !== undefined),
    ...albumHomes.filter((h) => !preferred.includes(h.zip)),
  ];

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
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
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
                <dd className="text-4xl font-medium tracking-[-0.03em] text-gold-light lg:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* How we work */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[4fr_7fr] lg:gap-20">
          <div className="flex flex-col rounded-lg border-2 border-gold bg-navy p-7 sm:p-9">
            <p className="mb-4 flex items-center gap-3 text-sm font-medium text-white/80">
              <span aria-hidden className="h-px w-8 bg-gold-light" />
              How we work
            </p>
            <h2 className="text-[1.75rem] font-medium leading-tight text-white sm:text-4xl">
              What working with us looks like.
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-white/80">
              Through Get It Sold Realty, John is the broker and owner, and clients work with Irma and John themselves.
            </p>
            <div className="mt-8 lg:mt-auto lg:pt-10">
              <ButtonLink href={CONTACT_HREF} variant="inverse" className="w-full sm:w-auto">
                Talk to Irma and John
              </ButtonLink>
            </div>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="bg-white p-7 lg:p-8">
                <span className="text-sm font-medium text-gold-deep">0{i + 1}</span>
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
          <div className="mt-10">
            <SoldCarousel homes={carouselHomes} />
          </div>
        </Container>
      </Section>

      {/* Military families */}
      <Section className="bg-cloud">
        <Container className="grid gap-12 lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-16">
          <Photo
            image={militaryImage}
            fallbackAlt="A San Antonio home"
            shape="arch"
            caption="Relocating to San Antonio"
            captionOn="cloud"
            sizes="(min-width: 1024px) 480px, 100vw"
            className="aspect-[4/3] w-full"
          />
          <div>
            <Eyebrow>Military families and veterans</Eyebrow>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-3xl">
              Helping military families make their next move.
            </h2>
            <p className="mt-4 leading-relaxed">
              Irma and John work with service members, veterans, and their families moving to, from, and within the San
              Antonio area, whether they’re buying, selling, or renting.
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
      <Section className="border-t border-line">
        <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>Where we work</Eyebrow>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-4xl">San Antonio and the Hill Country.</h2>
            <p className="mt-4 leading-relaxed">
              From city neighborhoods to lake and Hill Country homes, Irma and John help clients across the region.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { value: String(site.serviceAreas.length), label: "Service areas" },
                { value: String(portfolio.length), label: "Portfolio homes" },
                { value: String(site.languages.length), label: site.languages.join(" & ") },
              ].map((s) => (
                // Column-reverse keeps the number above its label; justify-end pins both to the top
                <div key={s.label} className="flex flex-col-reverse justify-end rounded-md bg-navy px-3 py-4 sm:px-5 sm:py-5">
                  <dt className="mt-1 text-xs leading-snug text-white/75 sm:text-[13px]">{s.label}</dt>
                  <dd className="text-2xl font-medium leading-none tracking-[-0.03em] text-gold-light sm:text-3xl">{s.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-8 text-sm font-medium text-navy">Service areas</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {site.serviceAreas.map((a) => (
                <li key={a} className="rounded-full bg-cloud px-3 py-1 text-[13px] text-navy">
                  {a}
                </li>
              ))}
            </ul>
            <ArrowLink href="/portfolio" className="mt-8 text-[15px]">
              Browse homes by area
            </ArrowLink>
          </div>

          <div className="relative">
            <div className="relative isolate h-[360px] overflow-hidden rounded-lg rounded-tr-[clamp(64px,14vw,180px)] border border-line sm:h-[520px]">
              <AreaMap reserveBottomLeft={[290, 0]} />
            </div>
            {/* Homes sold by area: laid over the map on larger screens, below it on phones */}
            <div className="mt-3 rounded-md border border-line bg-white p-4 sm:absolute sm:bottom-5 sm:left-5 sm:z-[500] sm:mt-0 sm:w-[280px] sm:border-0 sm:bg-white/95 sm:p-5 sm:shadow-sm sm:backdrop-blur-sm">
              <p className="text-sm font-medium text-navy">Homes in our portfolio</p>
              <ul className="mt-3 space-y-2.5">
                {byCity.slice(0, 5).map(([city, n]) => (
                  <li key={city}>
                    <div className="flex items-baseline justify-between text-[13px]">
                      <span className="text-navy">{city}</span>
                      <span className="tabular-nums">{n}</span>
                    </div>
                    <div className="mt-1 h-1 rounded-full bg-line">
                      <div className="h-1 rounded-full bg-gold" style={{ width: `${(n / byCity[0][1]) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Reviews />

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
