import type { ReactNode } from "react";
import type { SiteImage } from "@/content/site";
import type { InquiryType } from "@/lib/inquiry";
import { ContactDetails } from "./InquirySection";
import { InquiryForm } from "./InquiryForm";
import { Photo } from "./Photo";
import { Container, Eyebrow, Section } from "./ui";

/** Shared layout for the Buy, Sell, and Rent pages: intro beside the inquiry form, then supporting notes. */
export function ServicePage({
  type,
  eyebrow,
  headline,
  intro,
  image,
  imageAlt,
  steps,
  children,
}: {
  type: InquiryType;
  eyebrow: string;
  headline: string;
  intro: string;
  image: SiteImage;
  imageAlt: string;
  steps: { title: string; body: string }[];
  children?: ReactNode;
}) {
  return (
    <>
      <section id="contact" className="pb-20 pt-12 lg:pb-26 lg:pt-20">
        <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="text-4xl font-medium leading-[1.08] sm:text-5xl">{headline}</h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed">{intro}</p>
            {image && <Photo image={image} fallbackAlt={imageAlt} sizes="(min-width: 1024px) 420px, 100vw" className="mt-10 aspect-[4/3]" />}
            <ContactDetails className="mt-10 hidden lg:block" />
          </div>
          <InquiryForm defaultType={type} />
        </Container>
      </section>

      <Section className="border-t border-line bg-ivory">
        <Container>
          <h2 className="max-w-xl text-3xl font-medium">What to expect</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="border-t border-brass pt-6">
                <span className="text-sm font-medium text-brass">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-medium">{step.title}</h3>
                <p className="mt-3 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
          {children}
        </Container>
      </Section>
    </>
  );
}
