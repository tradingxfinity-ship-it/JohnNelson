import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.name}, home`}>
      {site.logo ? (
        <Image
          src={site.logo.src}
          alt=""
          width={site.logo.width}
          height={site.logo.height}
          sizes={inverse ? "120px" : "90px"}
          priority={!inverse}
          // The logo has a white background, so on dark areas it sits on a white plate
          className={inverse ? "h-24 w-auto rounded-md bg-white p-2" : "h-14 w-auto sm:h-16 lg:h-[76px]"}
        />
      ) : (
        <>
          <span
            aria-hidden
            className={`flex h-9 w-9 items-center justify-center rounded-sm border text-[13px] font-semibold tracking-tight ${
              inverse ? "border-white/40 text-white" : "border-blue text-blue"
            }`}
          >
            GIS
          </span>
          <span className="flex flex-col leading-none">
            <span className={`text-[17px] font-semibold tracking-[-0.02em] ${inverse ? "text-white" : "text-blue"}`}>
              Get It Sold
            </span>
            <span className={`mt-1 text-[11px] font-medium uppercase tracking-[0.18em] ${inverse ? "text-red-light" : "text-red"}`}>
              Realty
            </span>
          </span>
        </>
      )}
    </Link>
  );
}
