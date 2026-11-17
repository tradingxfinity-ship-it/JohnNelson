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
  /** Slug of a full album in soldAlbums.ts, offered as “View all photos” */
  album?: string;
};

type ViewerSet = { label: string; photos: ViewerPhoto[]; start: number };

const OPEN_EVENT = "open-photo-viewer";

/** Opens any set of photos in the site-wide viewer, starting at `start`. */
export function openPhotoViewer(label: string, photos: ViewerPhoto[], start = 0) {
  window.dispatchEvent(new CustomEvent<ViewerSet>(OPEN_EVENT, { detail: { label, photos, start } }));
}

function albumSet(slug: string): ViewerSet | null {
  const album = soldAlbums.find((a) => a.slug === slug);
  if (!album) return null;
  return {
    label: `${album.title}, ${album.place}: photo album`,
    start: 0,
    photos: album.photos.map((p) => ({
      ...p,
      title: album.title,
      subtitle: `${album.place} · Sold ${album.sold}`,
    })),
  };
}

/** Opens a sold home's full photo album in the site-wide viewer. */
export function openSoldAlbum(slug: string) {
  const set = albumSet(slug);
  if (set) openPhotoViewer(set.label, set.photos);
}

/** Full-screen photo viewer. Mounted once in the root layout. */
export function AlbumViewer() {
  const [set, setSet] = useState<ViewerSet | null>(null);
  const [index, setIndex] = useState(0);
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

  const onKeyDown = (e: React.KeyboardEvent) => {
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
  const fullAlbum = photo?.album ? soldAlbums.find((a) => a.slug === photo.album) : undefined;
  const showAlbumLink = fullAlbum && count !== fullAlbum.photos.length;

  return (
    <dialog
      ref={dialogRef}
      aria-label={set?.label ?? "Photo viewer"}
      onClose={() => {
        setSet(null);
        openerRef.current?.focus();
      }}
      onKeyDown={onKeyDown}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-navy p-0 text-white backdrop:bg-navy/90"
    >
      {set && photo && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="truncate text-base font-medium sm:text-lg">{photo.title}</p>
              <p className="truncate text-sm text-white/70">{photo.subtitle}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3 sm:gap-4">
              {showAlbumLink && (
                <button
                  type="button"
                  onClick={() => {
                    const next = albumSet(fullAlbum.slug);
                    if (next) {
                      setSet(next);
                      setIndex(0);
                    }
                  }}
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
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
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
                  className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-navy/70 hover:bg-navy sm:left-6"
                >
                  <span className="sr-only">Previous photo</span>
                  <span aria-hidden className="text-xl">
                    ←
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-navy/70 hover:bg-navy sm:right-6"
                >
                  <span className="sr-only">Next photo</span>
                  <span aria-hidden className="text-xl">
                    →
                  </span>
                </button>
              </>
            )}
            {showAlbumLink && (
              <button
                type="button"
                onClick={() => {
                  const next = albumSet(fullAlbum.slug);
                  if (next) {
                    setSet(next);
                    setIndex(0);
                  }
                }}
                className="absolute bottom-4 left-1/2 inline-flex min-h-11 -translate-x-1/2 items-center rounded-md bg-white px-4 text-sm font-medium text-navy sm:hidden"
              >
                View all {fullAlbum.photos.length} photos
              </button>
            )}
          </div>

          <div ref={thumbsRef} className="flex gap-2 overflow-x-auto px-5 py-4 sm:px-8" aria-label="Photos">
            {set.photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                data-index={i}
                onClick={() => setIndex(i)}
                aria-current={i === index ? "true" : undefined}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-sm border-2 sm:h-16 sm:w-24 ${
                  i === index ? "border-brass" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <span className="sr-only">Show photo {i + 1}</span>
                <Image src={p.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}
