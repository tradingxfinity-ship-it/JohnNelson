"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { portfolio } from "@/content/portfolio";
import { site } from "@/content/site";
import { Container } from "./ui";

const INTERVAL_MS = 5500;

// Large, recent home photos for the background
const slides = portfolio.filter((h) => h.width >= 1152 && !h.details.includes("Land")).slice(0, 6);

/**
 * Portfolio page hero: sold homes cross-fade behind the title and stats with a
 * slow zoom. Kept short so the first row of homes shows below it. Pauses with
 * the button or when the tab is hidden; stays still for reduced-motion visitors.
 */
export function PortfolioHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || slides.length < 2) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion]);

  const communities = new Set(portfolio.map((h) => h.city)).size;
  const stats = [
    ...site.stats,
    { value: `${site.zillow.rating}`, label: `Zillow rating, ${site.zillow.reviewCount} reviews` },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-blue text-white">
      {/* Background carousel */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {slides.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            className={`object-cover transition-[opacity,transform] ease-out motion-reduce:transition-none ${
              i === index ? "scale-100 opacity-100" : "scale-[1.08] opacity-0"
            } duration-[1400ms,7000ms] motion-reduce:scale-100`}
          />
        ))}
        {/* Flat blue wash keeps the text readable on any photo */}
        <div className="absolute inset-0 bg-blue/60" />
      </div>

      <Container className="relative flex min-h-[clamp(300px,34vh,380px)] flex-col justify-end pb-8 pt-14 sm:pb-10">
        {!reduceMotion && slides.length > 1 && (
          <div className="absolute right-5 top-5 flex items-center gap-3 sm:right-6 sm:top-6">
            <div className="flex gap-1.5" aria-hidden>
              {slides.map((s, i) => (
                <span
                  key={s.src}
                  className={`h-1 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-white" : "w-2 bg-white/45"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/30 hover:bg-white/10"
            >
              <span className="sr-only">{paused ? "Play background photos" : "Pause background photos"}</span>
              {paused ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <path d="M2.5 1.5v9l8-4.5z" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <path d="M2 1.5h3v9H2zM7 1.5h3v9H7z" />
                </svg>
              )}
            </button>
          </div>
        )}

        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="flex items-center gap-3 text-sm font-medium text-white/85">
              <span aria-hidden className="h-px w-8 bg-red-light" />
              {portfolio.length} homes across {communities} communities
            </p>
            <h1 className="mt-3 text-[3.5rem] font-semibold leading-[0.9] tracking-[-0.045em] text-white sm:text-[5.5rem] lg:text-[7rem]">
              Portfolio
            </h1>
          </div>

          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:w-[620px] lg:shrink-0">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col-reverse justify-end rounded-md border border-white/25 bg-blue/40 px-4 py-3 backdrop-blur-sm"
              >
                <dt className="mt-1 text-xs leading-snug text-white/75">{s.label}</dt>
                <dd className="text-2xl font-medium tracking-[-0.03em] text-red-light sm:text-[1.75rem]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
