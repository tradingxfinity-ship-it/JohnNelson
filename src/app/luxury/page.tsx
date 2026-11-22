import type { Metadata } from "next";
import { InquirySection } from "@/components/InquirySection";
import { TopicGrid, TopicHero } from "@/components/TopicPage";
import { luxury } from "@/content/services";

export const metadata: Metadata = {
  title: "Luxury Homes",
  description:
    "Buy or sell a higher-value home in San Antonio and the Hill Country with John and Irma Nelson: careful presentation, discretion, and a builder's eye on quality.",
  alternates: { canonical: "/luxury" },
};

const image = {
  src: "/images/portfolio/48.webp",
  alt: "Two-story stone and brick home at sunset with Hill Country views, sold by the team",
  width: 1152,
  height: 864,
};

export default function LuxuryPage() {
  return (
    <>
      <TopicHero
        eyebrow="Luxury homes"
        headline="Higher-value homes, handled with care."
        image={image}
        imageAlt="Stone and brick home at sunset"
        primary={{ href: "/sell#contact", label: "What’s my home worth?" }}
      >
        <p>
          A higher-value home deserves careful presentation, real market knowledge, and a team that understands
          quality. From Hill Country views to San Antonio’s finest neighborhoods, we help buyers and sellers move with
          confidence.
        </p>
        <p>
          John’s experience as a homebuilder and investor means an informed eye on construction, finishes, and condition,
          on both sides of the deal.
        </p>
      </TopicHero>

      <TopicGrid
        className="border-t border-line"
        eyebrow="How we help"
        headline="Selling and buying at a higher price point."
        topics={luxury.topics}
      />

      <InquirySection defaultType="sell" />
    </>
  );
}
