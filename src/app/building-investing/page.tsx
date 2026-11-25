import type { Metadata } from "next";
import { InquirySection } from "@/components/InquirySection";
import { TopicPosts } from "@/components/TopicPosts";
import { TopicGrid, TopicHero } from "@/components/TopicPage";
import { buildingInvesting } from "@/content/services";

export const metadata: Metadata = {
  title: "San Antonio Remodeling & Investing",
  description:
    "Construction insight, renovation planning, property condition, and investment property analysis in San Antonio from John and Irma Nelson.",
  alternates: { canonical: "/building-investing" },
};

const image = {
  src: "/images/living-room-beamed-ceiling.webp",
  alt: "Living room with a beamed vaulted ceiling",
  width: 768,
  height: 576,
};

export default function BuildingInvestingPage() {
  return (
    <>
      <TopicHero
        eyebrow="Building, remodeling & investing"
        headline="See a property’s potential, and its problems."
        image={image}
        imageAlt="Living room with a beamed vaulted ceiling"
        primary={{ href: "/sell#contact", label: "What’s my home worth?" }}
      >
        <p>
          John is an experienced real estate investor, homebuilder, and renovation professional. He understands what goes
          into building a home, judging its condition, managing renovations, and analyzing an investment.
        </p>
        <p>
          That hands-on experience helps you see both the opportunities and the challenges of a property before you
          commit, whether you’re buying, selling, remodeling, or investing.
        </p>
      </TopicHero>

      <TopicGrid
        className="border-t border-line"
        eyebrow="Building & remodeling"
        headline="A builder’s eye on every home."
        topics={buildingInvesting.building}
      />

      <TopicGrid
        id="investing"
        className="bg-cloud"
        eyebrow="Real estate investing"
        headline="Investing with your eyes open."
        intro="For first-time and experienced investors alike, we look at the numbers and the property together."
        topics={buildingInvesting.investing}
      />

      <TopicPosts category="building-investing" />

      <InquirySection defaultType="buy" />
    </>
  );
}
