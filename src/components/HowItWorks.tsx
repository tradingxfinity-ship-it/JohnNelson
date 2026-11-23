"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { HowFlow } from "@/content/howItWorks";
import { site } from "@/content/site";
import { Scene } from "./HowScenes";

/** Seconds each slide stays up while playing. The progress bar's animation drives the timing. */
const STEP_SECONDS = 8;
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
  // 1 when moving forward, -1 when going back: slides enter from that side
  const [dir, setDir] = useState(1);
  const titleId = useId();
  const n = flow.steps.length;
  const last = n + 1; // 0 = intro, 1..n = steps, n + 1 = finale
  const stepIndex = slide - 1; // -1 on the intro

  const open = () => {
    setSlide(0);
    setDir(1);
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);

  const go = useCallback(
    (to: number, manual = true) => {
      const next = Math.max(0, Math.min(last, to));
      setDir(next >= slide ? 1 : -1);
      setSlide(next);
      if (manual) setPlaying(false);
    },
    [last, slide],
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
  // Tip slides aren't numbered: steps count from the first non-tip slide
  const isTip = step?.kind === "tip";
  const numbered = flow.steps.filter((s) => s.kind !== "tip").length;
  const stepNumber = step ? flow.steps.slice(0, stepIndex + 1).filter((s) => s.kind !== "tip").length : 0;

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
        className="m-auto w-[min(1000px,calc(100vw-24px))] max-w-none overflow-hidden rounded-2xl bg-blue p-0 text-white shadow-2xl backdrop:bg-[#000d24]/75 backdrop:backdrop-blur-sm"
      >
        <div className="flex max-h-[calc(100dvh-24px)] flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b border-white/15 px-5 py-3 sm:px-7">
            <p id={titleId} className="flex items-center gap-3 text-sm font-medium text-white">
              <span aria-hidden className="h-px w-6 bg-white/60" />
              {flow.label}
            </p>
            <button
              type="button"
              onClick={close}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
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
              <span key={s.title} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                {i < stepIndex || slide === last ? (
                  <span className="block h-full w-full bg-white" />
                ) : i === stepIndex ? (
                  <span
                    key={slide}
                    className="hiw-fill block h-full w-full bg-white"
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
            <div className="hiw-stage relative isolate flex min-h-[186px] items-center justify-center overflow-hidden rounded-xl bg-white px-3 py-3 sm:py-4 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.5)] sm:min-h-[330px]">
              <span aria-hidden className="hiw-dots absolute inset-0 -z-10" />
              <span aria-hidden className="hiw-orb absolute -left-12 -top-12 -z-10 h-44 w-44 rounded-full bg-[#DCE6F4] blur-2xl" />
              <span aria-hidden className="hiw-orb absolute -bottom-14 -right-10 -z-10 h-48 w-48 rounded-full bg-[#E8EEF8] blur-2xl" style={{ animationDelay: "-3s" }} />
              {slide === 0 && <LogoMark />}
              {step && (
                <>
                  {isTip ? (
                    <span className="hiw-rise absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-blue px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white shadow-md" style={{ "--d": ".2s" } as CSSProperties}>
                      <Bulb className="h-3.5 w-3.5" />
                      Tip
                    </span>
                  ) : null}
                  <span
                    aria-hidden
                    className="hiw-num absolute left-4 top-2 text-[3.5rem] font-semibold leading-none tracking-[-0.06em] text-blue sm:text-[6rem]"
                  >
                    {isTip ? <Bulb className="h-14 w-14 sm:h-24 sm:w-24" /> : `0${stepNumber}`}
                  </span>
                  <div className="hiw-enter relative w-full" style={{ "--dx": `${dir * 48}px` } as CSSProperties}>
                    <Scene name={step.icon} />
                  </div>
                </>
              )}
              {slide === last && <Finale />}
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center px-1 pt-4 sm:pt-6 md:pt-0" aria-live="polite" aria-atomic="true">
              {slide === 0 && (
                <>
                  <p className="hiw-rise text-sm font-medium text-[#A9C1E8]" style={{ "--d": ".35s" } as CSSProperties}>
                    {site.brokerage.team}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl">
                    <Words text={flow.introTitle} start={0.45} />
                  </h2>
                  <p className="hiw-rise mt-4 text-lg leading-relaxed text-white/80" style={{ "--d": ".6s" } as CSSProperties}>
                    {flow.introBody}
                  </p>
                  <div className="hiw-rise mt-7" style={{ "--d": ".75s" } as CSSProperties}>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      className="inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-6 font-medium text-blue transition-colors hover:bg-[#DCE6F4]"
                    >
                      Show me the steps <span aria-hidden>→</span>
                    </button>
                  </div>
                </>
              )}
              {step && (
                <>
                  <p className="hiw-rise text-sm font-medium text-[#A9C1E8]" style={{ "--d": ".1s" } as CSSProperties}>
                    {isTip ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Bulb className="h-4 w-4" /> Tip · Before you start
                      </span>
                    ) : (
                      `Step ${stepNumber} of ${numbered}`
                    )}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl">
                    <Words text={step.title} start={0.15} />
                  </h2>
                  <p className="hiw-rise mt-3 text-base leading-relaxed text-white/80 sm:mt-4 sm:text-lg" style={{ "--d": ".35s" } as CSSProperties}>
                    {step.body}
                  </p>
                  <p
                    className="hiw-rise mt-4 flex gap-3 rounded-lg bg-white/10 p-3 text-sm leading-relaxed text-white sm:mt-6 sm:p-4 sm:text-[15px]"
                    style={{ "--d": ".55s" } as CSSProperties}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" className="mt-0.5 shrink-0 text-[#A9C1E8]">
                      <path d="M10 2.5a5.5 5.5 0 0 0-3 10.1V15h6v-2.4a5.5 5.5 0 0 0-3-10.1zM8 17.5h4" />
                    </svg>
                    <span>
                      <span className="font-medium">{isTip ? "Good to know: " : "Tip: "}</span>
                      {step.tip}
                    </span>
                  </p>
                </>
              )}
              {slide === last && (
                <>
                  <h2 className="text-4xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-5xl">
                    <Words text={flow.finaleTitle} start={0.5} />
                  </h2>
                  <p className="hiw-rise mt-4 text-lg leading-relaxed text-white/80" style={{ "--d": ".65s" } as CSSProperties}>
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
            <Road steps={flow.steps} active={stepIndex} done={slide === last} onPick={(i) => go(i + 1)} />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3 border-t border-white/15 px-5 py-3 sm:px-7">
            <button
              type="button"
              onClick={() => go(slide - 1)}
              disabled={slide === 0}
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-[15px] font-medium text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <span aria-hidden>←</span> Back
            </button>
            {slide < last && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:border-white"
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
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 text-[15px] font-medium text-blue transition-colors hover:bg-[#DCE6F4]"
              >
                {slide === n ? "Finish" : "Next"} <span aria-hidden>→</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => go(0)}
                className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-[15px] font-medium text-white hover:bg-white/10"
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
    ? "inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 font-medium text-blue transition-colors hover:bg-[#DCE6F4]"
    : "inline-flex min-h-12 items-center justify-center rounded-md border border-white/60 px-6 font-medium text-white transition-colors hover:bg-white hover:text-blue";

/** Intro: the logo's N-house mark scales in on a white tile, with a light sweep across it. */
function LogoMark() {
  return (
    <div className="relative">
      <span aria-hidden className="hiw-ring absolute inset-0 rounded-2xl border-2 border-blue/30" />
      <span aria-hidden className="hiw-ring absolute inset-0 rounded-2xl border-2 border-blue/15" style={{ animationDelay: ".35s" }} />
      <div className="hiw-logo hiw-shine relative overflow-hidden rounded-2xl bg-white p-5 shadow-[0_18px_40px_-12px_rgb(0_40_104/0.35)] ring-1 ring-blue/10 sm:p-6">
        <Image src="/images/logo-mark.png" alt="" width={880} height={548} sizes="240px" className="h-auto w-[140px] sm:w-[220px]" priority />
      </div>
    </div>
  );
}

/** Finale: the full logo pops in with rings and a key. */
function Finale() {
  return (
    <div className="relative flex flex-col items-center">
      <span aria-hidden className="hiw-ring absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue/30" />
      <span
        aria-hidden
        className="hiw-ring absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue/15"
        style={{ animationDelay: ".4s" }}
      />
      <div className="hiw-logo hiw-shine relative overflow-hidden rounded-2xl bg-white p-4 shadow-[0_18px_40px_-12px_rgb(0_40_104/0.35)] ring-1 ring-blue/10">
        {site.logo && (
          <Image src={site.logo.src} alt="" width={site.logo.width} height={site.logo.height} sizes="220px" className="h-auto w-[130px] sm:w-[210px]" />
        )}
      </div>
      <svg width="64" height="40" viewBox="0 0 64 40" aria-hidden fill="none" stroke="var(--color-blue)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="hiw-swing mt-4">
        <path pathLength={1} className="hiw-draw" style={{ "--d": ".7s" } as CSSProperties} d="M6 20a10 10 0 1 0 20 0a10 10 0 1 0 -20 0" />
        <path pathLength={1} className="hiw-draw" style={{ "--d": "1s" } as CSSProperties} d="M26 20h32M50 20v8M57 20v6" />
      </svg>
    </div>
  );
}

/** Road along the bottom: a dot per step, filled up to the current one, with the logo mark riding along. */
function Road({ steps, active, done, onPick }: { steps: HowFlow["steps"]; active: number; done: boolean; onPick: (i: number) => void }) {
  const n = steps.length;
  const pos = done ? 1 : Math.max(0, active) / (n - 1);
  return (
    <div className="relative mx-4 h-16 sm:mx-8">
      <span aria-hidden className="absolute inset-x-0 top-8 h-0.5 rounded-full bg-white/20" />
      <span
        aria-hidden
        className="absolute left-0 top-8 h-0.5 origin-left rounded-full bg-white transition-[width] duration-700 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none"
        style={{ width: active < 0 && !done ? "0%" : `${pos * 100}%` }}
      />
      <ol className="absolute inset-x-0 top-8">
        {steps.map(({ title, kind }, i) => {
          const reached = done || i <= active;
          const tip = kind === "tip";
          const num = steps.slice(0, i + 1).filter((s) => s.kind !== "tip").length;
          return (
            <li key={title} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(i / (n - 1)) * 100}%` }}>
              <button
                type="button"
                onClick={() => onPick(i)}
                aria-label={tip ? `Tip: ${title}` : `Step ${num}: ${title}`}
                aria-current={i === active ? "step" : undefined}
                className="flex h-8 w-8 items-center justify-center"
              >
                {tip ? (
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                      reached ? "border-white bg-white text-blue" : "border-white/35 bg-blue text-white/70"
                    }`}
                  >
                    <Bulb className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <span
                    className={`block h-3 w-3 rounded-full border-2 transition-colors duration-500 ${
                      reached ? "border-white bg-white" : "border-white/35 bg-blue"
                    }`}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>
      {/* The traveler: the logo's N-house mark */}
      <span
        aria-hidden
        className={`absolute top-0 flex h-9 w-12 -translate-x-1/2 items-center justify-center rounded-lg bg-white shadow-md transition-[left,opacity] duration-700 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none ${
          active < 0 && !done ? "opacity-0" : "opacity-100"
        }`}
        style={{ left: `${pos * 100}%`, top: "-6px" }}
      >
        {/* Plain img: next/image's responsive loading doesn't start inside the closed dialog */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo-mark.png" alt="" width={880} height={548} className="hiw-bob h-auto w-10" />
      </span>
    </div>
  );
}

/** Reveals a heading word by word. Screen readers get the whole heading at once. */
function Words({ text, start }: { text: string; start: number }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(" ").map((w, i) => (
          <span key={i} className="hiw-word inline-block" style={{ "--d": `${start + i * 0.07}s` } as CSSProperties}>
            {w}
            {"\u00a0"}
          </span>
        ))}
      </span>
    </>
  );
}

/** Lightbulb icon marking tips. */
function Bulb({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 2.5a5.5 5.5 0 0 0-3 10.1V15h6v-2.4a5.5 5.5 0 0 0-3-10.1zM8 17.5h4" />
    </svg>
  );
}
