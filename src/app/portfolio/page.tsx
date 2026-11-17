import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { PortfolioHero } from "@/components/PortfolioHero";
import { ButtonLink, Container, Section } from "@/components/ui";
import { CONTACT_HREF } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio of Homes Sold",
  description:
    "Browse homes Irma and John Nelson have sold across San Antonio, Canyon Lake, Schertz, New Braunfels, and the Hill Country.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />

      <section className="pb-20 pt-8 lg:pb-26 lg:pt-10">
        <Container>
          <PortfolioGrid />
        </Container>
      </section>

      <Section className="bg-cloud">
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
