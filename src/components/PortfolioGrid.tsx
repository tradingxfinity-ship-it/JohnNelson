"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { portfolio, type PortfolioHome } from "@/content/portfolio";
import { soldAlbums } from "@/content/soldAlbums";
import { openPhotoViewer, openSoldAlbum, type ViewerPhoto } from "./AlbumViewer";

const ALL = "All areas";

/** Filterable grid of sold homes. Homes with a full album open the photo viewer. */
export function PortfolioGrid() {
  // Areas with the most sales first
  const areas = useMemo(() => {
    const counts = new Map<string, number>();
    for (const h of portfolio) counts.set(h.city, (counts.get(h.city) ?? 0) + 1);
    return [ALL, ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([city]) => city)];
  }, []);
  const [area, setArea] = useState(ALL);
  const homes = area === ALL ? portfolio : portfolio.filter((h) => h.city === area);

  return (
    <>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div
          role="group"
          aria-label="Filter by area"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        >
          {areas.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setArea(a)}
              aria-pressed={area === a}
              className={`min-h-10 shrink-0 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors ${
                area === a ? "border-navy bg-navy text-white" : "border-line text-navy hover:border-navy"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
        <p className="shrink-0 text-sm" aria-live="polite">
          Showing {homes.length} {homes.length === 1 ? "home" : "homes"}
          {area === ALL ? "" : ` in ${area}`}
        </p>
      </div>

      <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {homes.map((h, i) => (
          <li key={h.src}>
            <HomeCard home={h} priority={i < 3} onOpen={() => openHomes(homes, i, area)} />
          </li>
        ))}
      </ul>
    </>
  );
}

const isLand = (h: PortfolioHome) => h.details.includes("Land");

/** Opens the viewer on the current list of homes, starting at the clicked one. */
function openHomes(homes: PortfolioHome[], start: number, area: string) {
  const photos: ViewerPhoto[] = homes.map((h) => ({
    src: h.src,
    width: h.width,
    height: h.height,
    title: `${isLand(h) ? "Land" : "Home"} in ${h.city}, TX ${h.zip}`,
    subtitle: `Sold ${h.sold} · ${h.details.join(" · ")}`,
    album: h.album,
  }));
  openPhotoViewer(`Portfolio${area === ALL ? "" : `: ${area}`}`, photos, start);
}

function HomeCard({ home, priority, onOpen }: { home: PortfolioHome; priority: boolean; onOpen: () => void }) {
  const album = home.album ? soldAlbums.find((a) => a.slug === home.album) : undefined;
  const label = `${isLand(home) ? "Land" : "Home"} in ${home.city}, TX ${home.zip}, sold ${home.sold}`;

  const body = (
    <>
      <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-ivory">
        <Image
          src={home.src}
          alt=""
          fill
          sizes="(min-width: 1248px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <span className="absolute bottom-0 left-0 rounded-tr-lg bg-white px-4 pb-1.5 pt-3 text-xs font-medium uppercase tracking-[0.12em] text-navy">
          Sold · {home.sold}
        </span>
      </span>
      <span className="mt-4 flex items-start justify-between gap-4">
        <span className="min-w-0">
          <span className="block text-lg font-medium text-navy underline-offset-4 group-hover:underline group-focus-visible:underline">
            {home.city}
          </span>
          <span className="mt-0.5 block text-sm">TX {home.zip}</span>
        </span>
        <span className="shrink-0 pt-1 text-sm font-medium text-navy">
          {album ? `${album.photos.length} photos` : "View"} <span aria-hidden>→</span>
        </span>
      </span>
      <span className="mt-3 flex flex-wrap items-center gap-3 border-t border-line pt-3 text-sm">
        {home.details.map((d, j) => (
          <span key={d} className="flex items-center gap-3">
            {j > 0 && <span aria-hidden className="h-3 w-px bg-line" />}
            <span className="font-medium text-navy">{d}</span>
          </span>
        ))}
      </span>
    </>
  );

  return (
    <button
      type="button"
      onClick={() => (album ? openSoldAlbum(album.slug) : onOpen())}
      aria-haspopup="dialog"
      aria-label={album ? `${label}. View ${album.photos.length} photos` : `${label}. View photo`}
      className="group block w-full cursor-pointer text-left"
    >
      {body}
    </button>
  );
}
