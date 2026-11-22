"use client";

import { useState } from "react";
import { SERVICE_PAGES } from "@/content/servicePages";
import { site } from "@/content/site";
import type { InquiryType } from "@/lib/inquiry";
import { ContactDetails } from "./InquirySection";
import { InquiryForm } from "./InquiryForm";
import { Photo } from "./Photo";
import { Container, Eyebrow, Section } from "./ui";

/**
 * Shared layout for the Buy, Sell, and Rent pages: intro beside the inquiry
 * form, then what to expect. Choosing Buy, Sell, or Rent in the form switches
 * the page's text to match and updates the address (e.g. /buy → /sell).
 */
export function ServicePage({ type }: { type: InquiryType }) {
  const [current, setCurrent] = useState<InquiryType>(type);
  const copy = SERVICE_PAGES[current];

  const onTypeChange = (t: InquiryType) => {
    setCurrent(t);
    // Keep the address, menu highlight, and back button in step without reloading the form
    window.history.replaceState(null, "", `/${t}${window.location.hash}`);
    document.title = `${SERVICE_PAGES[t].title} | ${site.name}`;
  };

  return (
    <>
      <section id="contact" className="pb-20 pt-12 lg:pb-26 lg:pt-20">
        <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h1 className="text-4xl font-medium leading-[1.08] sm:text-5xl" aria-live="polite">
              {copy.headline}
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed">{copy.intro}</p>
            {copy.image && (
              <Photo
                key={current}
                image={copy.image}
                fallbackAlt={copy.imageAlt}
                shape="arch"
                sizes="(min-width: 1024px) 420px, 100vw"
                className="mt-10 aspect-[4/3]"
              />
            )}
            <ContactDetails className="mt-10 hidden lg:block" />
          </div>
          <InquiryForm defaultType={type} onTypeChange={onTypeChange} />
        </Container>
      </section>

      <Section className="border-t border-line bg-cloud">
        <Container>
          <h2 className="max-w-xl text-3xl font-medium">What to expect</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {copy.steps.map((step, i) => (
              <li key={step.title} className="border-t border-red pt-6">
                <span className="text-sm font-medium text-red">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-medium">{step.title}</h3>
                <p className="mt-3 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
