import { getPosts, type Category } from "@/lib/blog";
import { PostCard } from "./PostCard";
import { ArrowLink, Container, Eyebrow, Section } from "./ui";

/** Blog posts on one topic, shown on that topic's specialty page. Renders nothing until there are posts. */
export function TopicPosts({ category }: { category: Category }) {
  const posts = getPosts().filter((p) => p.category === category).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section className="border-t border-line">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Guides</Eyebrow>
            <h2 className="text-[1.75rem] font-medium leading-tight sm:text-3xl">From our blog</h2>
          </div>
          <ArrowLink href={`/blog?topic=${category}`} className="text-[15px]">
            More on this topic
          </ArrowLink>
        </div>
        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
