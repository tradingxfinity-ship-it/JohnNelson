"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { soldAlbums } from "@/content/soldAlbums";
import { openSoldAlbum } from "./AlbumViewer";

const INTERVAL_MS = 4500;
const MOVE_MS = 1100;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
// One sizes value for every card so a pill and the main photo share cached files
const SIZES = "(min-width: 1248px) 900px, 100vw";

const slides = soldAlbums.map((a) => ({
  slug: a.slug,
  image: a.photos[0],
  city: a.place.split(",")[0],
  title: a.title,
  sold: a.sold,
  count: a.photos.length,
}));

const mod = (a: number, n: number) => ((a % n) + n) % n;

type Layout = { width: number; pill: number; gap: number; side: number; center: number };

/** Slot geometry for an offset from the current home (0 = main photo, ±1, ±2 = pills). */
function slot(offset: number, l: Layout) {
  const { width, pill, gap, side, center } = l;
  const centerLeft = side * (pill + gap);
  if (offset === 0) return { left: centerLeft, width: center, visible: true };
  const dir = Math.sign(offset);
  const steps = Math.abs(offset);
  if (steps <= side) {
    // Pills nearest the centre first
    const left = dir < 0 ? centerLeft - steps * (pill + gap) : centerLeft + center + gap + (steps - 1) * (pill + gap);
    return { left, width: pill, visible: true };
  }
  // Just outside the frame, so cards enter from the right and leave to the left
  const beyond = steps - side;
  const w = side === 0 ? center : pill;
  const left = dir < 0 ? -beyond * (w + gap) : width + gap + (beyond - 1) * (w + gap);
  return { left, width: w, visible: false };
}

/**
 * Hero photo row that turns like a carousel: the main photo shrinks into a pill
 * and slides left while the next pill slides in and grows into the main photo.
 * Advances on a timer; pauses on hover, focus, a hidden tab, or the pause button,
 * and never auto-advances for visitors who prefer reduced motion.
 */
export function HeroCarousel() {
  // Unbounded position; cards are keyed by absolute position so each one glides between slots
  const [pos, setPos] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [layout, setLayout] = useState<Layout | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth;
      const vw = window.innerWidth;
      const side = vw >= 1024 ? 2 : vw >= 768 ? 1 : 0;
      const pill = Math.min(80, Math.max(44, vw * 0.055));
      const gap = vw >= 1024 ? 16 : 12;
      setLayout({ width, pill, gap, side, center: width - 2 * side * (pill + gap) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback((delta: number) => setPos((p) => p + delta), []);

  useEffect(() => {
    if (paused || hovering || reduceMotion || count < 2) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") go(1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, hovering, reduceMotion, count, go]);

  if (count === 0) return null;
  const current = slides[mod(pos, count)];
  const reach = (layout?.side ?? 2) + 1;
  const cards = [];
  for (let offset = -reach; offset <= reach; offset++) cards.push({ key: pos + offset, offset });

  const centerSlot = layout ? slot(0, layout) : null;
  const transition = reduceMotion
    ? "none"
    : `left ${MOVE_MS}ms ${EASE}, width ${MOVE_MS}ms ${EASE}, border-radius ${MOVE_MS}ms ${EASE}, opacity ${MOVE_MS}ms ${EASE}`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Homes sold by Irma and John"
      className="mt-12 lg:mt-16"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovering(false);
      }}
    >
      <div
        ref={frameRef}
        className="relative h-[clamp(280px,40vw,520px)] overflow-hidden"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {layout &&
          cards.map(({ key, offset }) => {
            const s = slides[mod(key, count)];
            const { left, width, visible } = slot(offset, layout);
            const isCenter = offset === 0;
            return (
              <button
                key={key}
                type="button"
                tabIndex={visible ? 0 : -1}
                aria-hidden={!visible || undefined}
                onClick={() => (isCenter ? openSoldAlbum(s.slug) : go(offset))}
                aria-label={
                  isCenter
                    ? `View ${s.count} photos of the ${s.title.toLowerCase()} in ${s.city}`
                    : `Show ${s.title.toLowerCase()} in ${s.city}`
                }
                className="absolute top-0 h-full overflow-hidden bg-ivory focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
                style={{
                  left,
                  width,
                  borderRadius: isCenter ? 8 : layout.pill / 2,
                  opacity: visible ? 1 : 0,
                  zIndex: isCenter ? 2 : 1,
                  transition,
                }}
              >
                {/* Fixed-width image centred in the card, so it re-crops smoothly as the card resizes */}
                <span
                  className="absolute inset-y-0 left-1/2 -translate-x-1/2"
                  style={{ width: Math.max(layout.center, 1) }}
                >
                  <Image
                    src={s.image.src}
                    alt=""
                    fill
                    sizes={SIZES}
                    priority={Math.abs(offset) <= 1}
                    className="object-cover"
                  />
                </span>
              </button>
            );
          })}

        {/* Caption and controls sit on the main photo's corners */}
        {centerSlot && (
          <>
            <p
              className="pointer-events-none absolute bottom-0 z-10 rounded-tr-lg bg-white px-4 pb-1.5 pt-3 text-xs font-medium uppercase tracking-[0.12em] text-navy sm:px-5 sm:pt-3.5 sm:text-[13px]"
              style={{ left: centerSlot.left }}
              aria-live={paused || reduceMotion ? "polite" : "off"}
            >
              Sold · {current.city}
              <span className="sr-only">, {current.sold}</span>
            </p>
            <div
              className="absolute bottom-0 z-10 flex items-center gap-1 rounded-tl-lg bg-white py-1.5 pl-2 pr-1.5 text-navy sm:gap-2 sm:pl-3"
              style={{ right: layout ? layout.width - (centerSlot.left + centerSlot.width) : 0 }}
            >
              <button
                type="button"
                onClick={() => go(-1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-ivory"
              >
                <span className="sr-only">Previous home</span>
                <span aria-hidden>←</span>
              </button>
              <span className="min-w-[3ch] text-center text-[13px] font-medium tabular-nums">
                {mod(pos, count) + 1}/{count}
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
          </>
        )}
      </div>
    </div>
  );
}
