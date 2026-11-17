"use client";

import Image from "next/image";
import { soldAlbums } from "@/content/soldAlbums";
import { openSoldAlbum } from "./AlbumViewer";
import { Container, Eyebrow, Section } from "./ui";

/** “Recently sold” albums. Each card opens the full-screen photo viewer. */
export function SoldGallery() {
  if (soldAlbums.length === 0) return null;

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
                onClick={() => openSoldAlbum(a.slug)}
                className="group flex h-full w-full flex-col text-left"
                aria-haspopup="dialog"
              >
                <span
                  className={`relative block overflow-hidden rounded-lg bg-ivory ${
                    i === 0
                      ? "aspect-[4/3] rounded-tl-[clamp(64px,14vw,180px)] lg:aspect-auto lg:min-h-[320px] lg:flex-1"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={a.photos[0].src}
                    alt=""
                    fill
                    sizes={
                      i === 0
                        ? "(min-width: 1024px) 400px, (min-width: 640px) 100vw, 100vw"
                        : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    }
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
    </Section>
  );
}
