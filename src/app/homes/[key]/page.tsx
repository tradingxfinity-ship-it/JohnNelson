import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InquirySection } from "@/components/InquirySection";
import { ListingGallery } from "@/components/ListingGallery";
import { ListingNotice } from "@/components/ListingNotice";
import { ArrowLink, ButtonLink, Container, Section } from "@/components/ui";
import { site } from "@/content/site";
import { formatPrice, getListing, listingFacts, listingPlace, listingTitle } from "@/lib/listings";

type Props = { params: Promise<{ key: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = await getListing(decodeURIComponent((await params).key));
  if (!found) return { title: "Home not found" };
  const l = found.listing;
  return {
    title: `${listingTitle(l)}, ${listingPlace(l)}`,
    description: `${formatPrice(l.ListPrice)} · ${listingFacts(l).join(" · ")} · ${listingPlace(l)}`,
    alternates: { canonical: `/homes/${encodeURIComponent(l.ListingKey)}` },
  };
}

export default async function ListingPage({ params }: Props) {
  const found = await getListing(decodeURIComponent((await params).key));
  if (!found) notFound();
  const { listing: l, source } = found;
  const title = listingTitle(l);
  const facts = [
    ["Price", formatPrice(l.ListPrice)],
    ["Bedrooms", l.BedroomsTotal],
    ["Bathrooms", l.BathroomsTotalInteger],
    ["Living area", l.LivingArea && `${l.LivingArea.toLocaleString("en-US")} sqft`],
    ["Lot", l.LotSizeAcres && `${l.LotSizeAcres} acres`],
    ["Year built", l.YearBuilt],
    ["Type", l.PropertyType === "Residential" ? "Home" : l.PropertyType],
    ["MLS #", l.ListingId],
  ].filter(([, v]) => v != null && v !== "" && v !== 0) as [string, string | number][];
  const note = `I’m interested in ${title}, ${listingPlace(l)}${l.ListingId ? ` (MLS #${l.ListingId})` : ""}.`;

  return (
    <>
      <Section className="pt-8! lg:pt-12!">
        <Container>
          <ArrowLink href={l.isOurs ? "/listings" : "/homes"} className="mb-6 text-sm [&>span]:order-first [&>span]:rotate-180">
            {l.isOurs ? "Our listings" : "Search results"}
          </ArrowLink>
          <ListingGallery photos={l.Media} title={title} />

          <div className="mt-10 grid gap-12 lg:grid-cols-[7fr_4fr] lg:gap-16">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">{title}</h1>
              <p className="mt-2 text-lg">{listingPlace(l)}</p>
              <p className="mt-4 text-3xl font-medium text-blue">{formatPrice(l.ListPrice)}</p>
              <p className="mt-2 flex flex-wrap gap-x-4 text-[15px] font-medium text-blue">
                {listingFacts(l).map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </p>

              {l.PublicRemarks && (
                <>
                  <h2 className="mt-10 text-xl font-medium">About this home</h2>
                  <p className="mt-3 whitespace-pre-line leading-relaxed">{l.PublicRemarks}</p>
                </>
              )}

              <h2 className="mt-10 text-xl font-medium">Facts</h2>
              <dl className="mt-3 grid grid-cols-2 border-t border-line sm:grid-cols-3">
                {facts.map(([k, v]) => (
                  <div key={k} className="border-b border-line py-3 pr-4">
                    <dt className="text-sm">{k}</dt>
                    <dd className="mt-0.5 font-medium text-blue">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className="h-fit rounded-lg border border-line p-6 lg:sticky lg:top-28">
              <h2 className="text-lg font-medium">Interested in this home?</h2>
              <p className="mt-2 text-[15px]">Irma and John can answer questions and set up a showing.</p>
              <ButtonLink href="#contact" className="mt-5 w-full">
                Ask about this home
              </ButtonLink>
              <a
                href={site.contact.phoneHref}
                className="mt-3 flex min-h-11 items-center justify-center text-[15px] font-medium text-blue underline-offset-4 hover:underline"
              >
                Call {site.contact.phoneDisplay}
              </a>
              {/* Listing brokerage and agent (MLS rules 18.2.12 and 18.3.4) */}
              <div className="mt-5 border-t border-line pt-4 text-sm">
                {l.ListOfficeName && <p>Listing courtesy of {l.ListOfficeName}</p>}
                {l.ListAgentFullName && <p>Listing agent: {l.ListAgentFullName}</p>}
                {l.ListOfficePhone && !l.isOurs && <p>Listing office: {l.ListOfficePhone}</p>}
              </div>
            </aside>
          </div>

          {source === "lera" && <ListingNotice />}
        </Container>
      </Section>

      <InquirySection defaultType="buy" defaultNotes={note} />
    </>
  );
}
