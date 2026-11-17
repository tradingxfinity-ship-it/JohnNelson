import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { StatsStrip } from "@/components/StatsStrip";
import { TeamByline } from "@/components/TeamByline";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { CONTACT_HREF, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Irma and John Nelson",
  description:
    "Meet Irma and John Nelson, the team behind Get It Sold Realty. 19 years helping people buy, sell, and rent in San Antonio, including military families and veterans.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="pb-16 pt-12 lg:pb-24 lg:pt-20">
        <Container className="grid items-center gap-12 lg:grid-cols-[6fr_5fr] lg:gap-20">
          <div>
            <Eyebrow>About us</Eyebrow>
            <h1 className="text-4xl font-medium leading-[1.08] sm:text-5xl">
              Meet Irma and John Nelson, the team behind Get It Sold Realty.
            </h1>
            <TeamByline className="mt-8" />
            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed">
              <p>
                Irma and John Nelson are a real estate couple based in San Antonio. Through Get It Sold
                Realty, they help people buy, sell, and rent homes, townhomes, and apartments across the area.
              </p>
              <p>
                Over 19 years, they have sold more than 290 homes and closed over $100 million in real estate sales.
                Clients work directly with Irma and John, who keep communication honest and stay hands-on through
                every step of the move.
              </p>
              <p>
                John is the team’s broker and owner. The team works with buyers and sellers, offers property management
                and notary services, and speaks {site.languages.join(" and ")}.
              </p>
            </div>
          </div>
          <Photo
            image={site.images.aboutHero}
            fallbackAlt=""
            shape="archRight"
            caption="Get It Sold Realty"
            priority
            sizes="(min-width: 1248px) 480px, (min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/3] w-full lg:aspect-[4/5]"
          />
        </Container>
      </section>

      <StatsStrip />

      <Section className="bg-ivory">
        <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <Eyebrow>Military families and veterans</Eyebrow>
            <h2 className="text-3xl font-medium leading-tight sm:text-4xl">Helping military families make their next move.</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              Irma and John work with service members, veterans, and their families moving to, from, and within the San
              Antonio area. They help with relocation planning, coordinating search and move-in timelines, and finding a
              home in the right part of town.
            </p>
            <p>
              Whether you’re buying, selling, or renting, you’ll get the same direct communication and hands-on guidance.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pb-0 lg:pb-0">
        <Container className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <Eyebrow>Service areas</Eyebrow>
            <h2 className="text-3xl font-medium leading-tight sm:text-4xl">Where we work.</h2>
            <p className="mt-5 text-lg leading-relaxed">
              Irma and John help clients across San Antonio and the surrounding communities.
            </p>
          </div>
          <ul className="grid grid-cols-2 border-t border-line sm:grid-cols-3">
            {site.serviceAreas.map((area) => (
              <li key={area} className="border-b border-line py-4 text-lg text-navy">
                {area}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <section className="pt-20 lg:pt-26">
        <Container className="grid gap-4 sm:grid-cols-[2fr_1fr] lg:gap-6">
          {site.images.aboutGallery.map((img, i) => (
            <Photo
              key={img.src}
              image={img}
              fallbackAlt=""
              shape="arch"
              sizes={i === 0 ? "(min-width: 1248px) 800px, (min-width: 640px) 66vw, 100vw" : "(min-width: 1248px) 400px, (min-width: 640px) 33vw, 100vw"}
              className="aspect-[4/3] w-full sm:aspect-auto sm:h-[clamp(280px,36vw,460px)]"
            />
          ))}
        </Container>
      </section>

      <Section>
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-medium sm:text-4xl">Ready to talk about your move?</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Share a few details and Irma and John will be in touch, or call {site.contact.phoneDisplay}.
            </p>
          </div>
          <ButtonLink href={CONTACT_HREF} className="w-full sm:w-auto">
            Talk to Irma and John
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}
