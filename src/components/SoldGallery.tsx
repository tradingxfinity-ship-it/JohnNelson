"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { soldAlbums, type SoldAlbum } from "@/content/soldAlbums";
import { Container, Eyebrow, Section } from "./ui";

/** “Recently sold” albums. Each card opens a full-screen photo viewer. */
export function SoldGallery() {
  const [album, setAlbum] = useState<SoldAlbum | null>(null);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const open = (a: SoldAlbum, button: HTMLButtonElement) => {
    openerRef.current = button;
    setAlbum(a);
    setIndex(0);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (album && dialog && !dialog.open) dialog.showModal();
  }, [album]);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // The hero carousel asks to open an album by slug (see openSoldAlbum)
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

  if (soldAlbums.length === 0) return null;
  const photo = album?.photos[index];

  return (
    <Section className="border-t border-line">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Recently sold</Eyebrow>
            <h2 className="text-3xl font-medium sm:text-4xl">Take a look inside homes we’ve sold.</h2>
          </div>
          <p className="max-w-sm leading-relaxed md:text-right">Open any home to browse its full photo album.</p>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {soldAlbums.map((a, i) => (
            <li key={a.slug} className={i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
              <button
                type="button"
                onClick={(e) => open(a, e.currentTarget)}
                className="group flex h-full w-full flex-col text-left"
                aria-haspopup="dialog"
              >
                <span
                  className={`relative block overflow-hidden rounded-lg bg-ivory ${
                    i === 0 ? "aspect-[4/3] rounded-tl-[clamp(64px,14vw,180px)] lg:aspect-auto lg:min-h-[320px] lg:flex-1" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={a.photos[0].src}
                    alt=""
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 400px, (min-width: 640px) 100vw, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span className="absolute bottom-0 left-0 rounded-tr-lg bg-white px-4 pb-1.5 pt-3 text-xs font-medium uppercase tracking-[0.12em] text-navy sm:px-5 sm:pt-3.5 sm:text-[13px]">
                    Sold · {a.sold}
                  </span>
                </span>
                <span className="mt-5 flex items-start justify-between gap-4">
                  <span className="min-w-0">
                    <span className="block text-xl font-medium text-navy underline-offset-4 group-hover:underline group-focus-visible:underline">
                      {a.title}
                    </span>
                    <span className="mt-1 block text-[15px]">{a.place}</span>
                  </span>
                  <span className="shrink-0 pt-1 text-sm font-medium text-navy">
                    {a.photos.length} photos <span aria-hidden>→</span>
                  </span>
                </span>
                <span className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-4 text-sm">
                  {a.details.map((d, j) => (
                    <span key={d} className="flex items-center gap-3">
                      {j > 0 && <span aria-hidden className="h-3 w-px bg-line" />}
                      <span className="font-medium text-navy">{d}</span>
                    </span>
                  ))}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Container>

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
                <span aria-hidden className="text-xl">←</span>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-navy/70 hover:bg-navy sm:right-6"
              >
                <span className="sr-only">Next photo</span>
                <span aria-hidden className="text-xl">→</span>
              </button>
            </div>

            <div ref={thumbsRef} className="flex gap-2 overflow-x-auto px-5 py-4 sm:px-8" aria-label="Photos in this album">
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
    </Section>
  );
}
