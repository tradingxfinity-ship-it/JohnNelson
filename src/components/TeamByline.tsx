import Image from "next/image";
import { site } from "@/content/site";

/**
 * Small round portrait of Irma and John with their names, used like an author
 * byline. The supplied portrait is 240px, which stays sharp at this size.
 */
export function TeamByline({ className = "" }: { className?: string }) {
  const portrait = site.images.teamPortrait;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {portrait && (
        <Image
          src={portrait.src}
          alt={portrait.alt}
          width={portrait.width}
          height={portrait.height}
          sizes="72px"
          unoptimized={portrait.width <= 480}
          className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-line ring-offset-2 sm:h-[72px] sm:w-[72px]"
        />
      )}
      <div>
        <p className="text-lg font-medium text-navy">Irma and John Nelson</p>
        <p className="text-sm">Broker/owner team · {site.name}</p>
      </div>
    </div>
  );
}
