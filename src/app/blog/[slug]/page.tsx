import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { PostCard } from "@/components/PostCard";
import { ArrowLink, ButtonLink, Container, Section } from "@/components/ui";
import { CONTACT_HREF, site } from "@/content/site";
import { CATEGORIES, formatDate, getPost, getPosts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      ...(post.cover ? { images: [{ url: post.cover.src, alt: post.cover.alt }] } : {}),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const topic = CATEGORIES[post.category];
  const related = getPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);

  // Structured data so search engines understand the article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    ...(post.cover ? { image: post.cover.src } : {}),
    author: { "@type": "Organization", name: `${site.brokerage.team}, ${site.name}` },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <Section className="pt-8! lg:pt-12!">
        <Container>
          <article className="mx-auto max-w-[720px]">
            <ArrowLink href="/blog" className="text-sm [&>span]:order-first [&>span]:rotate-180">
              All posts
            </ArrowLink>
            <p className="mt-8 text-sm font-medium">
              <Link href={`/blog?topic=${post.category}`} className="text-red underline-offset-4 hover:underline">
                {topic.label}
              </Link>
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">{post.title}</h1>
            {post.description && <p className="mt-5 text-xl leading-relaxed">{post.description}</p>}
            <p className="mt-6 border-b border-line pb-6 text-sm">
              {post.author} · {formatDate(post.date)} · {post.minutes} min read
            </p>

            {post.cover && (
              <figure className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg bg-cloud sm:-mx-6 lg:-mx-16">
                <Image src={post.cover.src} alt={post.cover.alt} fill priority sizes="(min-width: 1024px) 860px, 100vw" className="object-cover" />
              </figure>
            )}

            {post.youtube && (
              <div className="mt-8 aspect-video overflow-hidden rounded-lg bg-blue">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(post.youtube)}`}
                  title={`Video: ${post.title}`}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            )}

            <div className="mt-8">
              <Markdown blocks={post.blocks} />
            </div>

            <aside className="mt-14 rounded-lg bg-blue p-7 text-white sm:p-9">
              <h2 className="text-2xl font-medium text-white">Have a question about your situation?</h2>
              <p className="mt-3 leading-relaxed text-white/80">
                Irma and John are happy to talk it through, with no pressure. Call{" "}
                <a href={site.contact.phoneHref} className="font-medium text-white underline underline-offset-4">
                  {site.contact.phoneDisplay}
                </a>{" "}
                or send a message.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={CONTACT_HREF} variant="inverse">
                  Schedule a consultation
                </ButtonLink>
                <ArrowLink href={topic.href} className="min-h-12 text-white! sm:px-3">
                  {topic.label}
                </ArrowLink>
              </div>
            </aside>
          </article>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section className="border-t border-line bg-cloud">
          <Container>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-3xl">More from the blog</h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
