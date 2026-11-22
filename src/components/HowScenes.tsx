"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { HowIcon } from "@/content/howItWorks";

/**
 * Animated scenes for the "How it works" walkthrough. Each is an SVG
 * (320 × 220) whose parts animate in sequence using the hiw-* classes in
 * globals.css. `--d` sets each part's start delay.
 */

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
const LIGHT = "#FFD978"; // warm window light
const RED = "var(--color-red-light)";

export function Scene({ name }: { name: HowIcon }) {
  const scenes: Record<HowIcon, () => React.JSX.Element> = { approval: Approval, wishlist: Wishlist, tour: Tour, offer: Offer, inspect: Inspect, keys: Keys };
  const S = scenes[name];
  return (
    <svg viewBox="0 0 320 220" aria-hidden className="relative h-auto w-full max-w-[360px]" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <S />
    </svg>
  );
}

/** 1. A document writes itself, is signed, and gets an APPROVED stamp. */
function Approval() {
  return (
    <>
      <g className="hiw-shake" style={d(2.15)}>
        <rect x="88" y="22" width="136" height="176" rx="10" fill="rgb(255 255 255 / 0.08)" stroke="white" strokeWidth="3" pathLength={1} className="hiw-draw" style={d(0.1)} />
        <rect x="106" y="42" width="64" height="11" rx="3" fill="white" className="hiw-type" style={d(0.6)} />
        <rect x="106" y="60" width="38" height="6" rx="3" fill="rgb(255 255 255 / 0.5)" className="hiw-type" style={d(0.75)} />
        {[84, 100, 116, 132].map((y, i) => (
          <rect key={y} x="106" y={y} width={[100, 88, 100, 64][i]} height="6" rx="3" fill="rgb(255 255 255 / 0.55)" className="hiw-type" style={d(0.9 + i * 0.13)} />
        ))}
        <path d="M106 160h70" stroke="rgb(255 255 255 / 0.4)" strokeWidth="2" pathLength={1} className="hiw-draw" style={d(1.4)} />
        <path d="M110 156c6-14 12 8 18-2s8-12 13 0 9 2 14-4" stroke="white" strokeWidth="2.5" pathLength={1} className="hiw-draw" style={d(1.55)} />
      </g>
      <g className="hiw-stamp" style={d(2.05)}>
        <circle cx="222" cy="150" r="36" stroke={RED} strokeWidth="4" fill="rgb(255 92 92 / 0.12)" />
        <circle cx="222" cy="150" r="29" stroke={RED} strokeWidth="1.5" />
        <text x="222" y="154" textAnchor="middle" fill={RED} fontSize="11.5" fontWeight="700" letterSpacing="1.2" fontFamily="inherit">
          APPROVED
        </text>
      </g>
      <Sparkle x={262} y={104} delay={2.35} />
      <Sparkle x={180} y={196} delay={2.5} small />
      <Sparkle x={276} y={182} delay={2.65} small />
    </>
  );
}

/** 2. A map draws its streets; pins drop in and one is chosen. */
function Wishlist() {
  const pins = [
    { x: 98, y: 92, chosen: false },
    { x: 166, y: 132, chosen: true },
    { x: 236, y: 84, chosen: false },
  ];
  return (
    <>
      <rect x="30" y="24" width="260" height="172" rx="14" fill="rgb(255 255 255 / 0.07)" stroke="rgb(255 255 255 / 0.35)" strokeWidth="2" pathLength={1} className="hiw-draw" style={d(0.05)} />
      <ellipse cx="240" cy="160" rx="34" ry="20" fill="rgb(255 255 255 / 0.1)" className="hiw-fade" style={d(0.5)} />
      <path d="M30 128C90 106 150 160 290 116" stroke="rgb(255 255 255 / 0.55)" strokeWidth="7" pathLength={1} className="hiw-draw" style={d(0.2)} />
      <path d="M116 24l30 172" stroke="rgb(255 255 255 / 0.4)" strokeWidth="5" pathLength={1} className="hiw-draw" style={d(0.4)} />
      <path d="M206 24c-8 60 24 108 12 172" stroke="rgb(255 255 255 / 0.4)" strokeWidth="5" pathLength={1} className="hiw-draw" style={d(0.55)} />
      <path d="M30 70h80" stroke="rgb(255 255 255 / 0.25)" strokeWidth="3" pathLength={1} className="hiw-draw" style={d(0.7)} />
      {pins.map((p, i) => (
        <g key={p.x}>
          <ellipse cx={p.x} cy={p.y + 2} rx="9" ry="3" fill="black" className="hiw-shadow" style={d(1 + i * 0.2)} />
          {p.chosen && <circle cx={p.x} cy={p.y - 18} r="18" stroke={RED} strokeWidth="2.5" className="hiw-ripple" style={d(2.1)} />}
          <g className="hiw-drop" style={d(0.9 + i * 0.2)}>
            <path
              d={`M${p.x} ${p.y}s-16-16-16-28a16 16 0 0 1 32 0c0 12-16 28-16 28z`}
              fill={p.chosen ? RED : "white"}
              className={p.chosen ? "hiw-tint" : undefined}
              style={p.chosen ? d(1.8) : undefined}
            />
            <circle cx={p.x} cy={p.y - 28} r="6" fill={p.chosen ? "white" : "var(--color-blue)"} />
          </g>
        </g>
      ))}
      <path d="M166 70l-7-7a5 5 0 0 1 7-7 5 5 0 0 1 7 7z" fill={RED} className="hiw-pop" style={d(2)} />
      <Sparkle x={196} y={64} delay={2.2} small />
    </>
  );
}

/** 3. A logo-style house builds itself; lights flicker on, the door opens, a magnifier sweeps. */
function Tour() {
  return (
    <>
      <path d="M24 192h272" stroke="rgb(255 255 255 / 0.35)" strokeWidth="3" pathLength={1} className="hiw-draw" style={d(0.05)} />
      <g className="hiw-fade" style={d(0.3)}>
        <circle cx="270" cy="150" r="20" fill="rgb(255 255 255 / 0.12)" />
        <path d="M270 170v22" stroke="rgb(255 255 255 / 0.35)" strokeWidth="4" />
      </g>
      {/* Walls */}
      <path d="M84 104v88h152v-88" stroke="white" strokeWidth="4" fill="rgb(255 255 255 / 0.06)" pathLength={1} className="hiw-draw" style={d(0.3)} />
      {/* Roof: the logo's sweeping chevron */}
      <path d="M50 120L160 38l110 82" stroke="white" strokeWidth="7" pathLength={1} className="hiw-draw" style={d(0.6)} />
      <path d="M70 120L160 54l90 66" stroke="rgb(255 255 255 / 0.4)" strokeWidth="2" pathLength={1} className="hiw-draw" style={d(0.85)} />
      {/* Warm window */}
      <rect x="102" y="126" width="38" height="30" rx="3" stroke="white" strokeWidth="2.5" pathLength={1} className="hiw-draw" style={d(1.1)} />
      <rect x="104" y="128" width="34" height="26" rx="2" fill={LIGHT} className="hiw-light" style={d(1.5)} />
      {/* The logo's red four-pane window */}
      <g className="hiw-light" style={d(1.7)}>
        {[0, 1].map((r) =>
          [0, 1].map((c) => <rect key={`${r}${c}`} x={184 + c * 17} y={124 + r * 17} width="14" height="14" rx="1.5" fill={RED} />),
        )}
      </g>
      {/* Door: warm light behind, door swings open */}
      <rect x="148" y="146" width="26" height="46" fill={LIGHT} className="hiw-light" style={d(2)} />
      <rect x="148" y="146" width="26" height="46" fill="white" className="hiw-door" style={d(2.1)} />
      <circle cx="168" cy="170" r="2" fill="var(--color-blue)" className="hiw-fade" style={d(1.9)} />
      {/* Magnifier */}
      <g className="hiw-sweep" style={d(2.5)}>
        <g className="hiw-fade" style={d(2.4)}>
          <circle cx="160" cy="98" r="20" stroke="white" strokeWidth="4" fill="rgb(255 255 255 / 0.15)" />
          <path d="M174 112l16 16" stroke="white" strokeWidth="6" />
        </g>
      </g>
    </>
  );
}

/** 4. An offer letter writes itself, the price counts up, and it's accepted. */
function Offer() {
  const price = useCountUp(350000, 900, 1300);
  return (
    <>
      <g className="hiw-rise" style={d(0.1)}>
        <rect x="34" y="34" width="122" height="156" rx="10" fill="white" />
        <rect x="50" y="52" width="58" height="10" rx="3" fill="var(--color-blue)" className="hiw-type" style={d(0.45)} />
        {[76, 90, 104, 118].map((y, i) => (
          <rect key={y} x="50" y={y} width={[88, 76, 88, 56][i]} height="5" rx="2.5" fill="rgb(0 40 104 / 0.3)" className="hiw-type" style={d(0.6 + i * 0.1)} />
        ))}
        <text x="50" y="152" fill="var(--color-blue)" fontSize="19" fontWeight="700" fontFamily="inherit" className="hiw-fade" style={d(0.85)}>
          ${price.toLocaleString("en-US")}
        </text>
        <path d="M50 174c7-10 12 6 18-2s9-8 14 0" stroke="var(--color-blue)" strokeWidth="2.2" pathLength={1} className="hiw-draw" style={d(2)} />
      </g>
      {/* Back-and-forth negotiation */}
      <path d="M164 92c22-18 50-18 72 0" stroke="rgb(255 255 255 / 0.7)" strokeWidth="2.5" strokeDasharray="6 7" className="hiw-flow hiw-fade" style={d(1.2)} />
      <path d="M236 122c-22 18-50 18-72 0" stroke="rgb(255 255 255 / 0.7)" strokeWidth="2.5" strokeDasharray="6 7" className="hiw-flow hiw-fade" style={d(1.35)} />
      <path d="M230 86l7 6-9 3" stroke="rgb(255 255 255 / 0.7)" strokeWidth="2.5" className="hiw-fade" style={d(1.2)} />
      <path d="M170 128l-7-6 9-3" stroke="rgb(255 255 255 / 0.7)" strokeWidth="2.5" className="hiw-fade" style={d(1.35)} />
      {/* Price tag on a string */}
      <g className="hiw-fade" style={d(0.5)}>
        <path d="M262 24v30" stroke="rgb(255 255 255 / 0.6)" strokeWidth="2" />
        <g className="hiw-tag">
          <path d="M240 60l22-8 22 8v62a6 6 0 0 1-6 6h-32a6 6 0 0 1-6-6z" fill={RED} />
          <circle cx="262" cy="64" r="4" fill="var(--color-blue)" />
          <text x="262" y="100" textAnchor="middle" fill="white" fontSize="22" fontWeight="700" fontFamily="inherit">
            $
          </text>
        </g>
      </g>
      {/* Accepted */}
      <g className="hiw-pop" style={d(2.4)}>
        <circle cx="146" cy="186" r="22" fill={RED} />
        <path d="M136 186l7 7 13-14" stroke="white" strokeWidth="4" pathLength={1} className="hiw-draw" style={d(2.6)} />
      </g>
      <Sparkle x={184} y={168} delay={2.6} small />
      <Sparkle x={112} y={206} delay={2.75} small />
    </>
  );
}

/** 5. A scan passes over the house while checkpoints tick on and a clipboard fills in. */
function Inspect() {
  const points = [
    { x: 124, y: 74, dl: 1.1 },
    { x: 104, y: 150, dl: 1.6 },
    { x: 196, y: 168, dl: 2.1 },
  ];
  return (
    <>
      <defs>
        <clipPath id="hiw-house">
          <path d="M40 104L124 40l84 64v88H40z" />
        </clipPath>
        <linearGradient id="hiw-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.8" stopColor={RED} stopOpacity="0.55" />
          <stop offset="1" stopColor="white" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path d="M40 104L124 40l84 64v88H40z" stroke="white" strokeWidth="3.5" fill="rgb(255 255 255 / 0.06)" pathLength={1} className="hiw-draw" style={d(0.1)} />
      <path d="M100 192v-40h48v40" stroke="rgb(255 255 255 / 0.5)" strokeWidth="2.5" pathLength={1} className="hiw-draw" style={d(0.4)} />
      <g clipPath="url(#hiw-house)">
        <rect x="40" y="0" width="170" height="36" fill="url(#hiw-beam)" className="hiw-scan" style={d(0.8)} />
      </g>
      {points.map((p) => (
        <g key={p.x} className="hiw-pop" style={d(p.dl)}>
          <circle cx={p.x} cy={p.y} r="11" fill={RED} />
          <path d={`M${p.x - 5} ${p.y}l3.5 3.5 6.5-7`} stroke="white" strokeWidth="2.6" />
        </g>
      ))}
      {/* Clipboard */}
      <g className="hiw-rise" style={d(0.5)}>
        <rect x="222" y="58" width="76" height="118" rx="8" fill="white" />
        <rect x="244" y="50" width="32" height="14" rx="4" fill="var(--color-blue)" stroke="white" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="234" y={84 + i * 28} width="14" height="14" rx="3" stroke="rgb(0 40 104 / 0.35)" strokeWidth="2" />
            <path d={`M237 ${91 + i * 28}l3 3 6-7`} stroke="var(--color-red)" strokeWidth="2.6" pathLength={1} className="hiw-draw" style={d(1.2 + i * 0.5)} />
            <rect x="254" y={88 + i * 28} width={[32, 26, 30][i]} height="5" rx="2.5" fill="rgb(0 40 104 / 0.3)" className="hiw-type" style={d(0.9 + i * 0.12)} />
          </g>
        ))}
      </g>
    </>
  );
}

/** 6. The key turns, the door opens, the logo appears inside, and confetti bursts. */
function Keys() {
  const confetti = [
    [-120, -70, 220, LIGHT], [-90, -110, -180, "white"], [-40, -125, 300, RED], [20, -130, -260, LIGHT], [70, -112, 200, "white"],
    [115, -80, -220, RED], [130, -30, 160, LIGHT], [-135, -20, -140, RED], [-70, -85, 280, LIGHT], [95, -128, -300, "white"],
    [-110, 30, 190, "white"], [125, 25, -170, RED], [-20, -100, 240, "white"], [45, -90, -200, RED],
  ] as const;
  return (
    <>
      {/* Doorway with warm light */}
      <rect x="112" y="30" width="96" height="164" rx="4" fill="rgb(255 255 255 / 0.06)" stroke="white" strokeWidth="4" pathLength={1} className="hiw-draw" style={d(0.05)} />
      <rect x="116" y="34" width="88" height="156" fill={LIGHT} className="hiw-light" style={d(1.9)} />
      {/* The logo mark rising in the doorway */}
      <g className="hiw-emerge" style={d(2.25)}>
        <rect x="126" y="78" width="68" height="46" rx="6" fill="white" />
        <image href="/images/logo-mark.png" x="130" y="81" width="60" height="38" preserveAspectRatio="xMidYMid meet" />
      </g>
      {/* The door swings open */}
      <g className="hiw-door" style={d(1.8)}>
        <rect x="116" y="34" width="88" height="156" fill="white" />
        <rect x="128" y="48" width="64" height="52" rx="3" stroke="rgb(0 40 104 / 0.2)" strokeWidth="2" />
        <rect x="128" y="112" width="64" height="62" rx="3" stroke="rgb(0 40 104 / 0.2)" strokeWidth="2" />
        <circle cx="190" cy="120" r="9" fill="var(--color-blue)" />
        <circle cx="190" cy="120" r="3" fill="white" />
      </g>
      {/* Key slides in, turns, then slips away as the door opens */}
      <g className="hiw-out" style={d(1.65)}>
      <g className="hiw-keyin" style={d(0.5)}>
        <g className="hiw-keyturn" style={{ ...d(1.25), transformOrigin: "190px 120px" }}>
          <path d="M190 120h56" stroke={RED} strokeWidth="6" />
          <path d="M228 120v10M238 120v7" stroke={RED} strokeWidth="5" />
          <circle cx="262" cy="120" r="16" stroke={RED} strokeWidth="6" />
        </g>
      </g>
      </g>
      {/* Confetti */}
      <g transform="translate(160 110)">
        {confetti.map(([x, y, r, c], i) => (
          <rect
            key={i}
            x="-3"
            y="-6"
            width="6"
            height="12"
            rx="1.5"
            fill={c}
            className="hiw-confetti"
            style={{ ...d(2.3 + (i % 4) * 0.05), "--x": `${x}px`, "--y": `${y}px`, "--r": `${r}deg` } as CSSProperties}
          />
        ))}
      </g>
    </>
  );
}

function Sparkle({ x, y, delay, small = false }: { x: number; y: number; delay: number; small?: boolean }) {
  const s = small ? 6 : 9;
  return (
    <path
      d={`M${x} ${y - s}q1.5 ${s - 1.5} ${s} ${s}q${-(s - 1.5)} 1.5 ${-s} ${s}q-1.5 ${-(s - 1.5)} ${-s} ${-s}q${s - 1.5} -1.5 ${s} ${-s}z`}
      fill="white"
      className="hiw-sparkle"
      style={d(delay)}
    />
  );
}

/** Counts up to `target` after `delay` ms over `duration` ms; shows the final number for reduced motion. */
function useCountUp(target: number, delay: number, duration: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round((target * eased) / 1000) * 1000);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, delay, duration]);
  return value;
}
