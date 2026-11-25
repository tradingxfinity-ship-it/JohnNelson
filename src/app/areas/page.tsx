import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InquirySection } from "@/components/InquirySection";
import { Container, Eyebrow, Section } from "@/components/ui";
import { areas, publishedAreas } from "@/content/areas";

export const metadata: Metadata = {
  title: "Areas We Serve near San Antonio",
  description:
    "San Antonio, Hill Country, and Canyon Lake areas where Irma and John Nelson of Get It Sold Realty help people buy and sell homes and land.",
  alternates: { canonical: "/areas" },
  ...(publishedAreas.length ? {} : { robots: { index: false, follow: false } }),
};

export default function AreasPage() {
  // Until the first page is approved, list the drafts so they can be reviewed
  const shown = publishedAreas.length ? publishedAreas : areas;

  return (
    <>
      <Section className="pt-10! lg:pt-16!">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Areas we serve</Eyebrow>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              San Antonio, the Hill Country, and Canyon Lake.
            </h1>
            <p className="mt-5 text-lg leading-relaxed">
              Every area has its own rules, costs, and things to check. Choose one to see what Irma and John look at
              before you buy or sell there.
            </p>
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((a, i) => (
              <li key={a.slug} className="group relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-cloud">
                  <Image
                    src={a.image.src}
                    alt=""
                    fill
                    priority={i < 3}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <h2 className="mt-4 text-xl font-medium">
                  <Link href={`/areas/${a.slug}`} className="underline-offset-4 after:absolute after:inset-0 group-hover:underline focus-visible:underline">
                    {a.name}
                  </Link>
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed">{a.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <InquirySection />
    </>
  );
}
