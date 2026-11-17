import Image from "next/image";
import type { SiteImage } from "@/content/site";

/**
 * Renders a supplied photo, or a quiet placeholder of the same shape until the
 * real asset is added in src/content/site.ts.
 */
export function Photo({
  image,
  fallbackAlt,
  sizes,
  priority = false,
  className = "",
}: {
  image: SiteImage;
  fallbackAlt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (image) {
    return (
      <div className={`relative overflow-hidden rounded-md bg-ivory ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={fallbackAlt}
      data-placeholder="photo"
      className={`relative flex items-center justify-center overflow-hidden rounded-md border border-line bg-ivory ${className}`}
    >
      <HomeIllustration />
    </div>
  );
}

/** Line drawing of a Hill Country style home, used while photos are pending. */
function HomeIllustration() {
  return (
    <svg viewBox="0 0 240 160" className="w-3/5 max-w-[320px]" fill="none" aria-hidden>
      <g stroke="#14283F" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M30 140h180" />
        <path d="M44 140V82l46-34 46 34v58" />
        <path d="M34 89l56-41 56 41" />
        <path d="M136 140V96h64v44" />
        <path d="M128 99l40-24 40 24" />
        <path d="M78 140v-34h24v34" />
        <rect x="54" y="92" width="14" height="18" />
        <rect x="112" y="92" width="14" height="18" />
        <rect x="150" y="108" width="16" height="16" />
        <rect x="174" y="108" width="16" height="16" />
      </g>
      <g stroke="#B88A47" strokeWidth="1.5" strokeLinecap="round">
        <path d="M44 120h34M102 120h34" />
        <path d="M136 132h64" />
        <circle cx="196" cy="40" r="10" />
      </g>
    </svg>
  );
}
