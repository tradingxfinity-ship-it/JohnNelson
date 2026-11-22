import Image from "next/image";
import { site } from "@/content/site";
import type { InquiryType } from "@/lib/inquiry";
import { InquiryForm } from "./InquiryForm";
import { Container, Section } from "./ui";

/**
 * Homepage inquiry block over a darkened photo. On large screens the section is
 * one screen tall and only the form scrolls, inside its own panel.
 */
export function InquirySection({ defaultType }: { defaultType?: InquiryType }) {
  return (
    <Section id="contact" className="relative isolate overflow-hidden bg-blue">
      {site.images.contact && (
        <Image
          src={site.images.contact.src}
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
      )}
      {/* Flat blue tint keeps text and the form readable over the photo */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-blue/80" />

      <Container className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-x-20">
        <div className="lg:sticky lg:top-28">
          <p className="mb-4 flex items-center gap-3 text-sm font-medium text-white/80">
            <span aria-hidden className="h-px w-8 bg-red-light" />
            Contact
          </p>
          <h2 className="text-3xl font-medium text-white sm:text-4xl">Tell us about your next move.</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">
            Whether you’re buying, selling, or renting, share a few details and Irma and John will follow up
            personally.
          </p>
          <ContactDetails inverse className="mt-10" />
        </div>
        <div className="rounded-md lg:max-h-[max(480px,calc(100dvh-280px))] lg:overflow-y-auto lg:overscroll-contain lg:[scrollbar-width:thin]">
          <InquiryForm defaultType={defaultType} />
        </div>
      </Container>
    </Section>
  );
}

export function ContactDetails({ className = "", inverse = false }: { className?: string; inverse?: boolean }) {
  const label = inverse ? "text-white/70" : "text-slate";
  const link = inverse ? "text-white" : "text-blue";
  return (
    <dl className={`space-y-5 border-t pt-8 text-[15px] ${inverse ? "border-white/20" : "border-line"} ${className}`}>
      <div>
        <dt className={`text-sm ${label}`}>Prefer to call?</dt>
        <dd className="mt-1">
          <a href={site.contact.phoneHref} className={`text-lg font-medium underline-offset-4 hover:underline ${link}`}>
            {site.contact.phoneDisplay}
          </a>
        </dd>
      </div>
      <div>
        <dt className={`text-sm ${label}`}>Email</dt>
        <dd className="mt-1">
          <a href={`mailto:${site.contact.email}`} className={`font-medium underline-offset-4 hover:underline ${link}`}>
            {site.contact.email}
          </a>
        </dd>
      </div>
    </dl>
  );
}
