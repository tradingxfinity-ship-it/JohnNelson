import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AreaMap } from "@/components/AreaMap";
import { Photo } from "@/components/Photo";
import { Reviews } from "@/components/Reviews";
import { SoldCarousel } from "@/components/SoldCarousel";
import { ArrowLink, ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { publishedAreas } from "@/content/areas";
import { portfolio } from "@/content/portfolio";
import { CONTACT_HREF, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About The Nelson Team, San Antonio",
  description:
    "Meet John and Irma Nelson of Get It Sold Realty: a veteran-owned, husband-and-wife real estate team serving San Antonio with practical property experience and personal guidance.",
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

/** Links to the area's own page once it's published */
function AreaName({ name }: { name: string }) {
  const page = publishedAreas.find((p) => p.name === name);
  if (!page) return name;
  return (
    <Link href={`/areas/${page.slug}`} className="underline-offset-4 hover:underline">
      {name}
    </Link>
  );
}

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
            <Eyebrow>The Nelson Team · Get It Sold Realty</Eyebrow>
            <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[4.5rem]">
              Meet John &amp; Irma Nelson.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed sm:text-xl sm:leading-relaxed">
              Buying or selling a home is more than a transaction. It’s a major life decision: a new beginning, an
              important investment, or the close of a meaningful chapter. We’re a husband-and-wife team serving San
              Antonio and the surrounding communities, and we treat every client with the care and respect they
              deserve.
            </p>
            <p className="mt-4 max-w-xl text-lg font-medium text-blue">Our philosophy is simple: your goals come first.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={CONTACT_HREF}>Talk to Irma and John</ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary">
                See homes we’ve sold
              </ButtonLink>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {["Veteran-owned", "Se habla español", "San Antonio, Texas"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red" />
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
      <section aria-label="By the numbers" className="bg-blue">
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

      {/* John and Irma */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Who you’ll work with</Eyebrow>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-4xl">
              Practical experience, personal attention.
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-2">
            <article className="bg-white p-7 sm:p-10">
              <p className="text-sm font-medium text-red">John Nelson</p>
              <h3 className="mt-3 text-2xl font-medium">Experience beyond the real estate contract</h3>
              <p className="mt-4 leading-relaxed">
                John is the broker/owner of Get It Sold Realty, a United States Marine Corps veteran, and an experienced
                real estate investor, homebuilder, and renovation professional, which gives him a perspective that goes
                well beyond traditional real estate sales.
              </p>
              <p className="mt-4 leading-relaxed">
                He understands what goes into building a home, evaluating a property’s condition, managing
                renovations, and analyzing investments: decisions that can shape a family’s financial future. That
                hands-on experience helps clients see both the opportunities and the potential challenges of a
                property.
              </p>
            </article>
            <article className="bg-white p-7 sm:p-10">
              <p className="text-sm font-medium text-red">Irma Nelson</p>
              <h3 className="mt-3 text-2xl font-medium">A personal touch that makes a difference</h3>
              <p className="mt-4 leading-relaxed">
                Irma brings a relationship-focused approach built on personal attention and clear communication, helping
                clients feel comfortable throughout buying or selling.
              </p>
              <p className="mt-4 leading-relaxed">
                Every client’s needs are different. Some are buying their first home; others are selling one they’ve
                owned for decades. Some are relocating, downsizing, investing, or helping aging parents with difficult
                decisions. Whatever brings you here, you deserve honest answers and a team that listens.
              </p>
            </article>
          </div>
        </Container>
      </Section>

      {/* How we work */}
      <Section className="border-t border-line">
        <Container className="grid gap-12 lg:grid-cols-[4fr_7fr] lg:gap-20">
          <div className="flex flex-col rounded-lg border-2 border-red bg-blue p-7 sm:p-9">
            <p className="mb-4 flex items-center gap-3 text-sm font-medium text-white/80">
              <span aria-hidden className="h-px w-8 bg-red-light" />
              How we work
            </p>
            <h2 className="text-[1.75rem] font-medium leading-tight text-white sm:text-4xl">
              What working with us looks like.
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-white/80">
              You work with Irma and John themselves, with honest answers and thoughtful guidance from the first
              conversation to closing.
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
                <span className="text-sm font-medium text-red">0{i + 1}</span>
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

      {/* Life transitions */}
      <Section className="border-t border-line">
        <Container className="grid gap-10 lg:grid-cols-[5fr_6fr] lg:gap-20">
          <div>
            <Eyebrow>Life transitions</Eyebrow>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-4xl">
              Helping families navigate life’s transitions.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed">
              Some of the most important real estate decisions happen during life’s biggest changes. Whether you’re
              preparing to retire, considering a smaller home, managing an inherited property, or helping a parent move
              to a new living arrangement, these decisions are emotional as well as financial.
            </p>
            <p className="mt-4 leading-relaxed">
              Our goal is to simplify the process, explain your options, and help you make informed decisions without
              unnecessary pressure.
            </p>
            <ArrowLink href="/senior-transitions" className="mt-6 text-[15px]">
              Senior living &amp; life transitions
            </ArrowLink>
          </div>
        </Container>
      </Section>

      {/* Rooted in service */}
      <Section id="service" className="bg-cloud">
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
            <Eyebrow>Rooted in service</Eyebrow>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-3xl">
              Rooted in service. Committed to our community.
            </h2>
            <p className="mt-4 leading-relaxed">
              Service has always been part of our lives. John’s years as a United States Marine, and his community
              outreach and recovery ministry, reinforced integrity, accountability, compassion, and helping others
              through difficult seasons. Those same values guide how we work.
            </p>
            <p className="mt-4 leading-relaxed">
              We believe relationships matter more than transactions, our word should mean something, and doing what’s
              right for our clients is always good business. That includes service members, veterans, and their
              families moving to, from, and within the San Antonio area.
            </p>
            <h3 className="mt-6 text-sm font-medium text-blue">For military families</h3>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {military.map((m) => (
                <li key={m.title} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                  <h3 className="text-base font-medium">{m.title}</h3>
                  <p className="text-[15px] leading-relaxed">{m.body}</p>
                </li>
              ))}
            </ul>
            <ArrowLink href="/veterans" className="mt-6 text-[15px]">
              Veterans &amp; military families
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
                <div key={s.label} className="flex flex-col-reverse justify-end rounded-md bg-blue px-3 py-4 sm:px-5 sm:py-5">
                  <dt className="mt-1 text-xs leading-snug text-white/75 sm:text-[13px]">{s.label}</dt>
                  <dd className="text-2xl font-medium leading-none tracking-[-0.03em] text-white sm:text-3xl">{s.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-8 text-sm font-medium text-blue">Service areas</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {site.serviceAreas.map((a) => (
                <li key={a} className="rounded-full bg-cloud px-3 py-1 text-[13px] text-blue">
                  <AreaName name={a} />
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
              <p className="text-sm font-medium text-blue">Homes in our portfolio</p>
              <ul className="mt-3 space-y-2.5">
                {byCity.slice(0, 5).map(([city, n]) => (
                  <li key={city}>
                    <div className="flex items-baseline justify-between text-[13px]">
                      <span className="text-blue">{city}</span>
                      <span className="tabular-nums">{n}</span>
                    </div>
                    <div className="mt-1 h-1 rounded-full bg-line">
                      <div className="h-1 rounded-full bg-red" style={{ width: `${(n / byCity[0][1]) * 100}%` }} />
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
      <section className="relative isolate overflow-hidden bg-blue py-20 lg:py-26">
        {site.images.contact && (
          <Image src={site.images.contact.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />
        )}
        <div aria-hidden className="absolute inset-0 -z-10 bg-blue/80" />
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-medium text-white sm:text-4xl">Let’s talk about your next chapter.</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Whether you’re buying, selling, building, investing, or simply exploring your options, we’d welcome the
              chance to help. Share a few details, or call{" "}
              <a href={site.contact.phoneHref} className="font-medium text-white underline underline-offset-4">
                {site.contact.phoneDisplay}
              </a>
              .
            </p>
            <p className="mt-6 text-white">
              <span className="font-medium">John &amp; Irma Nelson</span>
              <span className="block text-sm text-white/70">The Nelson Team · A Legacy of Service</span>
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
