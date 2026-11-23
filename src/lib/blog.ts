import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Blog posts live as Markdown files in /content/blog. Each file starts with a
 * short header between --- lines:
 *
 *   ---
 *   title: Post title
 *   description: One or two sentences for search results and the post list
 *   date: 2026-11-22
 *   category: seniors            (one of the keys in CATEGORIES below)
 *   cover: /images/photo.webp    (optional: cover photo from /public)
 *   coverAlt: What the photo shows
 *   youtube: dQw4w9WgXcQ         (optional: a YouTube video ID to embed)
 *   draft: true                  (optional: hides the post)
 *   ---
 *
 * The body supports ## and ### headings, paragraphs, - and 1. lists, > quotes,
 * **bold**, *italic*, and [links](/path).
 */

export const CATEGORIES = {
  seniors: { label: "Seniors & downsizing", href: "/senior-transitions" },
  veterans: { label: "Veterans & military", href: "/veterans" },
  land: { label: "Land & acreage", href: "/land" },
  luxury: { label: "Luxury homes", href: "/luxury" },
  "building-investing": { label: "Building & investing", href: "/building-investing" },
  buying: { label: "Buying", href: "/buy" },
  selling: { label: "Selling", href: "/sell" },
} as const;

export type Category = keyof typeof CATEGORIES;

export type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  youtube?: string;
  /** Cover photo path in /public, with its description */
  cover?: { src: string; alt: string };
  author: string;
  blocks: Block[];
  minutes: number;
};

const DIR = path.join(process.cwd(), "content", "blog");

function parse(slug: string, raw: string): (Post & { draft: boolean }) | null {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return null;
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  if (!meta.title || !meta.date || !(meta.category in CATEGORIES)) return null;
  const blocks = toBlocks(m[2]);
  const words = m[2].split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: meta.title,
    description: meta.description ?? "",
    date: meta.date,
    category: meta.category as Category,
    youtube: meta.youtube || undefined,
    cover: meta.cover ? { src: meta.cover, alt: meta.coverAlt ?? "" } : undefined,
    author: meta.author || "The Nelson Team",
    blocks,
    minutes: Math.max(1, Math.round(words / 220)),
    draft: meta.draft === "true",
  };
}

function toBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  const paras = body.replace(/\r\n/g, "\n").split(/\n{2,}/);
  for (const chunk of paras) {
    const lines = chunk.split("\n").filter((l) => l.trim());
    if (!lines.length) continue;
    const first = lines[0];
    if (first.startsWith("### ")) blocks.push({ type: "h3", text: first.slice(4).trim() });
    else if (first.startsWith("## ")) blocks.push({ type: "h2", text: first.slice(3).trim() });
    else if (lines.every((l) => /^\s*[-*] /.test(l))) blocks.push({ type: "ul", items: lines.map((l) => l.replace(/^\s*[-*] /, "").trim()) });
    else if (lines.every((l) => /^\s*\d+\. /.test(l))) blocks.push({ type: "ol", items: lines.map((l) => l.replace(/^\s*\d+\. /, "").trim()) });
    else if (lines.every((l) => l.startsWith(">"))) blocks.push({ type: "quote", text: lines.map((l) => l.replace(/^>\s?/, "")).join(" ") });
    else blocks.push({ type: "p", text: lines.join(" ") });
    // A heading followed directly by text in the same chunk
    if (/^#{2,3} /.test(first) && lines.length > 1) blocks.push({ type: "p", text: lines.slice(1).join(" ") });
  }
  return blocks;
}

/** Published posts, newest first. */
export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.replace(/\.md$/, ""), fs.readFileSync(path.join(DIR, f), "utf8")))
    .filter((p): p is Post & { draft: boolean } => p !== null && !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
