"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { soldAlbums } from "@/content/soldAlbums";

export type ViewerPhoto = {
  src: string;
  width: number;
  height: number;
  title: string;
  subtitle: string;
  /** This home's full album, offered as “View all N photos” while browsing other photos */
  fullAlbum?: ViewerAlbum;
};

/** "gallery" opens on a scrolling mosaic of every photo; "single" opens on one photo at a time. */
export type ViewerLayout = "gallery" | "single";

export type ViewerAlbum = { label: string; photos: ViewerPhoto[]; layout?: ViewerLayout };

type ViewerSet = ViewerAlbum & { start: number };

// Repeating row shapes for the gallery mosaic, as column widths
const ROW_PATTERNS = [
  [2, 1],
  [1, 1, 1],
  [1, 2],
  [1, 1],
];

/** Splits photos into mosaic rows; a short last row shares the width evenly. */
function mosaicRows<T>(items: T[]): { cols: number[]; items: { item: T; index: number }[] }[] {
  const rows = [];
  let i = 0;
  let p = 0;
  while (i < items.length) {
    const pattern = ROW_PATTERNS[p % ROW_PATTERNS.length];
    const slice = items.slice(i, i + pattern.length).map((item, k) => ({ item, index: i + k }));
    rows.push({ cols: slice.length === pattern.length ? pattern : slice.map(() => 1), items: slice });
    i += pattern.length;
    p++;
  }
  return rows;
}

const OPEN_EVENT = "open-photo-viewer";

/** Opens any set of photos in the site-wide viewer, starting at `start`. */
export function openPhotoViewer(label: string, photos: ViewerPhoto[], start = 0, layout: ViewerLayout = "single") {
  window.dispatchEvent(new CustomEvent<ViewerSet>(OPEN_EVENT, { detail: { label, photos, start, layout } }));
}

/** A sold album from soldAlbums.ts, ready for the viewer. */
export function soldAlbumSet(slug: string): ViewerSet | null {
  const album = soldAlbums.find((a) => a.slug === slug);
  if (!album) return null;
  return {
    label: `${album.title}, ${album.place}: photo album`,
    start: 0,
    layout: "gallery",
    photos: album.photos.map((p) => ({
      ...p,
      title: album.title,
      subtitle: `${album.place} · Sold ${album.sold}`,
    })),
  };
}

/** Opens a sold home's full photo album in the site-wide viewer. */
export function openSoldAlbum(slug: string) {
  const set = soldAlbumSet(slug);
  if (set) openPhotoViewer(set.label, set.photos, 0, "gallery");
}

/** Full-screen photo viewer. Mounted once in the root layout. */
export function AlbumViewer() {
  const [set, setSet] = useState<ViewerSet | null>(null);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<ViewerLayout>("single");
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryScroll = useRef(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (set && dialog && !dialog.open) dialog.showModal();
  }, [set]);

  // Any page can open photos (see openPhotoViewer and openSoldAlbum)
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<ViewerSet>).detail;
      if (!detail?.photos.length) return;
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setSet(detail);
      setMode(detail.layout ?? "single");
      galleryScroll.current = 0;
      setIndex(Math.min(Math.max(detail.start, 0), detail.photos.length - 1));
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const count = set?.photos.length ?? 0;
  const go = useCallback((delta: number) => setIndex((i) => (count ? (i + delta + count) % count : 0)), [count]);

  // Keep the active thumbnail in view
  useEffect(() => {
    thumbsRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "auto" });
  }, [index, set]);

  // Coming back to the gallery: restore its scroll position and focus the photo just viewed
  useEffect(() => {
    if (mode !== "gallery" || !galleryRef.current) return;
    galleryRef.current.scrollTop = galleryScroll.current;
    galleryRef.current.querySelector<HTMLElement>(`[data-tile="${index}"]`)?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const openPhoto = (i: number) => {
    galleryScroll.current = galleryRef.current?.scrollTop ?? 0;
    setIndex(i);
    setMode("single");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (mode !== "single") return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const photo = set?.photos[index];
  // From a portfolio photo, offer that home's full album
  const fullAlbum = photo?.fullAlbum;
  const showAlbumLink = fullAlbum && set?.photos !== fullAlbum.photos && fullAlbum.photos.length > 1;
  const openFullAlbum = () => {
    if (!fullAlbum) return;
    setSet({ ...fullAlbum, start: 0, layout: "gallery" });
    galleryScroll.current = 0;
    setIndex(0);
    setMode("gallery");
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={set?.label ?? "Photo viewer"}
      onClose={() => {
        setSet(null);
        openerRef.current?.focus();
      }}
      onKeyDown={onKeyDown}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-blue p-0 text-white backdrop:bg-blue/90"
    >
      {set && photo && mode === "gallery" && (
        <div ref={galleryRef} className="h-full overflow-y-auto">
          <div className="sticky top-0 z-10 bg-blue/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-[1248px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
              <div className="min-w-0">
                <p className="truncate text-base font-medium sm:text-lg">{set.photos[0].title}</p>
                <p className="truncate text-sm text-white/70">{set.photos[0].subtitle}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                <p className="text-sm text-white/80">{count} photos</p>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 hover:bg-white/10"
                  autoFocus
                >
                  <span className="sr-only">Close photos</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden
                  >
                    <path d="M5 5l10 10M15 5L5 15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <ul
            className="mx-auto flex max-w-[1248px] flex-col gap-2 px-5 pb-10 sm:gap-3 sm:px-8"
            aria-label="All photos"
          >
            {mosaicRows(set.photos).map((row, r) => (
              <li
                key={r}
                className="grid grid-cols-1 gap-2 sm:h-[clamp(200px,26vw,360px)] sm:grid-cols-[var(--cols)] sm:gap-3"
                style={{ "--cols": row.cols.map((c) => `${c}fr`).join(" ") } as React.CSSProperties}
              >
                {row.items.map(({ item, index: i }) => (
                  <button
                    key={item.src}
                    type="button"
                    data-tile={i}
                    onClick={() => openPhoto(i)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-md bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:aspect-auto sm:h-full"
                  >
                    <span className="sr-only">
                      Open photo {i + 1} of {count}
                    </span>
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      sizes={`(min-width: 640px) ${Math.round((100 * row.cols[row.items.findIndex((x) => x.index === i)]) / row.cols.reduce((a, b) => a + b, 0))}vw, 100vw`}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </button>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}

      {set && photo && mode === "single" && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="truncate text-base font-medium sm:text-lg">{photo.title}</p>
              <p className="truncate text-sm text-white/70">{photo.subtitle}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3 sm:gap-4">
              {set.layout === "gallery" && (
                <button
                  type="button"
                  onClick={() => setMode("gallery")}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/25 px-3 text-sm font-medium hover:bg-white/10 sm:px-4"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
                    <path d="M0 0h6v6H0zM8 0h6v6H8zM0 8h6v6H0zM8 8h6v6H8z" />
                  </svg>
                  <span className="sr-only sm:not-sr-only">All photos</span>
                </button>
              )}
              {showAlbumLink && fullAlbum && (
                <button
                  type="button"
                  onClick={openFullAlbum}
                  className="hidden min-h-11 items-center rounded-md border border-white/25 px-4 text-sm font-medium hover:bg-white/10 sm:inline-flex"
                >
                  View all {fullAlbum.photos.length} photos
                </button>
              )}
              <p className="text-sm tabular-nums text-white/80" aria-live="polite">
                {index + 1} / {count}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 hover:bg-white/10"
                autoFocus
              >
                <span className="sr-only">Close photos</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden
                >
                  <path d="M5 5l10 10M15 5L5 15" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className="relative min-h-0 flex-1"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <Image
              key={photo.src}
              src={photo.src}
              alt={`${photo.title}, ${photo.subtitle}. Photo ${index + 1} of ${count}`}
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-blue/70 hover:bg-blue sm:left-6"
                >
                  <span className="sr-only">Previous photo</span>
                  <span aria-hidden className="text-xl">
                    ←
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-blue/70 hover:bg-blue sm:right-6"
                >
                  <span className="sr-only">Next photo</span>
                  <span aria-hidden className="text-xl">
                    →
                  </span>
                </button>
              </>
            )}
            {showAlbumLink && fullAlbum && (
              <button
                type="button"
                onClick={openFullAlbum}
                className="absolute bottom-4 left-1/2 inline-flex min-h-11 -translate-x-1/2 items-center rounded-md bg-white px-4 text-sm font-medium text-blue sm:hidden"
              >
                View all {fullAlbum.photos.length} photos
              </button>
            )}
          </div>

          {/* Thumbnails stay inside the page width and fade out at the edges when they overflow */}
          <div className="mx-auto w-full max-w-[1248px] px-5 pb-5 pt-4 sm:px-8">
            <div
              ref={thumbsRef}
              className="overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent)] [scrollbar-width:none]"
              aria-label="Photos"
            >
              <div className="mx-auto flex w-max gap-2 px-8 py-1">
                {set.photos.map((p, i) => (
                  <button
                    key={p.src}
                    type="button"
                    data-index={i}
                    onClick={() => setIndex(i)}
                    aria-current={i === index ? "true" : undefined}
                    className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md transition-opacity sm:h-14 sm:w-20 ${
                      i === index
                        ? "opacity-100 ring-2 ring-red ring-offset-2 ring-offset-blue"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <span className="sr-only">Show photo {i + 1}</span>
                    <Image src={p.src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
