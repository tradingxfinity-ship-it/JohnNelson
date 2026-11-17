"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PortfolioHome } from "@/content/portfolio";
import { openPhotoViewer } from "./AlbumViewer";
import { homeAlbum, homeTitle } from "./PortfolioGrid";

/**
 * Horizontally scrolling row of sold homes. Swipe, scroll, or use the arrows;
 * each card opens that home's photo gallery.
 */
export function SoldCarousel({ homes }: { homes: PortfolioHome[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = el.scrollLeft;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
    // Some browsers skip smooth scrolling (e.g. background tabs); jump instead if nothing moved
    window.setTimeout(() => {
      if (Math.abs(el.scrollLeft - start) < 1) el.scrollBy({ left: dir * step, behavior: "auto" });
    }, 350);
  };

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        onScroll={update}
        aria-label="Homes sold"
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6"
      >
        {homes.map((h) => {
          const album = homeAlbum(h);
          return (
            <li key={h.src} className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)]">
              <button
                type="button"
                onClick={() => album && openPhotoViewer(album.label, album.photos, 0, "gallery")}
                aria-haspopup="dialog"
                aria-label={`${homeTitle(h)}, sold ${h.sold}. View ${album?.photos.length ?? 1} photos`}
                className="group block w-full text-left"
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-cloud">
                  <Image
                    src={h.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 82vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span className="absolute bottom-0 left-0 rounded-tr-lg bg-white px-4 pb-1.5 pt-3 text-xs font-medium uppercase tracking-[0.12em] text-navy">
                    Sold · {h.sold}
                  </span>
                </span>
                <span className="mt-4 flex items-start justify-between gap-4">
                  <span className="min-w-0">
                    <span className="block text-lg font-medium text-navy underline-offset-4 group-hover:underline">
                      {h.city}
                    </span>
                    <span className="mt-0.5 block text-sm">{h.details.join(" · ")}</span>
                  </span>
                  <span className="shrink-0 pt-1 text-sm font-medium text-navy">
                    {album?.photos.length ?? 1} photos <span aria-hidden>→</span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          disabled={atStart}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy transition-colors hover:border-navy disabled:opacity-40 disabled:hover:border-line"
        >
          <span className="sr-only">Previous homes</span>
          <span aria-hidden>←</span>
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          disabled={atEnd}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy bg-navy text-white transition-colors hover:bg-navy-hover hover:text-gold-light disabled:opacity-40 disabled:hover:text-white"
        >
          <span className="sr-only">Next homes</span>
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
