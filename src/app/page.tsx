import type { Metadata } from "next";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HeroSearch } from "@/components/HeroSearch";
import { InquirySection } from "@/components/InquirySection";
import { Listings } from "@/components/Listings";
import { SalesMap } from "@/components/SalesMap";
import { SoldGallery } from "@/components/SoldGallery";
import { Photo } from "@/components/Photo";
import { Reviews } from "@/components/Reviews";
import { StatsStrip } from "@/components/StatsStrip";
import { ArrowLink, ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { pillars, seniorTransitions } from "@/content/services";
import { CONTACT_HREF, site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | San Antonio Real Estate with Irma and John Nelson` },
  description:
    "The Nelson Team at Get It Sold Realty: Irma and John Nelson help San Antonio families buy, sell, build, invest, and move through life's transitions with confidence.",
  alternates: { canonical: "/" },
};

const differentiators = [
  {
    title: "Veteran-owned",
    body: "John is a United States Marine Corps veteran. Integrity and accountability guide how we work.",
  },
  {
    title: "A builder’s eye",
    body: "Hands-on experience building, renovating, and investing in property, so you understand a home’s condition and potential.",
  },
  {
    title: "A husband-and-wife team",
    body: "You work with Irma and John directly, with personal attention from the first call to closing.",
  },
  {
    title: "Help through life’s transitions",
    body: "Downsizing, inherited homes, and helping parents move, handled with patience and without pressure.",
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
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-14">
            <div>
              <Eyebrow>{site.hero.eyebrow}</Eyebrow>
              <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]">
                {site.hero.heading}
              </h1>
            </div>
            <div>
              <p className="text-xl leading-relaxed sm:text-2xl sm:leading-snug">{site.hero.body}</p>
              <HeroSearch />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <ButtonLink href="/sell#contact" className="min-h-14 text-base sm:text-lg">
                  What’s my home worth?
                </ButtonLink>
                <ButtonLink href={CONTACT_HREF} variant="secondary" className="min-h-14 text-base sm:text-lg">
                  Schedule a consultation
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
          <div className="order-last grid grid-cols-2 gap-3 lg:order-none lg:gap-4">
            {site.images.services.map((img, i) => (
              <Photo
                key={img.src}
                image={img}
                fallbackAlt=""
                shape={i === 0 ? "arch" : "rounded"}
                sizes="(min-width: 1024px) 320px, 50vw"
                className="aspect-square w-full"
              />
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <Eyebrow>Our services</Eyebrow>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-3xl">How can we help?</h2>
            <ol className="mt-6 border-t border-line">
              {pillars.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[2rem_1fr] border-b border-line py-5">
                  <span className="pt-1 text-sm font-medium text-red">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-medium sm:text-xl">{p.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed">{p.body}</p>
                    <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                      {p.links.map((l) => (
                        <li key={l.href}>
                          <ArrowLink href={l.href} className="text-sm">
                            {l.label}
                          </ArrowLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Meet Irma and John */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
          <Photo
            image={site.images.team}
            fallbackAlt=""
            shape="archRight"
            caption="Irma and John Nelson"
            sizes="(min-width: 1248px) 560px, (min-width: 1024px) 45vw, 100vw"
            className="aspect-[5/4] w-full lg:order-last"
          />
          <div>
            <Eyebrow>Meet the Nelson Team</Eyebrow>
            <h2 className="text-3xl font-medium leading-tight sm:text-[2.75rem]">
              Real estate is about more than property. It’s about people.
            </h2>
            <p className="mt-6 text-lg leading-relaxed">
              We’re John and Irma Nelson, a husband-and-wife real estate team serving San Antonio and the surrounding
              communities. We’ve built our approach around personal relationships, honest guidance, and practical
              experience. Our philosophy is simple: your goals come first.
            </p>
            <ArrowLink href="/about" className="mt-8">
              Meet Irma and John
            </ArrowLink>
          </div>
        </Container>
      </Section>

      {/* Why work with us */}
      <Section className="bg-blue">
        <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-sm font-medium text-white/80">
              <span aria-hidden className="h-px w-8 bg-red-light" />
              Why the Nelson Team
            </p>
            <h2 className="text-[1.75rem] font-medium leading-tight text-white sm:text-4xl">
              Experience beyond the real estate contract.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-white/80">
              Buying or selling is a big financial decision. It helps to work with people who understand how homes are
              built, what repairs really cost, and what makes a property a good investment.
            </p>
            <ArrowLink href="/building-investing" className="mt-8 text-[15px] text-white! hover:text-white!">
              Building &amp; investing
            </ArrowLink>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-lg bg-white/15 sm:grid-cols-2">
            {differentiators.map((d) => (
              <li key={d.title} className="bg-blue p-6 sm:p-7">
                <h3 className="text-lg font-medium text-white">{d.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/75">{d.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Listings />

      {/* Senior living and life transitions */}
      <Section className="bg-cloud">
        <Container className="grid gap-12 lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-16">
          <Photo
            image={site.images.transitions}
            fallbackAlt="A family home"
            shape="arch"
            caption="Life transitions"
            captionOn="cloud"
            sizes="(min-width: 1024px) 480px, 100vw"
            className="aspect-[4/3] w-full"
          />
          <div>
            <Eyebrow>Senior living &amp; life transitions</Eyebrow>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-3xl">
              Help with the moves that matter most.
            </h2>
            <p className="mt-4 leading-relaxed">
              Preparing to retire, moving to a smaller home, managing an inherited property, or helping a parent move:
              these decisions are emotional as well as financial. We explain your options and help you decide without
              unnecessary pressure.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {seniorTransitions.situations.map((t) => (
                <li key={t.title} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-blue">
                  {t.title}
                </li>
              ))}
            </ul>
            <ArrowLink href="/senior-transitions" className="mt-8 text-[15px]">
              How we help with life transitions
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <SalesMap />

      <SoldGallery />

      {/* Military families and veterans */}
      <Section className="bg-cloud">
        <Container className="grid gap-12 lg:grid-cols-[6fr_5fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>Military families and veterans</Eyebrow>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-3xl">
              Real estate guidance for military families and veterans.
            </h2>
            <p className="mt-4 leading-relaxed">
              Get It Sold Realty is veteran-owned: John is a United States Marine Corps veteran. San Antonio is home to
              a large military community, and Irma and John help service members, veterans, and their families buy,
              sell, or rent with a clear plan for the move ahead.
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {militaryPoints.map((p) => (
                <li key={p.title} className="py-4">
                  <h3 className="text-base font-medium">{p.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed">{p.body}</p>
                </li>
              ))}
            </ul>
            <ArrowLink href="/veterans" className="mt-6 text-[15px]">
              How we help veterans and military families
            </ArrowLink>
          </div>
          <Photo
            image={site.images.military}
            fallbackAlt="A San Antonio home"
            shape="arch"
            caption="Relocating to San Antonio"
            captionOn="cloud"
            sizes="(min-width: 1024px) 520px, 100vw"
            className="aspect-[4/3] w-full"
          />
        </Container>
      </Section>

      <Reviews />

      <InquirySection />
    </>
  );
}
