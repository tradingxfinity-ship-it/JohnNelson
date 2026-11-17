"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { salePins } from "@/content/sales";

const COLORS = { sold: "#1C2B4A", forSale: "#B8925A" };

/** Leaflet map of sale pins. Loaded only in the browser (see SalesMap). */
export default function SalesMapClient({
  reserveBottomLeft,
}: {
  /** Space (px) to keep clear of pins in the bottom-left corner, e.g. for a card laid over the map */
  reserveBottomLeft?: [number, number];
} = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const map = L.map(ref.current, {
      scrollWheelZoom: false,
      zoomAnimation: !reduceMotion,
      fadeAnimation: !reduceMotion,
      markerZoomAnimation: !reduceMotion,
      attributionControl: true,
    });

    // OpenStreetMap's free tiles suit a low-traffic site; switch providers if traffic grows (see README)
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 14,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const bounds = L.latLngBounds([]);
    // Draw sold pins first so for-sale pins sit on top
    for (const pin of [...salePins].sort((a, b) => Number(a.status === "forSale") - Number(b.status === "forSale"))) {
      const marker = L.circleMarker([pin.lat, pin.lng], {
        radius: pin.status === "forSale" ? 9 : 7,
        color: "#FFFFFF",
        weight: 2,
        fillColor: COLORS[pin.status],
        fillOpacity: 1,
      }).addTo(map);

      const title = pin.status === "sold" ? "Sold" : "For sale";
      const lines = [
        `<strong>${title}${pin.date ? ` · ${pin.date}` : ""}</strong>`,
        pin.place,
        pin.details,
      ].filter(Boolean);
      marker.bindPopup(lines.join("<br>"), { closeButton: false });
      bounds.extend([pin.lat, pin.lng]);
    }

    // Only reserve the corner when the map is wide enough to spare it
    const [reserveX, reserveY] = reserveBottomLeft && ref.current.clientWidth > 560 ? reserveBottomLeft : [0, 0];
    map.fitBounds(bounds, { paddingTopLeft: [32 + reserveX, 32], paddingBottomRight: [32, 32 + reserveY], maxZoom: 11 });
    return () => {
      map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className="sales-map h-full w-full" />;
}
