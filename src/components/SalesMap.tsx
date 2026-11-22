"use client";

import dynamic from "next/dynamic";
import { salePins, salesAsOf, totalSold } from "@/content/sales";
import { site } from "@/content/site";
import { Container, Eyebrow, Section } from "./ui";

const MapView = dynamic(() => import("./SalesMapClient"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-cloud" />,
});

/** “Homes we’ve sold” section: a map of recent sales and current listings. */
export function SalesMap() {
  const soldShown = salePins.filter((p) => p.status === "sold").length;
  const places = [...new Set(salePins.map((p) => p.place).filter(Boolean))];

  return (
    <Section className="border-t border-line">
      <Container className="grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-16">
        <div className="flex flex-col">
          <Eyebrow>Sales map</Eyebrow>
          <h2 className="text-3xl font-medium leading-tight sm:text-4xl">Homes we’ve sold across the area.</h2>
          <p className="mt-5 text-lg leading-relaxed">
            Zillow shows {totalSold} sales for Irma and John, from San Antonio neighborhoods to the Hill Country. This
            map shows {soldShown} recent sales and the team’s current listings.
          </p>
          <ul className="mt-8 space-y-3 border-t border-line pt-6 text-[15px]">
            <li className="flex items-center gap-3">
              <span aria-hidden className="h-3.5 w-3.5 rounded-full border-2 border-white bg-blue outline outline-1 outline-line" />
              Sold
            </li>
            <li className="flex items-center gap-3">
              <span aria-hidden className="h-3.5 w-3.5 rounded-full border-2 border-white bg-red outline outline-1 outline-line" />
              For sale
            </li>
          </ul>
          <p className="mt-6 text-sm">
            Pins show approximate locations. Updated {salesAsOf}.
          </p>
          {site.zillow.profileUrl && (
            <a
              href={`${site.zillow.profileUrl}#listings-and-sales`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-medium text-blue underline-offset-4 hover:underline"
            >
              See all sales on Zillow
              <span aria-hidden>↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>

        <div
          role="region"
          aria-label={`Map of ${soldShown} recent sales and current listings${places.length ? ` in areas including ${places.join(", ")}` : ""}`}
          className="relative isolate h-[380px] overflow-hidden rounded-lg rounded-tr-[clamp(64px,14vw,180px)] border border-line sm:h-[460px] lg:h-[540px]"
        >
          <MapView />
        </div>
      </Container>
    </Section>
  );
}
