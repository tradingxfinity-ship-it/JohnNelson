import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { SERVICE_PAGES } from "@/content/servicePages";

export const metadata: Metadata = {
  title: SERVICE_PAGES.sell.title,
  description:
    "Request a home valuation from Irma and John Nelson. Find out what your San Antonio property could sell for and plan your next move.",
  alternates: { canonical: "/sell" },
};

export default function SellPage() {
  return (
    <ServicePage type="sell" />
  );
}
