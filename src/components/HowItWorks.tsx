"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { HowFlow, HowIcon } from "@/content/howItWorks";
import { site } from "@/content/site";

/** Seconds each slide stays up while playing. The progress bar's animation drives the timing. */
const STEP_SECONDS = 6.5;
const INTRO_SECONDS = 3.2;

/**
 * "How it works" button and animated walkthrough pop-up.
 *
 * Slides: an intro with the logo mark, one slide per step (an icon that draws
 * itself, with the logo traveling along a road to that step), and a "Welcome
 * home" finale with the full logo. It plays on its own until the visitor
 * steps through it themselves; visitors who prefer reduced motion get no
 * autoplay or movement.
 */
export function HowItWorks({ flow }: { flow: HowFlow }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [slide, setSlide] = useState(0);
  const [playing, setPlaying] = useState(false);
  const titleId = useId();
  const n = flow.steps.length;
  const last = n + 1; // 0 = intro, 1..n = steps, n + 1 = finale
  const stepIndex = slide - 1; // -1 on the intro

  const open = () => {
    setSlide(0);
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);

  const go = useCallback(
    (to: number, manual = true) => {
      setSlide(Math.max(0, Math.min(last, to)));
      if (manual) setPlaying(false);
    },
    [last],
  );

  // Arrow keys step through while the dialog is open
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(slide + 1);
      if (e.key === "ArrowLeft") go(slide - 1);
    };
    d.addEventListener("keydown", onKey);
    return () => d.removeEventListener("keydown", onKey);
  }, [go, slide]);

  const onAction = (href: string) => {
    if (!href.startsWith("#")) return;
    close();
    const target = document.querySelector<HTMLElement>(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => target?.querySelector<HTMLElement>("input, select, textarea")?.focus({ preventScroll: true }), 500);
  };

  const step = stepIndex >= 0 && stepIndex < n ? flow.steps[stepIndex] : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="group mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-white py-2 pl-2 pr-5 text-[15px] font-medium text-blue shadow-sm transition-colors hover:border-blue"
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue text-white transition-colors group-hover:bg-red">
          <span aria-hidden className="hiw-pulse absolute inset-0 rounded-full bg-blue/40" />
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden fill="currentColor" className="relative translate-x-px">
            <path d="M3 1.5v11l9-5.5z" />
          </svg>
        </span>
        {flow.label}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => {
          setPlaying(false);
          triggerRef.current?.focus();
        }}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[min(980px,calc(100vw-24px))] max-w-none overflow-hidden rounded-2xl bg-white p-0 text-slate shadow-2xl backdrop:bg-blue/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex max-h-[calc(100dvh-24px)] flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-7">
            <p id={titleId} className="flex items-center gap-3 text-sm font-medium text-blue">
              <span aria-hidden className="h-px w-6 bg-red" />
              {flow.label}
            </p>
            <button
              type="button"
              onClick={close}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-blue hover:bg-cloud"
            >
              <span className="sr-only">Close</span>
              <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>

          {/* Story-style progress: the active bar's fill animation advances the slides */}
          <div className="relative flex gap-1.5 px-5 pt-4 sm:px-7" aria-hidden>
            {flow.steps.map((s, i) => (
              <span key={s.title} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                {i < stepIndex || slide === last ? (
                  <span className="block h-full w-full bg-red" />
                ) : i === stepIndex ? (
                  <span
                    key={slide}
                    className="hiw-fill block h-full w-full bg-red"
                    style={{ "--dur": `${STEP_SECONDS}s`, animationPlayState: playing ? "running" : "paused" } as CSSProperties}
                    onAnimationEnd={() => playing && go(slide + 1, false)}
                  />
                ) : null}
              </span>
            ))}
            {slide === 0 && (
              <span
                key="intro"
                className="hiw-fill pointer-events-none absolute h-px w-px opacity-0"
                style={{ "--dur": `${INTRO_SECONDS}s`, animationPlayState: playing ? "running" : "paused" } as CSSProperties}
                onAnimationEnd={() => playing && go(1, false)}
              />
            )}
          </div>

          {/* Slide */}
          <div key={slide} className="grid flex-1 gap-0 p-4 sm:p-7 md:grid-cols-[5fr_6fr] md:gap-8">
            {/* Stage */}
            <div className="hiw-stage relative isolate flex min-h-[160px] items-center justify-center overflow-hidden rounded-xl bg-blue sm:min-h-[300px]">
              <span aria-hidden className="hiw-glow absolute inset-0 -z-10" />
              {slide === 0 && <LogoMark />}
              {step && (
                <>
                  <span
                    aria-hidden
                    className="hiw-num absolute left-5 top-3 text-[4rem] font-semibold leading-none tracking-[-0.06em] text-white sm:text-[7rem]"
                  >
                    0{stepIndex + 1}
                  </span>
                  <Icon name={step.icon} />
                </>
              )}
              {slide === last && <Finale />}
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center px-1 pt-4 sm:pt-6 md:pt-0" aria-live="polite">
              {slide === 0 && (
                <>
                  <p className="hiw-rise text-sm font-medium text-red" style={{ "--d": ".35s" } as CSSProperties}>
                    {site.brokerage.team}
                  </p>
                  <h2 className="hiw-rise mt-3 text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl" style={{ "--d": ".45s" } as CSSProperties}>
                    {flow.introTitle}
                  </h2>
                  <p className="hiw-rise mt-4 text-lg leading-relaxed" style={{ "--d": ".6s" } as CSSProperties}>
                    {flow.introBody}
                  </p>
                  <div className="hiw-rise mt-7" style={{ "--d": ".75s" } as CSSProperties}>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      className="inline-flex min-h-12 items-center gap-2 rounded-md bg-blue px-6 font-medium text-white transition-colors hover:bg-red"
                    >
                      Show me the steps <span aria-hidden>→</span>
                    </button>
                  </div>
                </>
              )}
              {step && (
                <>
                  <p className="hiw-rise text-sm font-medium text-red" style={{ "--d": ".1s" } as CSSProperties}>
                    Step {stepIndex + 1} of {n}
                  </p>
                  <h2 className="hiw-rise mt-2 text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl" style={{ "--d": ".2s" } as CSSProperties}>
                    {step.title}
                  </h2>
                  <p className="hiw-rise mt-3 text-base leading-relaxed sm:mt-4 sm:text-lg" style={{ "--d": ".35s" } as CSSProperties}>
                    {step.body}
                  </p>
                  <p
                    className="hiw-rise mt-4 flex gap-3 rounded-lg bg-cloud p-3 text-sm leading-relaxed text-blue sm:mt-6 sm:p-4 sm:text-[15px]"
                    style={{ "--d": ".55s" } as CSSProperties}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" className="mt-0.5 shrink-0 text-red">
                      <path d="M10 2.5a5.5 5.5 0 0 0-3 10.1V15h6v-2.4a5.5 5.5 0 0 0-3-10.1zM8 17.5h4" />
                    </svg>
                    <span>
                      <span className="font-medium">Tip: </span>
                      {step.tip}
                    </span>
                  </p>
                </>
              )}
              {slide === last && (
                <>
                  <h2 className="hiw-rise text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl" style={{ "--d": ".5s" } as CSSProperties}>
                    {flow.finaleTitle}
                  </h2>
                  <p className="hiw-rise mt-4 text-lg leading-relaxed" style={{ "--d": ".65s" } as CSSProperties}>
                    {flow.finaleBody}
                  </p>
                  <div className="hiw-rise mt-7 flex flex-col gap-3 sm:flex-row" style={{ "--d": ".8s" } as CSSProperties}>
                    {flow.actions.map((a, i) =>
                      a.href.startsWith("#") ? (
                        <button
                          key={a.href}
                          type="button"
                          onClick={() => onAction(a.href)}
                          className={actionClass(i)}
                        >
                          {a.label}
                        </button>
                      ) : (
                        <Link key={a.href} href={a.href} onClick={close} className={actionClass(i)}>
                          {a.label}
                        </Link>
                      ),
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* The road: the logo travels from step to step */}
          <div className="px-5 pb-2 sm:px-7">
            <Road steps={flow.steps.map((s) => s.title)} active={stepIndex} done={slide === last} onPick={(i) => go(i + 1)} />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3 sm:px-7">
            <button
              type="button"
              onClick={() => go(slide - 1)}
              disabled={slide === 0}
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-[15px] font-medium text-blue hover:bg-cloud disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <span aria-hidden>←</span> Back
            </button>
            {slide < last && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-blue hover:border-blue"
              >
                <span className="sr-only">{playing ? "Pause" : "Play"}</span>
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden fill="currentColor">
                    <path d="M3 2h3v10H3zM8 2h3v10H8z" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden fill="currentColor" className="translate-x-px">
                    <path d="M3 1.5v11l9-5.5z" />
                  </svg>
                )}
              </button>
            )}
            {slide < last ? (
              <button
                type="button"
                onClick={() => go(slide + 1)}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-blue px-5 text-[15px] font-medium text-white transition-colors hover:bg-red"
              >
                {slide === n ? "Finish" : "Next"} <span aria-hidden>→</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => go(0)}
                className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-[15px] font-medium text-blue hover:bg-cloud"
              >
                Watch again <span aria-hidden>↺</span>
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

const actionClass = (i: number) =>
  i === 0
    ? "inline-flex min-h-12 items-center justify-center rounded-md bg-blue px-6 font-medium text-white transition-colors hover:bg-red"
    : "inline-flex min-h-12 items-center justify-center rounded-md border border-blue px-6 font-medium text-blue transition-colors hover:bg-blue hover:text-white";

/** Intro: the logo's N-house mark scales in on a white tile, with a light sweep across it. */
function LogoMark() {
  return (
    <div className="relative">
      <span aria-hidden className="hiw-ring absolute inset-0 rounded-2xl border-2 border-white/60" />
      <span aria-hidden className="hiw-ring absolute inset-0 rounded-2xl border-2 border-red-light/70" style={{ animationDelay: ".35s" }} />
      <div className="hiw-logo hiw-shine relative overflow-hidden rounded-2xl bg-white p-5 shadow-xl sm:p-6">
        <Image src="/images/logo-mark.png" alt="" width={880} height={548} sizes="240px" className="h-auto w-[140px] sm:w-[220px]" priority />
      </div>
    </div>
  );
}

/** Finale: the full logo pops in with rings and a key. */
function Finale() {
  return (
    <div className="relative flex flex-col items-center">
      <span aria-hidden className="hiw-ring absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/50" />
      <span
        aria-hidden
        className="hiw-ring absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-light/70"
        style={{ animationDelay: ".4s" }}
      />
      <div className="hiw-logo hiw-shine relative overflow-hidden rounded-2xl bg-white p-4 shadow-xl">
        {site.logo && (
          <Image src={site.logo.src} alt="" width={site.logo.width} height={site.logo.height} sizes="220px" className="h-auto w-[130px] sm:w-[210px]" />
        )}
      </div>
      <svg width="64" height="40" viewBox="0 0 64 40" aria-hidden fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="hiw-swing mt-4">
        <path pathLength={1} className="hiw-draw" style={{ "--d": ".7s" } as CSSProperties} d="M6 20a10 10 0 1 0 20 0a10 10 0 1 0 -20 0" />
        <path pathLength={1} className="hiw-draw" style={{ "--d": "1s" } as CSSProperties} d="M26 20h32M50 20v8M57 20v6" />
      </svg>
    </div>
  );
}

/** Road along the bottom: a dot per step, filled up to the current one, with the logo mark riding along. */
function Road({ steps, active, done, onPick }: { steps: string[]; active: number; done: boolean; onPick: (i: number) => void }) {
  const n = steps.length;
  const pos = done ? 1 : Math.max(0, active) / (n - 1);
  return (
    <div className="relative mx-4 h-16 sm:mx-8">
      <span aria-hidden className="absolute inset-x-0 top-8 h-0.5 rounded-full bg-line" />
      <span
        aria-hidden
        className="absolute left-0 top-8 h-0.5 origin-left rounded-full bg-red transition-[width] duration-700 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none"
        style={{ width: active < 0 && !done ? "0%" : `${pos * 100}%` }}
      />
      <ol className="absolute inset-x-0 top-8">
        {steps.map((title, i) => {
          const reached = done || i <= active;
          return (
            <li key={title} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(i / (n - 1)) * 100}%` }}>
              <button
                type="button"
                onClick={() => onPick(i)}
                aria-label={`Step ${i + 1}: ${title}`}
                aria-current={i === active ? "step" : undefined}
                className="flex h-8 w-8 items-center justify-center"
              >
                <span
                  className={`block h-3 w-3 rounded-full border-2 transition-colors duration-500 ${
                    reached ? "border-red bg-red" : "border-line bg-white"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ol>
      {/* The traveler: the logo's N-house mark */}
      <span
        aria-hidden
        className={`absolute top-0 flex h-9 w-12 -translate-x-1/2 items-center justify-center rounded-lg bg-white shadow-md ring-1 ring-line transition-[left,opacity] duration-700 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none ${
          active < 0 && !done ? "opacity-0" : "opacity-100"
        }`}
        style={{ left: `${pos * 100}%`, top: "-6px" }}
      >
        <Image src="/images/logo-mark.png" alt="" width={880} height={548} sizes="44px" className="hiw-bob h-auto w-10" />
      </span>
    </div>
  );
}

/** Step icons, drawn line by line. Each path has pathLength=1 so the draw animation works for any shape. */
function Icon({ name }: { name: HowIcon }) {
  const paths: Record<HowIcon, string[]> = {
    approval: ["M18 8h22l10 10v38H18z", "M40 8v10h10", "M24 28h18", "M24 36h12", "M36 50a8 8 0 1 0 16 0a8 8 0 1 0 -16 0", "M40 50l3 3 6-6"],
    wishlist: ["M32 58s-17-15.5-17-29a17 17 0 0 1 34 0c0 13.5-17 29-17 29z", "M32 36l-6-6a4 4 0 0 1 6-5.3 4 4 0 0 1 6 5.3z"],
    tour: ["M8 31L32 11l24 20", "M15 26v30h34V26", "M27 56V41h10v15", "M19 33h6v6h-6z", "M39 33h6v6h-6z"],
    offer: ["M12 8h28v48H12z", "M18 18h16", "M18 26h16", "M18 34h9", "M36 50l17-17 4.5 4.5-17 17-7 2.5z", "M48 38l4.5 4.5"],
    inspect: ["M16 12h32v46H16z", "M25 7h14v9H25z", "M22 30l3.5 3.5 6-6", "M36 31h7", "M22 44l3.5 3.5 6-6", "M36 45h7"],
    keys: ["M8 32a11 11 0 1 0 22 0a11 11 0 1 0 -22 0", "M14 32a5 5 0 1 0 10 0a5 5 0 1 0 -10 0", "M30 32h26", "M47 32v8", "M54 32v6"],
  };
  return (
    <svg viewBox="0 0 64 64" aria-hidden fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="hiw-float relative h-24 w-24 sm:h-40 sm:w-40">
      {paths[name].map((d, i) => (
        <path key={d} d={d} pathLength={1} className="hiw-draw" style={{ "--d": `${0.15 + i * 0.22}s` } as CSSProperties} />
      ))}
      {/* A red accent dot settles once the icon is drawn */}
      <circle cx="52" cy="12" r="3.5" fill="var(--color-red-light)" stroke="none" className="hiw-pop" style={{ "--d": `${0.3 + paths[name].length * 0.22}s` } as CSSProperties} />
    </svg>
  );
}
