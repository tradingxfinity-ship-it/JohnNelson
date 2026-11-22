"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";

/**
 * Hero search: a visitor types an area and picks Buy or Rent, and lands on that
 * page with the area already filled into the inquiry form (see InquiryForm).
 */
export function HeroSearch() {
  const router = useRouter();
  const id = useId();
  const [intent, setIntent] = useState<"buy" | "rent">("buy");
  const [area, setArea] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = area.trim();
    router.push(`/${intent}${q ? `?area=${encodeURIComponent(q)}` : ""}#contact`);
  };

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className="mt-8 flex items-stretch rounded-lg border border-line bg-white p-2 shadow-sm focus-within:border-blue"
    >
      <label htmlFor={`${id}-intent`} className="sr-only">
        Looking to
      </label>
      <select
        id={`${id}-intent`}
        value={intent}
        onChange={(e) => setIntent(e.target.value as "buy" | "rent")}
        className="select-chevron shrink-0 rounded-sm border-r border-line bg-transparent py-3 pl-3 pr-9 text-base font-medium text-blue focus:outline-none sm:pl-4 sm:text-lg"
      >
        <option value="buy">Buy</option>
        <option value="rent">Rent</option>
      </select>
      <label htmlFor={`${id}-area`} className="sr-only">
        City, neighborhood, or ZIP code
      </label>
      <input
        id={`${id}-area`}
        type="search"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        placeholder="Find your next property"
        autoComplete="off"
        maxLength={120}
        className="w-0 min-w-0 flex-1 bg-transparent px-3 text-base text-blue placeholder:text-slate/70 focus:outline-none sm:px-4 sm:text-lg"
      />
      <button
        type="submit"
        className="inline-flex min-h-14 shrink-0 items-center gap-2 rounded-md bg-blue px-5 text-base font-medium text-white transition-colors hover:bg-red sm:px-7 sm:text-lg"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <circle cx="9" cy="9" r="6" />
          <path d="M13.5 13.5L18 18" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <span className="sr-only sm:hidden">Search</span>
      </button>
    </form>
  );
}
