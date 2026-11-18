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
      className="mt-6 flex items-stretch rounded-md border border-line bg-white p-1.5 focus-within:border-navy"
    >
      <label htmlFor={`${id}-intent`} className="sr-only">
        Looking to
      </label>
      <select
        id={`${id}-intent`}
        value={intent}
        onChange={(e) => setIntent(e.target.value as "buy" | "rent")}
        className="select-chevron shrink-0 rounded-sm border-r border-line bg-transparent py-2 pl-3 pr-9 text-[15px] font-medium text-navy focus:outline-none"
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
        placeholder="City or ZIP code"
        autoComplete="off"
        maxLength={120}
        className="w-0 min-w-0 flex-1 bg-transparent px-3 text-[15px] text-navy placeholder:text-slate/70 focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm bg-navy px-4 text-[15px] font-medium text-gold-light transition-colors hover:bg-navy-hover hover:text-white sm:px-5"
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <circle cx="9" cy="9" r="6" />
          <path d="M13.5 13.5L18 18" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <span className="sr-only sm:hidden">Search</span>
      </button>
    </form>
  );
}
