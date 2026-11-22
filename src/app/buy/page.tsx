import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { SERVICE_PAGES } from "@/content/servicePages";

export const metadata: Metadata = {
  title: SERVICE_PAGES.buy.title,
  description:
    "Find a home or townhome in San Antonio with Irma and John Nelson. Share your preferred areas, budget, and timeline to get started.",
  alternates: { canonical: "/buy" },
};

export default function BuyPage() {
  return (
    <ServicePage type="buy" />
  );
}
