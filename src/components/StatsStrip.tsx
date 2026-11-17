import { site } from "@/content/site";
import { Container } from "./ui";

export function StatsStrip({ className = "" }: { className?: string }) {
  return (
    <section aria-label="Sales and experience" className={`bg-navy ${className}`}>
      <Container>
        <dl className="grid divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {site.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1 py-7 sm:px-8 sm:py-10 sm:first:pl-0 lg:px-12">
              <dt className="text-[15px] text-white/70">{stat.label}</dt>
              <dd className="text-4xl font-medium tracking-[-0.03em] text-white lg:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
