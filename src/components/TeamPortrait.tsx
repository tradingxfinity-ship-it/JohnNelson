import Image from "next/image";
import { site } from "@/content/site";
import { Photo } from "./Photo";

/**
 * Portrait of Irma and John in an ivory panel. The portrait is capped at its
 * native width so the current small source file stays sharp.
 */
export function TeamPortrait({ priority = false, className = "" }: { priority?: boolean; className?: string }) {
  const portrait = site.images.teamPortrait;
  const maxWidth = portrait ? Math.min(portrait.width, 320) : 320;

  return (
    <figure className={`flex flex-col items-center justify-center rounded-md border border-line bg-ivory px-8 py-12 ${className}`}>
      {portrait ? (
        <Image
          src={portrait.src}
          alt={portrait.alt}
          width={portrait.width}
          height={portrait.height}
          priority={priority}
          sizes={`${maxWidth}px`}
          // Small source files gain nothing from resizing; serve them as-is
          unoptimized={portrait.width <= 480}
          style={{ maxWidth }}
          className="aspect-square w-full rounded-sm object-cover"
        />
      ) : (
        <Photo image={null} fallbackAlt="Portrait of Irma and John Nelson (photo coming soon)" sizes="320px" className="aspect-square w-full max-w-[320px]" />
      )}
      <figcaption className="mt-6 text-center">
        <span className="block text-lg font-medium text-navy">Irma and John Nelson</span>
        <span className="mt-1 block text-sm">{site.name} · San Antonio, Texas</span>
      </figcaption>
    </figure>
  );
}
