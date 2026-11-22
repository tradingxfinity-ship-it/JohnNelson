import type { Metadata } from "next";
import { InquirySection } from "@/components/InquirySection";
import { TopicGrid, TopicHero, TopicSteps } from "@/components/TopicPage";
import { veterans } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Veterans & Military Families",
  description:
    "Veteran-owned real estate help in San Antonio: PCS moves to and from Joint Base San Antonio, buying with a VA loan, and selling or renting when you get orders.",
  alternates: { canonical: "/veterans" },
};

export default function VeteransPage() {
  return (
    <>
      <TopicHero
        eyebrow="Veterans & military families"
        headline="From one veteran family to another."
        image={site.images.military}
        imageAlt="Brick ranch home under a large live oak tree"
        primary={{ href: "/buy#contact", label: "Plan my move" }}
      >
        <p>
          Get It Sold Realty is veteran-owned: John is a United States Marine Corps veteran. San Antonio is home to a
          large military community, and we understand that military moves run on someone else’s schedule.
        </p>
        <p>
          Whether you’re arriving on orders, leaving for your next duty station, or settling down after service, Irma
          and John will build a plan around your dates.
        </p>
      </TopicHero>

      <TopicGrid
        className="border-t border-line"
        eyebrow="How we help"
        headline="Moves that fit military life."
        topics={veterans.topics}
      />

      <TopicSteps headline="Working around your orders" steps={veterans.steps} />

      <InquirySection defaultType="buy" />
    </>
  );
}
