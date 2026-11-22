import Link from "next/link";
import { CATEGORIES, formatDate, type Post } from "@/lib/blog";

/** A post in a list: topic, title, summary, and date. */
export function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <article className={`group relative flex h-full flex-col rounded-lg border border-line bg-white ${large ? "p-8 sm:p-10" : "p-7"}`}>
      <p className="text-sm font-medium text-red">{CATEGORIES[post.category].label}</p>
      <h3 className={`mt-3 font-medium leading-snug ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
        <Link
          href={`/blog/${post.slug}`}
          className="underline-offset-4 after:absolute after:inset-0 group-hover:underline focus-visible:underline"
        >
          {post.title}
        </Link>
      </h3>
      {post.description && <p className={`mt-3 flex-1 leading-relaxed ${large ? "text-lg" : "text-[15px]"}`}>{post.description}</p>}
      <p className="mt-5 text-sm">
        {formatDate(post.date)} · {post.minutes} min read
        {post.youtube && " · Video"}
      </p>
    </article>
  );
}
