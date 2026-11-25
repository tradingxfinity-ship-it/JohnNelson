import type { Metadata } from "next";
import { InquirySection } from "@/components/InquirySection";
import { TopicPosts } from "@/components/TopicPosts";
import { TopicGrid, TopicHero } from "@/components/TopicPage";
import { ArrowLink, Container } from "@/components/ui";
import { land } from "@/content/services";

export const metadata: Metadata = {
  title: "Hill Country & San Antonio Land",
  description:
    "Buy or sell land, lots, and acreage around San Antonio, Canyon Lake, and the Hill Country with John and Irma Nelson, with a homebuilder's eye on what you can build.",
  alternates: { canonical: "/land" },
};

const image = {
  src: "/images/whispering-hills-lot.webp",
  alt: "Wooded Hill Country lot with cedar trees and tall grass",
  width: 1080,
  height: 1152,
};

export default function LandPage() {
  return (
    <>
      <TopicHero
        eyebrow="Land & acreage"
        headline="Land, lots, and room to build."
        image={image}
        imageAlt="Wooded Hill Country lot"
        primary={{ href: "/homes?type=Land", label: "See land for sale" }}
      >
        <p>
          Buying land is different from buying a house. What matters is what you can do with it: access, utilities,
          restrictions, and what it will cost to build.
        </p>
        <p>
          With John’s homebuilding and investing background, we help you look past the price per acre to the land’s
          real potential, whether you’re buying a Hill Country lot or selling acreage.
        </p>
      </TopicHero>

      <TopicGrid
        className="border-t border-line"
        eyebrow="How we help"
        headline="Buying, selling, and building on land."
        topics={land.topics}
      />

      <Container className="-mt-8 pb-16">
        <ArrowLink href="/listings" className="text-[15px]">
          See our current listings, including land
        </ArrowLink>
      </Container>

      <TopicPosts category="land" />

      <InquirySection defaultType="buy" />
    </>
  );
}
