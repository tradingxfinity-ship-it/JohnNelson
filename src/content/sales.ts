/**
 * Map pins for the “Homes we’ve sold” map: the 82 sales with locations on the team’s
 * Zillow profile map (its most recent 100 sales), plus current listings (November 2026).
 *
 * Coordinates are rounded to two decimal places (about 1 km) so the map shows the
 * area of each sale without pinpointing past clients’ homes. Keep that rounding
 * when adding sales. `place` is optional; leave it out when unsure.
 */

export type SalePin = {
  lat: number;
  lng: number;
  status: "sold" | "forSale";
  /** Month and year sold, e.g. "Sep 2026" */
  date?: string;
  place?: string;
  details?: string;
};

/** Total homes sold, as shown on the Zillow profile */
export const totalSold = 294;
export const salesAsOf = "November 2026";

export const salePins: SalePin[] = [
  { lat: 29.41, lng: -98.74, status: "sold" },
  { lat: 29.46, lng: -98.52, status: "sold" },
  { lat: 29.45, lng: -98.58, status: "sold" },
  { lat: 29.48, lng: -98.67, status: "sold" },
  { lat: 29.48, lng: -98.67, status: "sold" },
  { lat: 29.31, lng: -98.53, status: "sold" },
  { lat: 29.56, lng: -98.56, status: "sold" },
  { lat: 29.34, lng: -98.5, status: "sold" },
  { lat: 29.63, lng: -98.64, status: "sold" },
  { lat: 29.9, lng: -98.26, status: "sold" },
  { lat: 29.53, lng: -98.55, status: "sold", date: "Feb 2026" },
  { lat: 29.56, lng: -98.51, status: "sold" },
  { lat: 29.55, lng: -98.54, status: "sold" },
  { lat: 29.55, lng: -98.3, status: "sold" },
  { lat: 29.54, lng: -98.69, status: "sold" },
  { lat: 29.51, lng: -98.58, status: "sold" },
  { lat: 29.37, lng: -98.41, status: "sold" },
  { lat: 29.91, lng: -98.19, status: "sold" },
  { lat: 29.54, lng: -98.63, status: "sold" },
  { lat: 29.48, lng: -98.37, status: "sold" },
  { lat: 29.92, lng: -98.28, status: "sold" },
  { lat: 29.52, lng: -98.66, status: "sold" },
  { lat: 29.54, lng: -98.45, status: "sold" },
  { lat: 29.92, lng: -98.28, status: "sold" },
  { lat: 29.48, lng: -98.31, status: "sold" },
  { lat: 29.5, lng: -98.64, status: "sold" },
  { lat: 29.57, lng: -98.51, status: "sold" },
  { lat: 29.56, lng: -98.51, status: "sold" },
  { lat: 29.86, lng: -98.29, status: "sold" },
  { lat: 29.86, lng: -98.29, status: "sold" },
  { lat: 29.86, lng: -98.29, status: "sold" },
  { lat: 29.45, lng: -98.35, status: "sold" },
  { lat: 29.86, lng: -98.29, status: "sold" },
  { lat: 29.53, lng: -98.64, status: "sold" },
  { lat: 29.43, lng: -98.71, status: "sold" },
  { lat: 29.45, lng: -98.17, status: "sold" },
  { lat: 29.86, lng: -98.26, status: "sold" },
  { lat: 29.5, lng: -98.75, status: "sold" },
  { lat: 29.61, lng: -98.22, status: "sold", date: "May 2025" },
  { lat: 29.68, lng: -98.46, status: "sold" },
  { lat: 29.59, lng: -97.99, status: "sold" },
  { lat: 29.57, lng: -98.45, status: "sold" },
  { lat: 29.53, lng: -98.52, status: "sold", date: "Jul 2026", place: "San Antonio", details: "3 bd · 2 ba" },
  { lat: 29.62, lng: -98.48, status: "sold" },
  { lat: 29.5, lng: -98.44, status: "sold" },
  { lat: 29.85, lng: -98.26, status: "sold" },
  { lat: 29.91, lng: -98.28, status: "sold" },
  { lat: 29.91, lng: -98.28, status: "sold" },
  { lat: 29.47, lng: -98.73, status: "sold" },
  { lat: 29.87, lng: -98.27, status: "sold", date: "Feb 2025" },
  { lat: 29.57, lng: -98.57, status: "sold" },
  { lat: 29.91, lng: -98.24, status: "sold" },
  { lat: 29.91, lng: -98.28, status: "sold" },
  { lat: 29.52, lng: -98.54, status: "sold" },
  { lat: 29.92, lng: -98.24, status: "sold" },
  { lat: 29.5, lng: -98.58, status: "sold" },
  { lat: 29.92, lng: -98.24, status: "sold" },
  { lat: 29.91, lng: -98.24, status: "sold" },
  { lat: 29.66, lng: -98.13, status: "sold" },
  { lat: 29.59, lng: -97.99, status: "sold" },
  { lat: 29.92, lng: -98.33, status: "sold" },
  { lat: 29.92, lng: -98.33, status: "sold" },
  { lat: 29.87, lng: -98.26, status: "sold" },
  { lat: 29.45, lng: -98.59, status: "sold" },
  { lat: 29.68, lng: -98.46, status: "sold" },
  { lat: 29.87, lng: -98.27, status: "sold" },
  { lat: 29.85, lng: -98.27, status: "sold" },
  { lat: 29.51, lng: -98.62, status: "sold" },
  { lat: 29.58, lng: -98.45, status: "sold" },
  { lat: 29.52, lng: -98.37, status: "sold" },
  { lat: 29.55, lng: -98.61, status: "sold" },
  { lat: 29.87, lng: -98.26, status: "sold" },
  { lat: 29.57, lng: -98.61, status: "sold" },
  { lat: 29.61, lng: -98.22, status: "sold" },
  { lat: 29.11, lng: -98.85, status: "sold", date: "Jul 2025" },
  { lat: 29.34, lng: -98.03, status: "sold", date: "Oct 2025" },
  { lat: 29.54, lng: -98.54, status: "sold" },
  { lat: 29.44, lng: -98.67, status: "sold", date: "Feb 2026" },
  { lat: 29.57, lng: -98.63, status: "sold", date: "May 2026" },
  { lat: 29.6, lng: -98.53, status: "sold", date: "May 2026" },
  { lat: 29.53, lng: -98.51, status: "sold" },
  { lat: 29.92, lng: -98.08, status: "sold", date: "Sep 2026", place: "San Marcos", details: "3 bd · 2 ba" },
  { lat: 29.46, lng: -98.73, status: "forSale", place: "San Antonio", details: "12107 Carson Cove · $332,500" },
  { lat: 29.57, lng: -98.53, status: "forSale", place: "San Antonio", details: "2210 Knights Wood · $285,000" },
  { lat: 29.85, lng: -98.28, status: "forSale", place: "Canyon Lake", details: "1645 Whispering Hills, Lot 67 · $69,000" },
];
