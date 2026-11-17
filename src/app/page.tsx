import type { Metadata } from "next";
import { InquirySection } from "@/components/InquirySection";
import { Photo } from "@/components/Photo";
import { StatsStrip } from "@/components/StatsStrip";
import { TeamPortrait } from "@/components/TeamPortrait";
import { ArrowLink, ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { CONTACT_HREF, site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | San Antonio Real Estate with Irma and John Nelson` },
  description:
    "Buy, sell, or rent a home, townhome, or apartment in San Antonio with Irma and John Nelson. 19 years of experience and 290+ homes sold.",
  alternates: { canonical: "/" },
};

const services = [
  {
    title: "Buy a home",
    body: "Find a home or townhome that fits your budget, your timeline, and the way you live.",
    href: "/buy",
    link: "Explore buying",
  },
  {
    title: "Sell your home",
    body: "Find out what your property could sell for and plan your next move with a local team.",
    href: "/sell",
    link: "Explore selling",
  },
  {
    title: "Find a rental",
    body: "Tell us what you need in a house, townhome, or apartment, and we’ll help you narrow your search.",
    href: "/rent",
    link: "Explore renting",
  },
];

const militaryPoints = [
  {
    title: "Relocation",
    body: "Orders to San Antonio, or leaving it? Get help understanding the area and planning your move from wherever you are now.",
  },
  {
    title: "Move-in timelines",
    body: "Plan your search around report dates and moving windows so you can settle in when you need to.",
  },
  {
    title: "Finding the right area",
    body: "Compare neighborhoods across the San Antonio area for your commute, your budget, and your family.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pb-16 pt-10 lg:pb-24 lg:pt-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[6fr_5fr] lg:gap-16">
          <div>
            <Eyebrow>Get It Sold Realty · San Antonio, Texas</Eyebrow>
            <h1 className="text-[2.75rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]">
              {site.hero.heading}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed sm:text-xl sm:leading-relaxed">{site.hero.body}</p>
            <div className="mt-9 grid gap-3 sm:max-w-xl sm:grid-cols-3">
              <ButtonLink href="/buy" variant="secondary">
                I’m buying
              </ButtonLink>
              <ButtonLink href="/sell" variant="secondary">
                I’m selling
              </ButtonLink>
              <ButtonLink href="/rent" variant="secondary">
                I’m renting
              </ButtonLink>
            </div>
          </div>
          <Photo
            image={site.images.hero}
            fallbackAlt="A San Antonio home"
            sizes="(min-width: 1248px) 520px, (min-width: 1024px) 42vw, 100vw"
            priority
            className="aspect-[4/3] w-full lg:aspect-[5/6]"
          />
        </Container>
      </section>

      <StatsStrip />

      {/* Services */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Our services</Eyebrow>
            <h2 className="text-3xl font-medium sm:text-4xl">How can we help you move?</h2>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
            {services.map((s) => (
              <li key={s.href} className="flex flex-col bg-white p-8 lg:p-10">
                <h3 className="text-xl font-medium">{s.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed">{s.body}</p>
                <ArrowLink href={s.href} className="mt-8">
                  {s.link}
                </ArrowLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Military families and veterans */}
      <Section className="bg-ivory">
        <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <Eyebrow>Military families and veterans</Eyebrow>
            <h2 className="text-3xl font-medium leading-tight sm:text-4xl">
              Real estate guidance for military families and veterans.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed">
              San Antonio is home to a large military community. Irma and John help service members, veterans, and
              their families buy, sell, or rent with a clear plan for the move ahead.
            </p>
            <ArrowLink href={CONTACT_HREF} className="mt-8">
              Tell us about your move
            </ArrowLink>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {militaryPoints.map((p) => (
              <li key={p.title} className="grid gap-2 py-7 sm:grid-cols-[200px_1fr] sm:gap-8">
                <h3 className="text-lg font-medium">{p.title}</h3>
                <p className="leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Meet Irma and John */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <TeamPortrait />
          <div>
            <Eyebrow>Meet the team</Eyebrow>
            <h2 className="text-3xl font-medium sm:text-4xl">A real estate couple who know San Antonio.</h2>
            <p className="mt-5 text-lg leading-relaxed">
              For 19 years, Irma and John Nelson have helped people across San Antonio buy, sell, and rent. They keep
              communication honest and stay hands-on from the first conversation to moving day, so you always know
              where things stand.
            </p>
            <ArrowLink href="/about" className="mt-8">
              Meet Irma and John
            </ArrowLink>
          </div>
        </Container>
      </Section>

      {/* Zillow reviews */}
      <Section className="border-t border-line pt-16 lg:pt-20">
        <Container>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Client reviews</Eyebrow>
              <h2 className="text-3xl font-medium sm:text-4xl">What clients say on Zillow.</h2>
            </div>
            <dl className="flex gap-12">
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-[15px]">on Zillow</dt>
                <dd className="flex items-baseline gap-2 text-5xl font-medium tracking-[-0.03em] text-navy">
                  {site.zillow.rating}
                  <Stars />
                </dd>
              </div>
              <div className="flex flex-col-reverse border-l border-line pl-12">
                <dt className="mt-1 text-[15px]">reviews</dt>
                <dd className="text-5xl font-medium tracking-[-0.03em] text-navy">{site.zillow.reviewCount}</dd>
              </div>
            </dl>
          </div>

          {site.zillow.testimonials.length > 0 && (
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {site.zillow.testimonials.map((t) => (
                <li key={t.name + t.quote.slice(0, 20)} className="rounded-md border border-line p-8">
                  <blockquote className="leading-relaxed text-navy">“{t.quote}”</blockquote>
                  <p className="mt-6 text-sm">
                    {t.name}
                    {t.context ? ` · ${t.context}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {site.zillow.profileUrl && (
            <a
              href={site.zillow.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 font-medium text-navy underline-offset-4 hover:underline"
            >
              Read reviews on Zillow
              <span aria-hidden>↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </Container>
      </Section>

      <InquirySection />
    </>
  );
}

function Stars() {
  return (
    <span className="flex gap-0.5 text-brass" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L10 14.8l-5.4 2.9 1.2-5.9L1.4 7.7l6-.7z" />
        </svg>
      ))}
    </span>
  );
}
