import Image from "next/image";
import type { SiteImage } from "@/content/site";

const shapes = {
  rounded: "rounded-lg",
  /** Large curve on the top-left corner */
  arch: "rounded-lg rounded-tl-[clamp(64px,14vw,180px)]",
  /** Large curve on the top-right corner */
  archRight: "rounded-lg rounded-tr-[clamp(64px,14vw,180px)]",
  pill: "rounded-full",
};

/**
 * Renders a supplied photo, or a quiet placeholder of the same shape until the
 * real asset is added in src/content/site.ts. An optional caption sits in a
 * white tab joined to the bottom-left corner.
 */
export function Photo({
  image,
  fallbackAlt,
  sizes,
  priority = false,
  shape = "rounded",
  caption,
  captionOn = "white",
  className = "",
}: {
  image: SiteImage;
  fallbackAlt: string;
  sizes: string;
  priority?: boolean;
  shape?: keyof typeof shapes;
  caption?: string;
  /** Match the caption tab to the section background so it reads as a cutout. */
  captionOn?: "white" | "ivory";
  className?: string;
}) {
  const captionTab = caption ? (
    <span className={`absolute bottom-0 left-0 rounded-tr-lg px-4 pb-1.5 pt-3 ${captionOn === "ivory" ? "bg-ivory" : "bg-white"} text-xs font-medium uppercase tracking-[0.12em] text-navy sm:px-5 sm:pt-3.5 sm:text-[13px]`}>
      {caption}
    </span>
  ) : null;

  if (image) {
    return (
      <figure className={`relative overflow-hidden bg-ivory ${shapes[shape]} ${className}`}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
        {captionTab}
      </figure>
    );
  }

  return (
    <div
      role="img"
      aria-label={fallbackAlt}
      data-placeholder="photo"
      className={`relative flex items-center justify-center overflow-hidden border border-line bg-ivory ${shapes[shape]} ${className}`}
    >
      <HomeIllustration />
      {captionTab}
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
