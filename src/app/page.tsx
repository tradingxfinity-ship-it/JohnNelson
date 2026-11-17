import type { Metadata } from "next";
import { HeroCarousel } from "@/components/HeroCarousel";
import { InquirySection } from "@/components/InquirySection";
import { Listings } from "@/components/Listings";
import { SalesMap } from "@/components/SalesMap";
import { SoldGallery } from "@/components/SoldGallery";
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
        <Container>
          <div className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16">
            <div>
              <Eyebrow>Get It Sold Realty · San Antonio, Texas</Eyebrow>
              <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[5rem]">
                {site.hero.heading}
              </h1>
            </div>
            <div>
              <p className="text-lg leading-relaxed">{site.hero.body}</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
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
          </div>

          <HeroCarousel />
        </Container>
      </section>

      <StatsStrip />

      {/* Services */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
          <div className="order-last grid grid-cols-2 gap-4 lg:order-none lg:gap-5">
            {site.images.services.map((img, i) => (
              <Photo
                key={img.src}
                image={img}
                fallbackAlt=""
                shape={i === 0 ? "arch" : "rounded"}
                sizes="(min-width: 1024px) 340px, 50vw"
                className="aspect-[3/4] w-full"
              />
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <Eyebrow>Our services</Eyebrow>
            <h2 className="text-3xl font-medium sm:text-4xl">How can we help you move?</h2>
            <ul className="mt-8 border-t border-line">
              {services.map((s) => (
                <li key={s.href} className="border-b border-line py-6">
                  <h3 className="text-2xl font-normal">{s.title}</h3>
                  <p className="mt-2 leading-relaxed">{s.body}</p>
                  <ArrowLink href={s.href} className="mt-4 text-[15px]">
                    {s.link}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Listings />

      <SalesMap />

      <SoldGallery />

      {/* Military families and veterans */}
      <Section className="bg-ivory">
        <Container className="grid gap-12 lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-20">
          <div>
            <Eyebrow>Military families and veterans</Eyebrow>
            <h2 className="text-3xl font-medium leading-tight sm:text-4xl">
              Real estate guidance for military families and veterans.
            </h2>
            <p className="mt-5 text-lg leading-relaxed">
              San Antonio is home to a large military community. Irma and John help service members, veterans, and
              their families buy, sell, or rent with a clear plan for the move ahead.
            </p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {militaryPoints.map((p) => (
                <li key={p.title} className="py-5">
                  <h3 className="text-lg font-medium">{p.title}</h3>
                  <p className="mt-1 leading-relaxed">{p.body}</p>
                </li>
              ))}
            </ul>
            <ArrowLink href={CONTACT_HREF} className="mt-8">
              Tell us about your move
            </ArrowLink>
          </div>
          <Photo
            image={site.images.military}
            fallbackAlt="A San Antonio home"
            shape="arch"
            caption="Relocating to San Antonio"
            captionOn="ivory"
            sizes="(min-width: 1024px) 620px, 100vw"
            className="aspect-[4/3] w-full lg:aspect-[4/5]"
          />
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
