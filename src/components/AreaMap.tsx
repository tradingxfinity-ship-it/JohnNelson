"use client";

import dynamic from "next/dynamic";

/** The sales map (Leaflet), loaded only in the browser. */
export const AreaMap = dynamic(() => import("./SalesMapClient"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-ivory" />,
});
