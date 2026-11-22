import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/lib/blog";

/** Renders inline **bold**, *italic*, and [links](url) as React elements (no raw HTML). */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={i++} className="font-medium text-blue">{m[1]}</strong>);
    else if (m[2]) out.push(<em key={i++}>{m[2]}</em>);
    else {
      const href = m[4];
      const cls = "font-medium text-blue underline underline-offset-4 hover:text-red";
      out.push(
        href.startsWith("/") || href.startsWith("#") ? (
          <Link key={i++} href={href} className={cls}>
            {m[3]}
          </Link>
        ) : /^https?:\/\//.test(href) ? (
          <a key={i++} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {m[3]}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          m[3]
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[17px] leading-[1.75]">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-12 text-2xl font-medium leading-snug first:mt-0 sm:text-[1.75rem]">
                {inline(b.text)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 text-xl font-medium">
                {inline(b.text)}
              </h3>
            );
          case "quote":
            return (
              <blockquote key={i} className="mt-6 border-l-2 border-red pl-5 text-lg text-blue">
                {inline(b.text)}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="mt-5 space-y-2 pl-5 [list-style:disc] marker:text-red">
                {b.items.map((it, j) => (
                  <li key={j} className="pl-1">
                    {inline(it)}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-5 space-y-2 pl-5 [list-style:decimal] marker:font-medium marker:text-red">
                {b.items.map((it, j) => (
                  <li key={j} className="pl-1">
                    {inline(it)}
                  </li>
                ))}
              </ol>
            );
          default:
            return (
              <p key={i} className="mt-5 first:mt-0">
                {inline(b.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
