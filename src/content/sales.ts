/**
 * Map pins for the “Homes we’ve sold” map, from the team’s Zillow profile (November 2026).
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
  { lat: 29.93, lng: -98.09, status: "sold", date: "Sep 2026", place: "San Marcos", details: "3 bd · 2 ba" },
  { lat: 29.53, lng: -98.51, status: "sold", date: "Jul 2026", place: "San Antonio", details: "3 bd · 2 ba" },
  { lat: 29.6, lng: -98.53, status: "sold", date: "May 2026" },
  { lat: 29.58, lng: -98.63, status: "sold", date: "May 2026" },
  { lat: 29.44, lng: -98.68, status: "sold", date: "Feb 2026" },
  { lat: 29.54, lng: -98.55, status: "sold", date: "Feb 2026" },
  { lat: 29.35, lng: -98.03, status: "sold", date: "Oct 2025" },
  { lat: 29.12, lng: -98.86, status: "sold", date: "Jul 2025" },
  { lat: 29.63, lng: -98.22, status: "sold", date: "May 2025" },
  { lat: 29.58, lng: -98.62, status: "sold", date: "Mar 2025" },
  { lat: 29.88, lng: -98.27, status: "sold", date: "Feb 2025" },
  { lat: 29.57, lng: -98.61, status: "sold" },
  { lat: 29.46, lng: -98.73, status: "forSale", place: "San Antonio", details: "12107 Carson Cove · $332,500" },
  { lat: 29.57, lng: -98.53, status: "forSale", place: "San Antonio", details: "2210 Knights Wood · $285,000" },
  { lat: 29.85, lng: -98.28, status: "forSale", place: "Canyon Lake", details: "1645 Whispering Hills, Lot 67 · $69,000" },
];
