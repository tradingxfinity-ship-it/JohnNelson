import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faqs } from "@/components/Faqs";
import { InquirySection } from "@/components/InquirySection";
import { JsonLd } from "@/components/JsonLd";
import { ListingCard } from "@/components/ListingCard";
import { ListingNotice } from "@/components/ListingNotice";
import { TopicGrid, TopicHero } from "@/components/TopicPage";
import { ArrowLink, Container, Eyebrow, Section } from "@/components/ui";
import { areas, getArea } from "@/content/areas";
import { portfolio } from "@/content/portfolio";
import { ourListings } from "@/lib/listings";
import { breadcrumbs } from "@/lib/structuredData";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = getArea((await params).slug);
  if (!area) return { title: "Area not found" };
  return {
    title: area.title,
    description: area.description,
    alternates: { canonical: `/areas/${area.slug}` },
    ...(area.published ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function AreaPage({ params }: Props) {
  const area = getArea((await params).slug);
  if (!area) notFound();

  const soldHere = portfolio.filter((h) => area.zips.includes(h.zip));
  const results = await ourListings().catch(() => null);
  const listings = results?.listings.filter((l) => area.listingCities.includes(l.City)) ?? [];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas we serve", path: "/areas" },
    { name: area.name, path: `/areas/${area.slug}` },
  ];

  return (
    <>
      {area.published ? (
        <JsonLd data={breadcrumbs(crumbs)} />
      ) : (
        <p className="bg-cloud px-5 py-3 text-center text-sm font-medium text-blue">
          Draft for Irma and John to review. This page isn’t linked on the site or shown to Google yet.
        </p>
      )}

      <Container className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-x-2 text-sm">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {i < crumbs.length - 1 ? (
                  <Link href={c.path} className="text-blue underline-offset-4 hover:underline">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page">{c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </Container>

      <TopicHero
        eyebrow={`${area.name}, Texas`}
        headline={area.headline}
        image={area.image}
        imageAlt={area.image.alt}
        caption={area.caption}
        primary={{ href: `/homes?area=${encodeURIComponent(area.name)}`, label: "Search homes" }}
      >
        {area.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </TopicHero>

      <Section className="border-t border-line bg-cloud">
        <Container className="grid gap-8 lg:grid-cols-[4fr_7fr] lg:gap-16">
          <div>
            <Eyebrow>{area.name}</Eyebrow>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-4xl">{area.about.headline}</h2>
          </div>
          <div className="max-w-2xl space-y-4 text-lg leading-relaxed">
            {area.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      <TopicGrid eyebrow="Before you buy or sell" headline={`What to check in ${area.name}.`} topics={area.checks} />

      {results && listings.length > 0 && (
        <Section className="border-t border-line">
          <Container>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-4xl">Our listings in {area.name}</h2>
            <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((l) => (
                <li key={l.ListingKey}>
                  <ListingCard listing={l} />
                </li>
              ))}
            </ul>
            {results.source === "lera" && <ListingNotice fetchedAt={results.fetchedAt} />}
          </Container>
        </Section>
      )}

      {soldHere.length > 0 && (
        <Section className="border-t border-line">
          <Container>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <Eyebrow>Our portfolio</Eyebrow>
                <h2 className="text-[1.75rem] font-medium leading-tight sm:text-4xl">Sold in and near {area.name}</h2>
              </div>
              <ArrowLink href="/portfolio" className="text-[15px]">
                See the full portfolio
              </ArrowLink>
            </div>
            <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {soldHere.slice(0, 6).map((h) => (
                <li key={h.src}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-cloud">
                    <Image
                      src={h.src}
                      alt={`${h.details.includes("Land") ? "Land" : "Home"} sold in ${h.city}, TX ${h.zip}`}
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-4 text-lg font-medium text-blue">
                    {h.city}, TX {h.zip}
                  </p>
                  <p className="mt-0.5 text-[15px]">
                    {["Sold " + h.sold, ...h.details.filter((d) => d !== "0 ba")].join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Faqs
        className="border-t border-line bg-cloud"
        headline={`Questions about ${area.name}.`}
        faqs={area.faqs}
        note="General information, not legal, tax, or lending advice. Rules change, so confirm details for a specific property."
      />

      <Section className="py-14! lg:py-16!">
        <Container className="flex flex-wrap gap-x-8 gap-y-4">
          {area.related.map((r) => (
            <ArrowLink key={r.href} href={r.href}>
              {r.label}
            </ArrowLink>
          ))}
          <ArrowLink href="/areas">All areas we serve</ArrowLink>
        </Container>
      </Section>

      <InquirySection defaultNotes={`I’m interested in ${area.name}.`} />
    </>
  );
}
