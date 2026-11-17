"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { soldAlbums, type SoldAlbum } from "@/content/soldAlbums";

/** Opens a sold home's photo album in the site-wide viewer. */
export function openSoldAlbum(slug: string) {
  window.dispatchEvent(new CustomEvent("open-sold-album", { detail: slug }));
}

/** Full-screen photo viewer for sold home albums. Mounted once in the root layout. */
export function AlbumViewer() {
  const [album, setAlbum] = useState<SoldAlbum | null>(null);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (album && dialog && !dialog.open) dialog.showModal();
  }, [album]);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // Any page can open an album by slug (see openSoldAlbum)
  useEffect(() => {
    const onOpen = (e: Event) => {
      const found = soldAlbums.find((a) => a.slug === (e as CustomEvent<string>).detail);
      if (!found) return;
      openerRef.current = document.activeElement instanceof HTMLButtonElement ? document.activeElement : null;
      setAlbum(found);
      setIndex(0);
    };
    window.addEventListener("open-sold-album", onOpen);
    return () => window.removeEventListener("open-sold-album", onOpen);
  }, []);

  const count = album?.photos.length ?? 0;
  const go = useCallback((delta: number) => setIndex((i) => (count ? (i + delta + count) % count : 0)), [count]);

  // Keep the active thumbnail in view
  useEffect(() => {
    thumbsRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "auto" });
  }, [index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  // Swipe on touch screens
  const touchX = useRef<number | null>(null);

  const photo = album?.photos[index];

  return (
    <dialog
      ref={dialogRef}
      aria-label={album ? `${album.title}, ${album.place}: photo album` : "Photo album"}
      onClose={() => {
        setAlbum(null);
        openerRef.current?.focus();
      }}
      onKeyDown={onKeyDown}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-navy p-0 text-white backdrop:bg-navy/90"
    >
      {album && photo && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="truncate text-base font-medium sm:text-lg">{album.title}</p>
              <p className="truncate text-sm text-white/70">
                {album.place} · Sold {album.sold}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <p className="text-sm tabular-nums text-white/80" aria-live="polite">
                {index + 1} / {count}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 hover:bg-white/10"
                autoFocus
              >
                <span className="sr-only">Close album</span>
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
              alt={`${album.title}, photo ${index + 1} of ${count}`}
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />
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
          </div>

          <div
            ref={thumbsRef}
            className="flex gap-2 overflow-x-auto px-5 py-4 sm:px-8"
            aria-label="Photos in this album"
          >
            {album.photos.map((p, i) => (
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
