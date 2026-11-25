import type { ReactNode } from "react";
import type { SiteImage } from "@/content/site";
import { CONTACT_HREF } from "@/content/site";
import type { Topic } from "@/content/services";
import { Photo } from "./Photo";
import { ButtonLink, Container, Eyebrow, Section } from "./ui";

/** Intro for a service page: headline and text beside a photo, with the main actions. */
export function TopicHero({
  eyebrow,
  headline,
  children,
  image,
  imageAlt,
  caption,
  primary,
}: {
  eyebrow: string;
  headline: string;
  children: ReactNode;
  image: SiteImage;
  imageAlt: string;
  caption?: string;
  primary: { href: string; label: string };
}) {
  return (
    <section className="pb-16 pt-10 lg:pb-24 lg:pt-16">
      <Container className="grid items-center gap-10 lg:grid-cols-[6fr_5fr] lg:gap-16">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.75rem]">
            {headline}
          </h1>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed">{children}</div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            <ButtonLink href={CONTACT_HREF} variant="secondary">
              Schedule a consultation
            </ButtonLink>
          </div>
        </div>
        <Photo
          image={image}
          fallbackAlt={imageAlt}
          caption={caption}
          shape="archRight"
          priority
          sizes="(min-width: 1248px) 520px, (min-width: 1024px) 42vw, 100vw"
          className="aspect-[4/3] w-full"
        />
      </Container>
    </section>
  );
}

/** A titled grid of short topics. */
export function TopicGrid({
  id,
  eyebrow,
  headline,
  intro,
  topics,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  headline: string;
  intro?: string;
  topics: Topic[];
  className?: string;
}) {
  return (
    <Section id={id} className={className}>
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-[1.75rem] font-medium leading-tight sm:text-4xl">{headline}</h2>
          {intro && <p className="mt-4 leading-relaxed">{intro}</p>}
        </div>
        <ul
          className={`mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 ${
            topics.length % 3 === 0 ? "lg:grid-cols-3" : ""
          }`}
        >
          {topics.map((t) => (
            <li key={t.title} className="bg-white p-7">
              <h3 className="text-xl font-medium">{t.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed">{t.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** Numbered steps on an off-white band. */
export function TopicSteps({ headline, steps }: { headline: string; steps: Topic[] }) {
  return (
    <Section className="bg-cloud">
      <Container>
        <h2 className="max-w-xl text-[1.75rem] font-medium leading-tight sm:text-3xl">{headline}</h2>
        <ol className="mt-10 grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-red pt-6">
              <span className="text-sm font-medium text-red">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-medium">{step.title}</h3>
              <p className="mt-3 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
