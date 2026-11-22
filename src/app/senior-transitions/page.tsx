import type { Metadata } from "next";
import { InquirySection } from "@/components/InquirySection";
import { TopicGrid, TopicHero, TopicSteps } from "@/components/TopicPage";
import { seniorTransitions } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Senior Living & Life Transitions",
  description:
    "Downsizing, aging in place, inherited homes, and helping a parent move in San Antonio. John and Irma Nelson explain your options and help you decide without pressure.",
  alternates: { canonical: "/senior-transitions" },
};

export default function SeniorTransitionsPage() {
  return (
    <>
      <TopicHero
        eyebrow="Senior living & life transitions"
        headline="Help with the moves that matter most."
        image={site.images.transitions}
        imageAlt="A single-story family home"
        primary={{ href: "/sell#contact", label: "What’s my home worth?" }}
      >
        <p>
          Some of the most important real estate decisions happen during life’s biggest changes. Preparing to retire,
          moving to a smaller home, managing an inherited property, or helping a parent move to a new living arrangement
          can be emotional as well as financial.
        </p>
        <p>
          We simplify the process, explain your options, and help you and your family make informed decisions without
          unnecessary pressure.
        </p>
      </TopicHero>

      <TopicGrid
        className="border-t border-line"
        eyebrow="How we help"
        headline="Every family’s situation is different."
        intro="Whatever is prompting the move, you’ll get honest answers, a clear plan, and a team that listens."
        topics={seniorTransitions.situations}
      />

      <TopicSteps headline="Working through it together" steps={seniorTransitions.steps} />

      <InquirySection defaultType="sell" />
    </>
  );
}
