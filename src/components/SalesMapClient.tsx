"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { salePins } from "@/content/sales";

const COLORS = { sold: "#14283F", forSale: "#B88A47" };

/** Leaflet map of sale pins. Loaded only in the browser (see SalesMap). */
export default function SalesMapClient() {
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

    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 11 });
    return () => {
      map.remove();
    };
  }, []);

  return <div ref={ref} className="sales-map h-full w-full" />;
}
