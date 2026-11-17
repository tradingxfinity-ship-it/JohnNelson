import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Buy a Home in San Antonio",
  description:
    "Find a home or townhome in San Antonio with Irma and John Nelson. Share your preferred areas, budget, and timeline to get started.",
  alternates: { canonical: "/buy" },
};

export default function BuyPage() {
  return (
    <ServicePage
      type="buy"
      eyebrow="Buying"
      headline="Find a home in San Antonio."
      intro="Tell us where you’d like to live, what you want to spend, and when you hope to move. Irma and John will follow up to talk through your search."
      image={site.images.buy}
      imageAlt="A San Antonio home for sale"
      steps={[
        { title: "Share what you need", body: "Send your preferred areas, budget range, property type, and timeline." },
        { title: "Talk it through", body: "Irma and John reach out to understand your plans and answer your questions." },
        { title: "Start your search", body: "Get local guidance as you tour homes, compare options, and make an offer." },
      ]}
    />
  );
}
