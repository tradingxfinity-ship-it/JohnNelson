import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, formatDate, type Post } from "@/lib/blog";

/** A post in a list: cover photo, topic, title, summary, and date. The large version puts the photo beside the text. */
export function PostCard({ post, large = false, priority = false }: { post: Post; large?: boolean; priority?: boolean }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white ${
        large && post.cover ? "md:grid md:grid-cols-[6fr_5fr]" : ""
      }`}
    >
      {post.cover && (
        <div className={`relative overflow-hidden bg-cloud ${large ? "aspect-[16/10] md:aspect-auto md:min-h-[340px]" : "aspect-[16/10]"}`}>
          <Image
            src={post.cover.src}
            alt=""
            fill
            priority={priority}
            sizes={large ? "(min-width: 768px) 640px, 100vw" : "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {post.youtube && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-blue/85 px-3 py-1 text-xs font-medium text-white">
              <svg width="10" height="10" viewBox="0 0 14 14" aria-hidden fill="currentColor">
                <path d="M3 1.5v11l9-5.5z" />
              </svg>
              Video
            </span>
          )}
        </div>
      )}
      <div className={`flex flex-1 flex-col ${large ? "p-8 sm:p-10 md:justify-center" : "p-6"}`}>
        <p className="text-sm font-medium text-red">{CATEGORIES[post.category].label}</p>
        <h3 className={`mt-3 font-medium leading-snug ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          <Link
            href={`/blog/${post.slug}`}
            className="underline-offset-4 after:absolute after:inset-0 group-hover:underline focus-visible:underline"
          >
            {post.title}
          </Link>
        </h3>
        {post.description && <p className={`mt-3 flex-1 leading-relaxed ${large ? "text-lg md:flex-none" : "text-[15px]"}`}>{post.description}</p>}
        <p className="mt-5 text-sm">
          {formatDate(post.date)} · {post.minutes} min read
          {post.youtube && !post.cover && " · Video"}
        </p>
      </div>
    </article>
  );
}
