import { site } from "@/content/site";
import type { InquiryType } from "@/lib/inquiry";
import { InquiryForm } from "./InquiryForm";
import { Container, Eyebrow, Section } from "./ui";

/** Homepage inquiry block: a short invitation beside the shared form. */
export function InquirySection({ defaultType }: { defaultType?: InquiryType }) {
  return (
    <Section id="contact" className="border-t border-line bg-ivory">
      <Container className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:grid-rows-[auto_1fr] lg:gap-x-20">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h2 className="text-3xl font-medium sm:text-4xl">Tell us about your next move.</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed">
            Whether you’re buying, selling, or renting, share a few details and Irma and John will follow up
            personally.
          </p>
        </div>
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <InquiryForm defaultType={defaultType} />
        </div>
        <ContactDetails className="self-start" />
      </Container>
    </Section>
  );
}

export function ContactDetails({ className = "" }: { className?: string }) {
  return (
    <dl className={`space-y-5 border-t border-line pt-8 text-[15px] ${className}`}>
      <div>
        <dt className="text-sm text-slate">Prefer to call?</dt>
        <dd className="mt-1">
          <a href={site.contact.phoneHref} className="text-lg font-medium text-navy underline-offset-4 hover:underline">
            {site.contact.phoneDisplay}
          </a>
        </dd>
      </div>
      <div>
        <dt className="text-sm text-slate">Email</dt>
        <dd className="mt-1">
          <a href={`mailto:${site.contact.email}`} className="font-medium text-navy underline-offset-4 hover:underline">
            {site.contact.email}
          </a>
        </dd>
      </div>
    </dl>
  );
}
