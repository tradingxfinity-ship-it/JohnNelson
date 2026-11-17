import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { portfolio } from "@/content/portfolio";
import { totalSold } from "@/content/sales";
import { CONTACT_HREF, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio of Homes Sold",
  description:
    "Browse homes Irma and John Nelson have sold across San Antonio, Canyon Lake, Schertz, New Braunfels, and the Hill Country.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  const areas = new Set(portfolio.map((h) => h.city)).size;

  return (
    <>
      <section className="pb-12 pt-12 lg:pb-16 lg:pt-20">
        <Container className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Portfolio</Eyebrow>
            <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              Homes we’ve sold.
            </h1>
          </div>
          <div>
            <p className="text-lg leading-relaxed">
              A look at {portfolio.length} homes Irma and John have sold across {areas} communities, from San Antonio
              neighborhoods to Canyon Lake and the Hill Country. Zillow lists {totalSold} sales for the team in all.
            </p>
            {site.zillow.profileUrl && (
              <a
                href={`${site.zillow.profileUrl}#listings-and-sales`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-medium text-navy underline-offset-4 hover:underline"
              >
                See every sale on Zillow
                <span aria-hidden>↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </Container>
      </section>

      <section className="border-t border-line pb-20 pt-12 lg:pb-26">
        <Container>
          <PortfolioGrid />
        </Container>
      </section>

      <Section className="bg-ivory">
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-medium sm:text-4xl">Thinking about selling?</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Find out what your home could sell for. Irma and John will follow up personally.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/sell">Request a home valuation</ButtonLink>
            <ButtonLink href={CONTACT_HREF} variant="secondary">
              Contact us
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
