"use client";

import Image from "next/image";
import type { ListingPhoto } from "@/lib/listings";
import { openPhotoViewer } from "./AlbumViewer";

/** A listing's lead photo with up to four more beside it; any photo opens the full gallery. */
export function ListingGallery({ photos, title }: { photos: ListingPhoto[]; title: string }) {
  if (photos.length === 0) return <div className="aspect-[16/9] rounded-lg bg-cloud" />;
  const viewer = photos.map((p, i) => ({
    src: p.url,
    width: p.width ?? 1200,
    height: p.height ?? 900,
    title,
    subtitle: `Photo ${i + 1} of ${photos.length}`,
  }));
  const open = (i: number) => openPhotoViewer(title, viewer, i, photos.length > 1 ? "gallery" : "single");
  const thumbs = photos.slice(1, 5);

  return (
    <div className={`grid gap-2 ${thumbs.length ? "lg:grid-cols-[2fr_1fr]" : ""}`}>
      <Tile
        photo={photos[0]}
        onClick={() => open(0)}
        label={`View photos of ${title}`}
        className={thumbs.length ? "aspect-[4/3]" : "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"}
        priority
      />
      {thumbs.length > 0 && (
        <div className="hidden grid-cols-2 gap-2 lg:grid">
          {thumbs.map((p, i) => (
            <Tile
              key={p.url}
              photo={p}
              onClick={() => open(i + 1)}
              label={`View photo ${i + 2}`}
              className="aspect-[4/3]"
              more={i === thumbs.length - 1 && photos.length > 5 ? photos.length - 5 : 0}
            />
          ))}
        </div>
      )}
      {photos.length > 1 && (
        <button
          type="button"
          onClick={() => open(0)}
          aria-haspopup="dialog"
          className="justify-self-start text-sm font-medium text-blue underline-offset-4 hover:underline lg:hidden"
        >
          View all {photos.length} photos →
        </button>
      )}
    </div>
  );
}

function Tile({
  photo,
  onClick,
  label,
  className,
  priority = false,
  more = 0,
}: {
  photo: ListingPhoto;
  onClick: () => void;
  label: string;
  className: string;
  priority?: boolean;
  more?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label={label}
      className={`group relative block w-full overflow-hidden rounded-lg bg-cloud ${className}`}
    >
      <Image
        src={photo.url}
        alt=""
        fill
        priority={priority}
        unoptimized={photo.url.startsWith("http")}
        sizes="(min-width: 1024px) 760px, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
      />
      {more > 0 && (
        <span className="absolute inset-0 flex items-center justify-center bg-blue/60 text-lg font-medium text-white">
          +{more} photos
        </span>
      )}
    </button>
  );
}
