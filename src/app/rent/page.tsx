import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { SERVICE_PAGES } from "@/content/servicePages";

export const metadata: Metadata = {
  title: SERVICE_PAGES.rent.title,
  description:
    "Looking for a house, townhome, or apartment to rent in San Antonio? Tell Irma and John Nelson your areas, budget, and move-in date.",
  alternates: { canonical: "/rent" },
};

export default function RentPage() {
  return (
    <ServicePage type="rent" />
  );
}
