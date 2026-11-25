import { Container, Eyebrow, Section } from "./ui";

export type Faq = { q: string; a: string };

/** Common questions that open and close. The answers stay in the page for search engines. */
export function Faqs({ headline, faqs, note, className = "" }: { headline: string; faqs: Faq[]; note?: string; className?: string }) {
  return (
    <Section className={className}>
      <Container className="grid gap-10 lg:grid-cols-[4fr_7fr] lg:gap-16">
        <div>
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="text-[1.75rem] font-medium leading-tight sm:text-4xl">{headline}</h2>
          {note && <p className="mt-4 text-sm leading-relaxed">{note}</p>}
        </div>
        <div className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-medium text-blue [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="shrink-0 text-2xl font-normal leading-none text-red transition-transform duration-150 group-open:rotate-45 motion-reduce:transition-none">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
