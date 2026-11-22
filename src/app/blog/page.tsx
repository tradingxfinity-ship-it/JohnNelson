import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { Container, Eyebrow, Section } from "@/components/ui";
import { CATEGORIES, getPosts, type Category } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog: Real Estate Guides for San Antonio",
  description:
    "Guides from The Nelson Team on downsizing, military moves, buying land, selling, remodeling, and investing in San Antonio and the Hill Country.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { topic } = await searchParams;
  const all = getPosts();
  const active = typeof topic === "string" && topic in CATEGORIES ? (topic as Category) : null;
  const posts = active ? all.filter((p) => p.category === active) : all;
  // Only offer topics that have posts
  const topics = (Object.keys(CATEGORIES) as Category[]).filter((c) => all.some((p) => p.category === c));
  const [lead, ...rest] = posts;

  const chip = (selected: boolean) =>
    `inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
      selected ? "border-blue bg-blue text-white" : "border-line text-blue hover:border-blue"
    }`;

  return (
    <Section className="pt-10! lg:pt-16!">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">Guides for your next move.</h1>
          <p className="mt-5 text-lg leading-relaxed">
            Practical advice from John and Irma Nelson on buying, selling, downsizing, military moves, land, and
            investing around San Antonio.
          </p>
        </div>

        {topics.length > 1 && (
          <nav aria-label="Blog topics" className="mt-8">
            <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              <li className="shrink-0">
                <Link href="/blog" aria-current={!active ? "page" : undefined} className={chip(!active)}>
                  All topics
                </Link>
              </li>
              {topics.map((c) => (
                <li key={c} className="shrink-0">
                  <Link href={`/blog?topic=${c}`} aria-current={active === c ? "page" : undefined} className={chip(active === c)}>
                    {CATEGORIES[c].label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {lead ? (
          <>
            <div className="mt-10">
              <PostCard post={lead} large />
            </div>
            {rest.length > 0 && (
              <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <li key={p.slug}>
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="mt-10 rounded-lg bg-cloud p-8 text-lg text-blue">New posts are on the way. Check back soon.</p>
        )}
      </Container>
    </Section>
  );
}
