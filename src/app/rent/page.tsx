import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Find a Rental in San Antonio",
  description:
    "Looking for a house, townhome, or apartment to rent in San Antonio? Tell Irma and John Nelson your areas, budget, and move-in date.",
  alternates: { canonical: "/rent" },
};

export default function RentPage() {
  return (
    <ServicePage
      type="rent"
      eyebrow="Renting"
      headline="Find a rental that fits your plans."
      intro="Whether you need a house, townhome, or apartment, tell us where you want to live, your monthly budget, and when you need to move in."
      image={site.images.rent}
      imageAlt="A San Antonio rental home"
      steps={[
        { title: "Tell us what you need", body: "Share your preferred areas, monthly budget, property type, and move-in date." },
        { title: "Narrow your search", body: "Irma and John follow up to help you focus on rentals that match your plans." },
        { title: "Move in on time", body: "Get help keeping your search on track for the date you need to move." },
      ]}
    />
  );
}
