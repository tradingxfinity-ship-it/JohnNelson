import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Sell Your Home in San Antonio",
  description:
    "Request a home valuation from Irma and John Nelson. Find out what your San Antonio property could sell for and plan your next move.",
  alternates: { canonical: "/sell" },
};

export default function SellPage() {
  return (
    <ServicePage
      type="sell"
      eyebrow="Selling"
      headline="Sell your home with a local San Antonio team."
      intro="Request a home valuation and Irma and John will follow up to talk about your property, what it could sell for, and the timing that works for you."
      image={site.images.sell}
      imageAlt="A San Antonio home recently sold"
      steps={[
        { title: "Request a valuation", body: "Share your property address, property type, and when you’re thinking of selling." },
        { title: "Get a personal follow-up", body: "Irma and John contact you to learn about your home and review its value with you." },
        { title: "Plan your sale", body: "Decide on pricing, preparation, and timing with a team that knows the local market." },
      ]}
    />
  );
}
