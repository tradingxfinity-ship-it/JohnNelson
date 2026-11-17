"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { soldAlbums } from "@/content/soldAlbums";

const INTERVAL_MS = 6000;
// One sizes value for every slot so the pills and the main photo share cached files
const SIZES = "(min-width: 1248px) 900px, 100vw";

const slides = soldAlbums.map((a) => ({
  slug: a.slug,
  image: a.photos[0],
  city: a.place.split(",")[0],
  title: a.title,
  sold: a.sold,
  count: a.photos.length,
}));

/** Opens a sold home's album in the Recently sold gallery. */
export function openSoldAlbum(slug: string) {
  window.dispatchEvent(new CustomEvent("open-sold-album", { detail: slug }));
}

/**
 * Hero photo row: the current sold home in the middle with neighbouring homes as
 * pills on each side. Advances on a timer with a cross-fade; pauses on hover,
 * focus, when the tab is hidden, when the visitor presses pause, and never
 * auto-advances for visitors who prefer reduced motion.
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    if (paused || hovering || reduceMotion || count < 2) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") go(1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, hovering, reduceMotion, count, go]);

  if (count === 0) return null;
  const current = slides[index];
  const at = (offset: number) => (index + offset + count) % count;

  const pill = (offset: number, visibility: string) => {
    const target = at(offset);
    return (
      <button
        type="button"
        onClick={() => setIndex(target)}
        className={`relative h-full w-[clamp(44px,5.5vw,80px)] shrink-0 overflow-hidden rounded-full bg-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${visibility}`}
      >
        <span className="sr-only">
          Show {slides[target].title} in {slides[target].city}
        </span>
        <SlideStack activeIndex={target} />
      </button>
    );
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Homes sold by Irma and John"
      className="mt-12 flex h-[clamp(280px,40vw,520px)] gap-3 lg:mt-16 lg:gap-4"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovering(false);
      }}
    >
      {pill(-2, "hidden lg:block")}
      {pill(-1, "hidden md:block")}

      <div
        className="relative h-full min-w-0 flex-1 overflow-hidden rounded-lg bg-ivory"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <button
          type="button"
          onClick={() => openSoldAlbum(current.slug)}
          className="absolute inset-0 h-full w-full focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
          aria-label={`View ${current.count} photos of the ${current.title.toLowerCase()} in ${current.city}`}
        >
          <SlideStack activeIndex={index} priority zoom />
        </button>

        {/* Caption tab, bottom left */}
        <p
          className="pointer-events-none absolute bottom-0 left-0 rounded-tr-lg bg-white px-4 pb-1.5 pt-3 text-xs font-medium uppercase tracking-[0.12em] text-navy sm:px-5 sm:pt-3.5 sm:text-[13px]"
          aria-live={paused || reduceMotion ? "polite" : "off"}
        >
          Sold · {current.city}
          <span className="sr-only">, {current.sold}</span>
        </p>

        {/* Controls tab, bottom right */}
        <div className="absolute bottom-0 right-0 flex items-center gap-1 rounded-tl-lg bg-white py-1.5 pl-2 pr-1.5 text-navy sm:gap-2 sm:pl-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-ivory"
          >
            <span className="sr-only">Previous home</span>
            <span aria-hidden>←</span>
          </button>
          <span className="min-w-[3ch] text-center text-[13px] font-medium tabular-nums">
            {index + 1}/{count}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-ivory"
          >
            <span className="sr-only">Next home</span>
            <span aria-hidden>→</span>
          </button>
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-ivory"
            >
              <span className="sr-only">{paused ? "Play slideshow" : "Pause slideshow"}</span>
              {paused ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <path d="M2.5 1.5v9l8-4.5z" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <path d="M2 1.5h3v9H2zM7 1.5h3v9H7z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {pill(1, "hidden md:block")}
      {pill(2, "hidden lg:block")}
    </div>
  );
}

/** Every slide's photo stacked in one frame; the active one fades in over the others. */
function SlideStack({ activeIndex, priority = false, zoom = false }: { activeIndex: number; priority?: boolean; zoom?: boolean }) {
  return (
    <>
      {slides.map((s, i) => {
        const active = i === activeIndex;
        return (
          <Image
            key={s.slug}
            src={s.image.src}
            alt={active && zoom ? `${s.title} in ${s.city}, sold ${s.sold}` : ""}
            fill
            sizes={SIZES}
            priority={priority && i === 0}
            aria-hidden={!active || undefined}
            className={`object-cover transition-[opacity,transform] ease-out motion-reduce:transition-none ${
              active ? "opacity-100" : "opacity-0"
            } ${zoom ? `duration-[1200ms,6000ms] ${active ? "scale-100" : "scale-[1.06]"} motion-reduce:scale-100` : "duration-[1200ms]"}`}
          />
        );
      })}
    </>
  );
}
