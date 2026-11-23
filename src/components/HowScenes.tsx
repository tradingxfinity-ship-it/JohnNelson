"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { HowIcon } from "@/content/howItWorks";

/**
 * Animated scenes for the "How it works" walkthrough, drawn in blues on a
 * white card (no red). Each SVG scene is 320 × 220; parts animate in
 * sequence with the hiw-* classes in globals.css, where `--d` is a part's
 * start delay. Looping motion (cars, smoke, the scan beam) keeps a scene alive
 * while the visitor reads. The keys scene is HTML so the door and key can move
 * in real 3D.
 */

const d = (s: number, extra?: CSSProperties) => ({ "--d": `${s}s`, ...extra }) as CSSProperties;
const B = "#002868"; // brand blue
const B2 = "#2D5BA3"; // mid blue
const B3 = "#9DB7DE"; // soft blue
const B4 = "#DCE6F4"; // pale blue
const B5 = "#F1F5FB"; // wash
const LIGHT = "#FFD978"; // warm window light
const LIGHT_SOFT = "#FFF1C2";

export function Scene({ name }: { name: HowIcon }) {
  const reduced = useReducedMotion();
  if (name === "keys") return <Keys />;
  const scenes = {
    approval: Approval,
    wishlist: Wishlist,
    tour: Tour,
    offer: Offer,
    inspect: Inspect,
    paperwork: Paperwork,
    valuation: Valuation,
    prepare: Prepare,
    market: Market,
    offers: Offers,
    sold: Sold,
  } as const;
  const S = scenes[name];
  return (
    <svg viewBox="0 0 320 220" aria-hidden className="hiw-camera relative mx-auto h-auto w-full max-w-[400px]" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <S motion={!reduced} />
    </svg>
  );
}

type SceneProps = { motion: boolean };

/* ------------------------------------------------------------------ */
/* 1. Get preapproved                                                  */
/* ------------------------------------------------------------------ */
function Approval({ motion }: SceneProps) {
  const amount = useCountUp(350000, 900, 1400);
  const sig = "M92 172c5-12 10 5 15-2s7-11 11-1 8 3 12-3 6-2 9 2";
  return (
    <>
      <circle cx="132" cy="112" r="92" fill={B5} className="hiw-pop" style={d(0)} />
      {/* Paper slides up and settles */}
      <g className="hiw-paper" style={d(0.1)}>
        <g className="hiw-shake" style={d(3.02)}>
          <rect x="66" y="30" width="134" height="172" rx="9" fill={B4} />
          <rect x="60" y="24" width="134" height="172" rx="9" fill="white" stroke={B4} strokeWidth="2" />
          <rect x="76" y="40" width="58" height="10" rx="3" fill={B} className="hiw-type" style={d(0.55)} />
          <rect x="76" y="56" width="34" height="5" rx="2.5" fill={B3} className="hiw-type" style={d(0.7)} />
          {[76, 88, 100].map((y, i) => (
            <rect key={y} x="76" y={y} width={[100, 86, 96][i]} height="5" rx="2.5" fill={B4} className="hiw-type" style={d(0.8 + i * 0.1)} />
          ))}
          <text x="76" y="125" fill={B3} fontSize="8" fontWeight="600" letterSpacing=".6" className="hiw-fade" style={d(0.9)}>
            LOAN AMOUNT
          </text>
          <text x="76" y="144" fill={B} fontSize="18" fontWeight="700" className="hiw-fade" style={d(0.9)}>
            ${amount.toLocaleString("en-US")}
          </text>
          <path d="M76 176h86" stroke={B4} strokeWidth="2" />
          <path d={sig} stroke={B2} strokeWidth="2.4" pathLength={1} className="hiw-draw" style={d(1.75, { animationDuration: "1s" })} />
        </g>
      </g>
      {/* Pen writes the signature */}
      {motion && (
        <g className="hiw-fade-io" style={d(1.6)}>
          <g>
            <animateMotion dur="1s" begin="1.75s" fill="freeze" path={sig} />
            <g transform="rotate(-38) translate(0 -26)">
              <rect x="-3.5" y="0" width="7" height="24" rx="2" fill={B} />
              <path d="M-3.5 24l3.5 6 3.5-6z" fill={B2} />
              <rect x="-3.5" y="-3" width="7" height="5" rx="1.5" fill={B3} />
            </g>
          </g>
        </g>
      )}
      {/* Budget gauge */}
      <g className="hiw-slide-r" style={d(0.6)}>
        <rect x="208" y="34" width="96" height="78" rx="12" fill="white" stroke={B4} strokeWidth="2" />
        <text x="222" y="54" fill={B3} fontSize="8" fontWeight="600" letterSpacing=".6">
          BUDGET
        </text>
        <path d="M226 96a30 30 0 0 1 60 0" stroke={B4} strokeWidth="7" />
        <path d="M226 96a30 30 0 0 1 60 0" stroke={B2} strokeWidth="7" pathLength={1} className="hiw-gauge" style={d(1)} />
        <g className="hiw-needle" style={d(1, { transformOrigin: "256px 96px" })}>
          <path d="M256 96l0-24" stroke={B} strokeWidth="3" />
        </g>
        <circle cx="256" cy="96" r="4.5" fill={B} />
      </g>
      {/* Stamp comes down, presses, lifts away */}
      <g className="hiw-stamper" style={d(2.6)}>
        <rect x="196" y="98" width="20" height="30" rx="7" fill={B} />
        <rect x="186" y="126" width="40" height="10" rx="3" fill={B2} />
        <rect x="182" y="136" width="48" height="12" rx="3" fill={B} />
      </g>
      {/* Ink imprint left behind */}
      <g className="hiw-imprint" style={d(3.02, { transformOrigin: "206px 160px" })}>
        <rect x="170" y="146" width="72" height="28" rx="5" stroke={B2} strokeWidth="2.5" fill="rgb(45 91 163 / 0.08)" />
        <text x="206" y="164.5" textAnchor="middle" fill={B2} fontSize="10.5" fontWeight="800" letterSpacing="1.2">
          APPROVED
        </text>
      </g>
      {[
        [164, 140],
        [248, 150],
        [240, 182],
        [172, 184],
        [252, 168],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 1.6 : 2.2} fill={B2} className="hiw-pop" style={d(3.05 + i * 0.03)} />
      ))}
      <Sparkle x={262} y={130} delay={3.2} />
      <Sparkle x={160} y={204} delay={3.35} small />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Tell us what you want                                            */
/* ------------------------------------------------------------------ */
function Wishlist({ motion }: SceneProps) {
  const roadA = "M24 130C84 108 140 160 236 120";
  const roadB = "M104 22l26 176";
  const pins = [
    { x: 82, y: 98, chosen: false, dl: 1.25 },
    { x: 150, y: 136, chosen: true, dl: 1.45 },
    { x: 212, y: 84, chosen: false, dl: 1.65 },
  ];
  return (
    <>
      {/* Map unfolds in three panels */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={20 + i * 76} y="22" width="76" height="176" fill={i === 1 ? "#E9EFF8" : B5} stroke={B4} strokeWidth="1.5" className="hiw-unfold" style={d(0.05 + i * 0.16)} />
      ))}
      <path d="M20 58c40 10 70-8 110 4s70 14 118-6" stroke="#CFE0F4" strokeWidth="10" pathLength={1} className="hiw-draw" style={d(0.55)} />
      <rect x="170" y="150" width="56" height="34" rx="10" fill="#E2ECF7" className="hiw-fade" style={d(0.6)} />
      <path d={roadA} stroke="white" strokeWidth="9" pathLength={1} className="hiw-draw" style={d(0.6)} />
      <path d={roadA} stroke={B4} strokeWidth="1.5" strokeDasharray="5 6" className="hiw-fade" style={d(1.1)} />
      <path d={roadB} stroke="white" strokeWidth="7" pathLength={1} className="hiw-draw" style={d(0.75)} />
      <path d="M190 22c-6 56 20 100 10 176" stroke="white" strokeWidth="6" pathLength={1} className="hiw-draw" style={d(0.85)} />
      {/* Little houses */}
      {[
        [44, 160],
        [62, 166],
        [160, 66],
        [176, 74],
        [58, 46],
        [214, 160],
      ].map(([x, y], i) => (
        <g key={i} className="hiw-pop" style={d(1 + i * 0.05)}>
          <path d={`M${x - 5} ${y}l5-5 5 5v6h-10z`} fill={B3} />
        </g>
      ))}
      {/* Cars driving the roads */}
      {motion && (
        <>
          <rect x="-5" y="-3" width="10" height="6" rx="2" fill={B2} className="hiw-fade" style={d(1.6)}>
            <animateMotion dur="7s" begin="1.6s" repeatCount="indefinite" rotate="auto" path={roadA} />
          </rect>
          <rect x="-4" y="-2.5" width="8" height="5" rx="2" fill={B3} className="hiw-fade" style={d(2)}>
            <animateMotion dur="5s" begin="2s" repeatCount="indefinite" rotate="auto" path={roadB} />
          </rect>
        </>
      )}
      {/* Pins drop in */}
      {pins.map((p) => (
        <g key={p.x}>
          <ellipse cx={p.x} cy={p.y + 2} rx="8" ry="3" fill={B} className="hiw-shadow" style={d(p.dl)} />
          {p.chosen && <circle cx={p.x} cy={p.y - 16} r="17" stroke={B2} strokeWidth="2.5" className="hiw-ripple" style={d(2.3)} />}
          <g className={p.chosen ? "hiw-chosen" : undefined} style={p.chosen ? d(2.1, { transformOrigin: `${p.x}px ${p.y}px` }) : undefined}>
            <g className="hiw-drop" style={d(p.dl)}>
              <path d={`M${p.x} ${p.y}s-14-14-14-25a14 14 0 0 1 28 0c0 11-14 25-14 25z`} fill={p.chosen ? B : B3} />
              <circle cx={p.x} cy={p.y - 25} r="5.5" fill="white" />
            </g>
          </g>
        </g>
      ))}
      {/* Hearts float up from the chosen pin */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${150 + (i - 1) * 7} ${84}l-5-5a3.6 3.6 0 0 1 5-5 3.6 3.6 0 0 1 5 5z`}
          fill={i === 1 ? B : B2}
          className="hiw-hearts"
          style={d(2.4 + i * 0.55)}
        />
      ))}
      {/* Wish list card */}
      <g className="hiw-slide-r" style={d(2.2)}>
        <rect x="226" y="104" width="90" height="86" rx="10" fill="white" stroke={B4} strokeWidth="2" />
        <text x="236" y="121" fill={B3} fontSize="7.5" fontWeight="700" letterSpacing=".6">
          WISH LIST
        </text>
        {["3 bedrooms", "Good schools", "Short commute"].map((t, i) => (
          <g key={t}>
            <rect x="235" y={130 + i * 18} width="10" height="10" rx="2.5" stroke={B3} strokeWidth="1.6" />
            <path d={`M237.5 ${135 + i * 18}l2 2 4-4.5`} stroke={B} strokeWidth="2" pathLength={1} className="hiw-draw" style={d(2.6 + i * 0.3, { animationDuration: ".35s" })} />
            <text x="249" y={138.5 + i * 18} fill={B} fontSize="7.5" fontWeight="500">
              {t}
            </text>
          </g>
        ))}
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Tour homes                                                       */
/* ------------------------------------------------------------------ */
function Tour({ motion }: SceneProps) {
  return (
    <>
      {/* Sun rises, clouds drift */}
      <g className="hiw-sunrise" style={d(0.1)}>
        <circle cx="262" cy="46" r="26" fill={LIGHT_SOFT} />
        <circle cx="262" cy="46" r="16" fill={LIGHT} />
      </g>
      <g className="hiw-cloud" style={d(0, { animationDuration: "16s" })}>
        <path d="M40 46a10 10 0 0 1 18-6 12 12 0 0 1 22 5 8 8 0 0 1 0 16H40a8 8 0 0 1 0-15z" fill={B5} />
      </g>
      <g className="hiw-cloud" style={d(0, { animationDuration: "22s", animationDelay: "-8s" })}>
        <path d="M186 30a8 8 0 0 1 14-4 9 9 0 0 1 16 4 6 6 0 0 1 0 12h-30a6 6 0 0 1 0-12z" fill={B5} />
      </g>
      {/* Ground */}
      <path d="M10 194h300" stroke={B4} strokeWidth="3" pathLength={1} className="hiw-draw" style={d(0.1)} />
      {/* Tree */}
      <g className="hiw-grow-up" style={d(0.4, { transformOrigin: "276px 194px" })}>
        <path d="M276 194v-30" stroke={B3} strokeWidth="5" />
        <g className="hiw-sway" style={{ transformOrigin: "276px 168px" }}>
          <circle cx="276" cy="150" r="22" fill={B4} />
          <circle cx="266" cy="158" r="13" fill="#CBD9EE" />
        </g>
      </g>
      {/* Slab, walls rise, roof drops in */}
      <rect x="74" y="190" width="164" height="6" rx="2" fill={B3} className="hiw-slab" style={d(0.35)} />
      <g className="hiw-grow-up" style={d(0.55, { transformOrigin: "156px 190px" })}>
        <rect x="82" y="108" width="148" height="82" fill="white" stroke={B} strokeWidth="3" />
        <rect x="200" y="58" width="16" height="36" fill="white" stroke={B} strokeWidth="3" />
      </g>
      <g className="hiw-roof" style={d(0.95)}>
        <path d="M58 122L156 50l98 72" stroke={B} strokeWidth="8" />
        <path d="M80 122L156 66l76 56" stroke={B3} strokeWidth="2" />
      </g>
      {/* Chimney smoke */}
      {motion &&
        [0, 1, 2].map((i) => <circle key={i} cx="208" cy="52" r="6" fill={B4} className="hiw-smoke" style={d(1.8 + i * 0.9)} />)}
      {/* Windows light up */}
      <rect x="98" y="126" width="40" height="30" rx="2" fill={B5} stroke={B} strokeWidth="2.5" className="hiw-fade" style={d(1.2)} />
      <rect x="100" y="128" width="36" height="26" rx="1" fill={LIGHT} className="hiw-light" style={d(1.6)} />
      <path d="M118 126v30M98 141h40" stroke={B} strokeWidth="2" className="hiw-fade" style={d(1.2)} />
      <g className="hiw-light" style={d(1.85)}>
        {[0, 1].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={180 + c * 17} y={124 + r * 17} width="14" height="14" rx="1.5" fill={LIGHT} />))}
      </g>
      <g className="hiw-fade" style={d(1.2)}>
        {[0, 1].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={180 + c * 17} y={124 + r * 17} width="14" height="14" rx="1.5" stroke={B} strokeWidth="2" />))}
      </g>
      {/* Door opens onto warm light */}
      <rect x="146" y="148" width="26" height="42" fill={LIGHT} className="hiw-light" style={d(2.2)} />
      <g className="hiw-door2" style={d(2.35)}>
        <rect x="146" y="148" width="26" height="42" fill={B2} />
        <circle cx="167" cy="170" r="2" fill={B4} />
      </g>
      <rect x="146" y="148" width="26" height="42" stroke={B} strokeWidth="2.5" className="hiw-fade" style={d(1.2)} />
      {/* Path and visitors */}
      <path d="M159 196c-4 6 4 10-6 18" stroke={B4} strokeWidth="6" pathLength={1} className="hiw-draw" style={d(1.4)} />
      <g className="hiw-walk-in" style={d(2.1)}>
        <g className="hiw-step">
          <circle cx="122" cy="174" r="5" fill={B} />
          <rect x="116.5" y="180" width="11" height="15" rx="5" fill={B} />
        </g>
        <g className="hiw-step" style={{ animationDelay: "-.25s" }}>
          <circle cx="136" cy="177" r="4.2" fill={B2} />
          <rect x="131.5" y="182" width="9" height="13" rx="4.5" fill={B2} />
        </g>
      </g>
      {/* Magnifier with a glint */}
      <g className="hiw-sweep" style={d(3.1)}>
        <g className="hiw-fade" style={d(3)}>
          <circle cx="156" cy="100" r="18" stroke={B} strokeWidth="4" fill="rgb(255 255 255 / 0.55)" />
          <path d="M146 92a11 11 0 0 1 8-6" stroke="white" strokeWidth="3" />
          <path d="M169 113l14 14" stroke={B} strokeWidth="6" />
        </g>
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Make an offer                                                    */
/* ------------------------------------------------------------------ */
function Offer() {
  const msgs = [
    { side: "l", text: "Offer: $340,000", y: 28, t: 0.7 },
    { side: "r", text: "Counter: $355,000", y: 72, t: 1.6 },
    { side: "l", text: "$348,000 + repairs", y: 116, t: 2.5 },
  ] as const;
  return (
    <>
      {/* Avatars */}
      <g className="hiw-pop" style={d(0.15)}>
        <circle cx="30" cy="40" r="15" fill={B} />
        <text x="30" y="44" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">
          YOU
        </text>
      </g>
      <g className="hiw-pop" style={d(0.3)}>
        <circle cx="290" cy="84" r="15" fill={B3} />
        <path d="M282 88l8-7 8 7v6h-16z" fill="white" />
      </g>
      {msgs.map((m) => {
        const left = m.side === "l";
        const w = 132;
        const x = left ? 52 : 268 - w;
        return (
          <g key={m.y}>
            {/* typing dots, then the message */}
            <g className="hiw-typing" style={d(m.t - 0.55)}>
              <rect x={left ? 52 : 268 - 42} y={m.y} width="42" height="24" rx="12" fill={left ? B : B5} />
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  cx={(left ? 52 : 268 - 42) + 13 + i * 8}
                  cy={m.y + 12}
                  r="2.6"
                  fill={left ? "white" : B3}
                  className="hiw-dot"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </g>
            <g className="hiw-bubble" style={d(m.t, { transformOrigin: `${left ? x : x + w}px ${m.y + 12}px` })}>
              <rect x={x} y={m.y} width={w} height="26" rx="13" fill={left ? B : B5} stroke={left ? "none" : B4} strokeWidth="1.5" />
              <text x={x + w / 2} y={m.y + 17} textAnchor="middle" fill={left ? "white" : B} fontSize="10.5" fontWeight="600">
                {m.text}
              </text>
            </g>
          </g>
        );
      })}
      {/* Accepted */}
      <g className="hiw-typing" style={d(2.95)}>
        <rect x="226" y="160" width="42" height="24" rx="12" fill={B5} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={239 + i * 8} cy="172" r="2.6" fill={B3} className="hiw-dot" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </g>
      <g className="hiw-bubble-big" style={d(3.5, { transformOrigin: "268px 172px" })}>
        <rect x="150" y="156" width="118" height="34" rx="17" fill={B2} />
        <circle cx="172" cy="173" r="10" fill="white" />
        <path d="M167 173l3.5 3.5 7-7.5" stroke={B2} strokeWidth="2.6" pathLength={1} className="hiw-draw" style={d(3.75, { animationDuration: ".4s" })} />
        <text x="190" y="177.5" fill="white" fontSize="12" fontWeight="700">
          Accepted!
        </text>
      </g>
      {/* Celebration burst */}
      <g transform="translate(209 172)">
        {[
          [-70, -40, B3],
          [-40, -62, B2],
          [10, -70, B],
          [56, -54, B3],
          [78, -14, B2],
          [-82, -6, B],
          [30, -40, B4],
          [-20, -50, B4],
        ].map(([x, y, c], i) => (
          <rect key={i} x="-2.5" y="-5" width="5" height="10" rx="1.5" fill={c as string} className="hiw-confetti" style={d(3.7, { "--x": `${x}px`, "--y": `${y}px`, "--r": `${(i % 2 ? 1 : -1) * 220}deg` } as CSSProperties)} />
        ))}
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Inspection & appraisal                                           */
/* ------------------------------------------------------------------ */
function Inspect({ motion }: SceneProps) {
  const value = useCountUp(352000, 1500, 1400);
  return (
    <>
      <defs>
        <clipPath id="hiw-house-clip">
          <path d="M22 98L104 34l82 64v94H22z" />
        </clipPath>
        <linearGradient id="hiw-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={B2} stopOpacity="0" />
          <stop offset="0.85" stopColor={B2} stopOpacity="0.35" />
          <stop offset="1" stopColor={B2} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {/* Cutaway house */}
      <path d="M22 98L104 34l82 64v94H22z" fill={B5} stroke={B} strokeWidth="3" pathLength={1} className="hiw-draw" style={d(0.05)} />
      <path d="M22 140h164M104 140v52M60 98h88" stroke={B4} strokeWidth="2.5" pathLength={1} className="hiw-draw" style={d(0.4)} />
      {/* Fixtures: roof vent, outlet, sink */}
      <rect x="96" y="70" width="16" height="10" rx="2" fill={B3} className="hiw-fade" style={d(0.7)} />
      <rect x="44" y="114" width="12" height="16" rx="2" stroke={B2} strokeWidth="2" className="hiw-fade" style={d(0.75)} />
      <path d="M126 168h36v8a8 8 0 0 1-8 8h-20a8 8 0 0 1-8-8z" fill={B4} stroke={B2} strokeWidth="2" className="hiw-fade" style={d(0.8)} />
      <path d="M144 168v-10h8" stroke={B2} strokeWidth="2.5" className="hiw-fade" style={d(0.8)} />
      {/* A drip, flagged, then fixed */}
      {motion && <circle cx="152" cy="161" r="2.2" fill={B2} className="hiw-drip" style={d(1)} />}
      {/* Scanner sweeps the house */}
      <g clipPath="url(#hiw-house-clip)">
        <rect x="20" y="-10" width="168" height="34" fill="url(#hiw-beam)" className="hiw-scan" style={d(0.9)} />
      </g>
      <Check x={104} y={58} delay={1.4} />
      <Check x={50} y={102} delay={1.9} />
      {/* Plumbing: flag, wrench, then check */}
      <g className="hiw-flag" style={d(2.3)}>
        <circle cx="170" cy="150" r="10" fill={B3} />
        <text x="170" y="154.5" textAnchor="middle" fill="white" fontSize="13" fontWeight="800">
          !
        </text>
      </g>
      <g className="hiw-wrench" style={d(2.9, { transformOrigin: "170px 150px" })}>
        <path d="M162 158l10-10m2-6a6 6 0 1 0 6 6l-4 0-2-2z" stroke={B} strokeWidth="3.2" />
      </g>
      <Check x={170} y={150} delay={3.6} />
      {/* Appraisal card: comps rise, value counts up */}
      <g className="hiw-slide-r" style={d(0.7)}>
        <rect x="202" y="30" width="108" height="160" rx="12" fill="white" stroke={B4} strokeWidth="2" />
        <text x="214" y="50" fill={B3} fontSize="7.5" fontWeight="700" letterSpacing=".6">
          APPRAISAL
        </text>
        {[46, 62, 54, 70].map((h, i) => (
          <rect key={i} x={216 + i * 21} y={132 - h} width="14" height={h} rx="3" fill={i === 3 ? B2 : B4} className="hiw-bar" style={d(1.1 + i * 0.15)} />
        ))}
        <path d="M212 134h88" stroke={B4} strokeWidth="2" />
        <text x="214" y="154" fill={B3} fontSize="7" fontWeight="600">
          VALUE
        </text>
        <text x="214" y="171" fill={B} fontSize="15" fontWeight="800">
          ${value.toLocaleString("en-US")}
        </text>
        <g className="hiw-pop" style={d(3.1)}>
          <rect x="250" y="174" width="52" height="12" rx="6" fill={B2} />
          <text x="276" y="182.5" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="700">
            ✓ AT PRICE
          </text>
        </g>
      </g>
    </>
  );
}

/* ================================================================== */
/* Selling scenes                                                      */
/* ================================================================== */

/** Tip: a folder opens and the documents a seller needs fan out and check off. */
function Paperwork() {
  const docs = [
    { label: "PAYOFF", x: 78, r: -10 },
    { label: "SURVEY", x: 128, r: -3 },
    { label: "HOA", x: 178, r: 4 },
    { label: "WARRANTY", x: 228, r: 11 },
  ];
  return (
    <>
      <ellipse cx="160" cy="200" rx="110" ry="8" fill={B5} className="hiw-fade" style={d(0.1)} />
      {/* Folder back */}
      <path d="M58 82h70l12 14h122v100H58z" fill={B4} className="hiw-grow-up" style={d(0.1, { transformOrigin: "160px 196px" })} />
      {/* Documents fan out of the folder */}
      {docs.map((doc, i) => (
        <g key={doc.label} className="hiw-fan" style={d(0.55 + i * 0.18, { "--r": `${doc.r}deg` } as CSSProperties)}>
          <rect x={doc.x - 4} y="38" width="52" height="70" rx="5" fill="white" stroke={B3} strokeWidth="1.5" />
          <rect x={doc.x + 4} y="48" width="30" height="5" rx="2" fill={B} />
          <rect x={doc.x + 4} y="58" width="36" height="3.5" rx="1.75" fill={B4} />
          <rect x={doc.x + 4} y="65" width="28" height="3.5" rx="1.75" fill={B4} />
          <text x={doc.x + 22} y="85" textAnchor="middle" fill={B2} fontSize="6.5" fontWeight="700" letterSpacing=".5">
            {doc.label}
          </text>
          <g className="hiw-pop" style={d(1.6 + i * 0.25)}>
            <circle cx={doc.x + 40} cy="42" r="7.5" fill={B2} />
            <path d={`M${doc.x + 36.6} 42l2.3 2.3 4.4-4.8`} stroke="white" strokeWidth="2" />
          </g>
        </g>
      ))}
      {/* Paper clip */}
      <path d="M86 40V30a5 5 0 0 1 10 0v16a3 3 0 0 1-6 0V33" stroke={B} strokeWidth="2.2" pathLength={1} className="hiw-draw" style={d(1.3, { animationDuration: ".5s" })} />
      {/* Folder front */}
      <path d="M52 116h216l-10 80H62z" fill={B2} className="hiw-grow-up" style={d(0.25, { transformOrigin: "160px 196px" })} />
      <path d="M52 116h216" stroke={B} strokeWidth="3" className="hiw-fade" style={d(0.3)} />
      <rect x="138" y="140" width="44" height="8" rx="4" fill="rgb(255 255 255 / 0.3)" className="hiw-fade" style={d(0.5)} />
      <Sparkle x={278} y={60} delay={2.7} />
      <Sparkle x={44} y={70} delay={2.9} small />
    </>
  );
}

/** 1. Nearby sales drop onto a map, a marker settles on the range, and the estimate counts up. */
function Valuation() {
  const value = useCountUp(350000, 2100, 1100);
  const comps = [
    { x: 172, y: 70, p: "$342K", dl: 0.9 },
    { x: 226, y: 92, p: "$355K", dl: 1.15 },
    { x: 274, y: 64, p: "$349K", dl: 1.4 },
  ];
  return (
    <>
      {/* Your home */}
      <path d="M14 196h120" stroke={B4} strokeWidth="3" pathLength={1} className="hiw-draw" style={d(0.05)} />
      <g className="hiw-grow-up" style={d(0.15, { transformOrigin: "74px 196px" })}>
        <rect x="36" y="120" width="76" height="76" fill="white" stroke={B} strokeWidth="3" />
        <rect x="64" y="160" width="20" height="36" fill={B2} />
        <rect x="46" y="134" width="16" height="16" rx="2" fill={B5} stroke={B} strokeWidth="2" />
        <rect x="86" y="134" width="16" height="16" rx="2" fill={B5} stroke={B} strokeWidth="2" />
      </g>
      <path d="M24 128L74 86l50 42" stroke={B} strokeWidth="7" className="hiw-roof" style={d(0.45)} />
      {/* Price tag hanging from the eave */}
      <g className="hiw-fade" style={d(0.8)}>
        <path d="M114 122v12" stroke={B3} strokeWidth="1.5" />
        <g className="hiw-swing2" style={{ transformOrigin: "114px 122px" }}>
          <path d="M102 134h24l6 8-6 8h-24z" fill={B} />
          <circle cx="107" cy="142" r="2" fill="white" />
          <text x="118" y="145.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">
            $
          </text>
        </g>
      </g>
      {/* Nearby sales map */}
      <g className="hiw-slide-r" style={d(0.35)}>
        <rect x="148" y="22" width="160" height="96" rx="12" fill={B5} stroke={B4} strokeWidth="2" />
        <path d="M148 84c40-12 70 18 160-6" stroke="white" strokeWidth="6" />
        <path d="M206 22l14 96" stroke="white" strokeWidth="5" />
        <text x="160" y="38" fill={B3} fontSize="7" fontWeight="700" letterSpacing=".6">
          NEARBY SALES
        </text>
      </g>
      {comps.map((c) => (
        <g key={c.x}>
          <g className="hiw-drop" style={d(c.dl)}>
            <path d={`M${c.x} ${c.y + 14}s-8-8-8-14a8 8 0 0 1 16 0c0 6-8 14-8 14z`} fill={B2} />
            <circle cx={c.x} cy={c.y} r="3" fill="white" />
          </g>
          <g className="hiw-pop" style={d(c.dl + 0.35)}>
            <rect x={c.x - 18} y={c.y + 17} width="36" height="13" rx="6.5" fill="white" stroke={B4} strokeWidth="1.2" />
            <text x={c.x} y={c.y + 26.5} textAnchor="middle" fill={B} fontSize="7.5" fontWeight="700">
              {c.p}
            </text>
          </g>
        </g>
      ))}
      {/* Value range and estimate */}
      <g className="hiw-fade" style={d(1.7)}>
        <text x="150" y="146" fill={B3} fontSize="7" fontWeight="700" letterSpacing=".6">
          ESTIMATED VALUE
        </text>
        <rect x="150" y="154" width="156" height="7" rx="3.5" fill={B4} />
        <rect x="186" y="154" width="80" height="7" rx="3.5" fill={B3} />
      </g>
      <g className="hiw-slider" style={d(1.9)}>
        <circle cx="152" cy="157.5" r="7" fill={B} stroke="white" strokeWidth="2.5" />
      </g>
      <text x="150" y="190" fill={B} fontSize="20" fontWeight="800" className="hiw-fade" style={d(2)}>
        ${value.toLocaleString("en-US")}
      </text>
      <Sparkle x={292} y={178} delay={3.3} small />
    </>
  );
}

/** 2. A roller paints over a scuffed wall, a crooked picture straightens, and the room is staged. */
function Prepare({ motion }: SceneProps) {
  return (
    <>
      <defs>
        <clipPath id="hiw-wall-clip">
          <rect x="16" y="20" width="288" height="160" rx="10" />
        </clipPath>
      </defs>
      {/* Old wall with scuffs */}
      <rect x="16" y="20" width="288" height="160" rx="10" fill={B4} />
      <g clipPath="url(#hiw-wall-clip)">
        <path d="M60 70l14 6M200 60l10-4M240 120l16 4M90 130l8-6M150 96l12 2" stroke={B3} strokeWidth="2.5" />
        {/* Fresh paint wipes across */}
        <rect x="16" y="20" width="288" height="160" fill="#F7F9FD" className="hiw-wipe" style={d(0.4)} />
      </g>
      {/* Floor */}
      <rect x="16" y="180" width="288" height="18" rx="4" fill={B3} />
      {/* Roller moving with the paint edge */}
      <g className="hiw-roller" style={d(0.4)}>
        <g className="hiw-roll-bob">
          <rect x="6" y="96" width="20" height="40" rx="6" fill={B2} />
          <path d="M16 136v14h10v30" stroke={B} strokeWidth="3.5" />
        </g>
      </g>
      {/* Picture frame straightens */}
      <g className="hiw-straighten" style={d(2.15, { transformOrigin: "160px 44px" })}>
        <path d="M160 44l-22 16M160 44l22 16" stroke={B3} strokeWidth="1.5" />
        <rect x="128" y="58" width="64" height="46" rx="3" fill="white" stroke={B} strokeWidth="3" />
        <path d="M136 96l14-16 10 10 8-8 16 14z" fill={B3} />
        <circle cx="176" cy="70" r="5" fill={B4} />
      </g>
      <circle cx="160" cy="44" r="2.5" fill={B} />
      {/* Sofa slides in */}
      <g className="hiw-slide-l" style={d(2.4)}>
        <rect x="40" y="140" width="116" height="34" rx="10" fill={B2} />
        <rect x="34" y="128" width="16" height="44" rx="7" fill={B} />
        <rect x="146" y="128" width="16" height="44" rx="7" fill={B} />
        <rect x="52" y="128" width="44" height="20" rx="7" fill={B3} />
        <rect x="100" y="128" width="44" height="20" rx="7" fill={B3} />
        <path d="M46 174v6M150 174v6" stroke={B} strokeWidth="3" />
      </g>
      {/* Plant grows */}
      <g className="hiw-grow-up" style={d(2.7, { transformOrigin: "256px 180px" })}>
        <path d="M244 160h24l-4 20h-16z" fill={B} />
        <path d="M256 160c-14-12-12-26-4-32M256 160c10-14 18-16 22-26M256 160c0-16 2-26 8-36" stroke={B2} strokeWidth="3" />
        <ellipse cx="250" cy="130" rx="6" ry="10" fill={B3} transform="rotate(-25 250 130)" />
        <ellipse cx="276" cy="134" rx="6" ry="10" fill={B3} transform="rotate(35 276 134)" />
        <ellipse cx="264" cy="122" rx="5" ry="9" fill={B4} />
      </g>
      {motion && (
        <>
          <Sparkle x={212} y={40} delay={3} />
          <Sparkle x={92} y={110} delay={3.2} small />
          <Sparkle x={290} y={96} delay={3.4} small />
        </>
      )}
    </>
  );
}

/** 3. A sign goes up, a photo flash fires, and the listing goes live on a phone. */
function Market({ motion }: SceneProps) {
  const views = useCountUp(1248, 2100, 1500, 1);
  return (
    <>
      {/* Yard */}
      <path d="M10 196h190" stroke={B4} strokeWidth="3" pathLength={1} className="hiw-draw" style={d(0.05)} />
      <g className="hiw-grow-up" style={d(0.1, { transformOrigin: "62px 196px" })}>
        <rect x="24" y="126" width="76" height="70" fill="white" stroke={B} strokeWidth="3" />
        <rect x="52" y="160" width="20" height="36" fill={B2} />
        <rect x="32" y="136" width="14" height="14" rx="2" fill={B5} stroke={B} strokeWidth="2" />
        <rect x="78" y="136" width="14" height="14" rx="2" fill={B5} stroke={B} strokeWidth="2" />
      </g>
      <path d="M14 134L62 94l48 40" stroke={B} strokeWidth="7" className="hiw-roof" style={d(0.35)} />
      {/* For sale sign drops in */}
      <g className="hiw-drop" style={d(0.7)}>
        <path d="M150 196v-72M150 124h34" stroke={B} strokeWidth="4" />
        <path d="M168 124v6M182 124v6" stroke={B3} strokeWidth="1.5" />
        <rect x="150" y="130" width="46" height="30" rx="3" fill="white" stroke={B} strokeWidth="2.5" />
        <text x="173" y="143" textAnchor="middle" fill={B} fontSize="7.5" fontWeight="800">
          FOR
        </text>
        <text x="173" y="154" textAnchor="middle" fill={B} fontSize="7.5" fontWeight="800">
          SALE
        </text>
      </g>
      {/* Camera and flash */}
      <g className="hiw-pop" style={d(1)}>
        <rect x="104" y="30" width="40" height="28" rx="6" fill={B} />
        <rect x="114" y="25" width="14" height="7" rx="2" fill={B} />
        <circle cx="124" cy="44" r="9" fill={B2} stroke="white" strokeWidth="2.5" />
        <circle cx="138" cy="36" r="2" fill={LIGHT} />
      </g>
      <g className="hiw-flash-burst" style={d(1.35)}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d="M124 14v-8" stroke={B3} strokeWidth="2.5" transform={`rotate(${a} 124 44)`} />
        ))}
      </g>
      <rect x="0" y="0" width="320" height="220" fill="white" className="hiw-flash" style={d(1.35)} />
      {/* Listing goes live on a phone */}
      <g className="hiw-phone-up" style={d(1.6)}>
        <rect x="214" y="18" width="88" height="184" rx="14" fill={B} />
        <rect x="220" y="30" width="76" height="160" rx="8" fill="white" />
        <rect x="226" y="36" width="64" height="44" rx="4" fill={B4} />
        <path d="M242 70V56l16-11 16 11v14z" fill="white" />
        <rect x="252" y="60" width="12" height="10" fill={B2} />
        <rect x="226" y="86" width="40" height="11" rx="5.5" fill={B2} />
        <text x="246" y="94" textAnchor="middle" fill="white" fontSize="5.8" fontWeight="700">
          JUST LISTED
        </text>
        <rect x="226" y="104" width="52" height="7" rx="3" fill={B} />
        <rect x="226" y="116" width="44" height="4" rx="2" fill={B4} />
        <rect x="226" y="124" width="36" height="4" rx="2" fill={B4} />
        <path d="M230 150l-4-4a2.8 2.8 0 0 1 4-4 2.8 2.8 0 0 1 4 4z" fill={B2} />
        <text x="240" y="150" fill={B} fontSize="8" fontWeight="700">
          {views.toLocaleString("en-US")}
        </text>
        <text x="240" y="160" fill={B3} fontSize="6">
          views
        </text>
        <rect x="244" y="176" width="28" height="4" rx="2" fill={B4} />
      </g>
      {motion &&
        [0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${236 + i * 22} 146l-4.5-4.5a3.2 3.2 0 0 1 4.5-4.5 3.2 3.2 0 0 1 4.5 4.5z`}
            fill={i === 1 ? B : B2}
            className="hiw-hearts"
            style={d(2.4 + i * 0.45)}
          />
        ))}
    </>
  );
}

/** 4. Showings fill the calendar, offers arrive, and the best one is highlighted. */
function Offers() {
  const offers = [
    { y: 34, price: "$345,000", terms: "Conventional · 45 days", dl: 1.5 },
    { y: 86, price: "$352,000", terms: "Cash · 21 days", dl: 1.95, best: true },
    { y: 138, price: "$349,000", terms: "VA · 30 days", dl: 2.4 },
  ];
  return (
    <>
      {/* Showings calendar */}
      <g className="hiw-rise" style={d(0.1)}>
        <rect x="14" y="30" width="110" height="148" rx="10" fill="white" stroke={B4} strokeWidth="2" />
        <rect x="14" y="30" width="110" height="26" rx="10" fill={B} />
        <rect x="14" y="44" width="110" height="12" fill={B} />
        <text x="69" y="47" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" letterSpacing=".8">
          SHOWINGS
        </text>
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => (
            <rect key={`${r}${c}`} x={24 + c * 48} y={66 + r * 36} width="42" height="28" rx="5" fill={B5} stroke={B4} strokeWidth="1.2" />
          )),
        )}
      </g>
      {[0, 1, 2, 3, 4].map((i) => {
        const r = Math.floor(i / 2);
        const c = i % 2;
        return (
          <g key={i} className="hiw-pop" style={d(0.5 + i * 0.2)}>
            <rect x={24 + c * 48} y={66 + r * 36} width="42" height="28" rx="5" fill={B3} />
            <circle cx={38 + c * 48} cy={80 + r * 36} r="5" fill="white" />
            <rect x={46 + c * 48} y={77 + r * 36} width="14" height="6" rx="3" fill="white" />
          </g>
        );
      })}
      {/* Offers fly in */}
      {offers.map((o) => (
        <g key={o.y}>
          <g className={o.best ? "hiw-best" : undefined} style={o.best ? d(3, { transformOrigin: "224px 108px" }) : undefined}>
            <g className="hiw-fly-in" style={d(o.dl)}>
              <rect x="140" y={o.y} width="168" height="44" rx="10" fill="white" stroke={o.best ? B2 : B4} strokeWidth={o.best ? 2.5 : 1.5} />
              <rect x="150" y={o.y + 11} width="26" height="20" rx="3" fill={B5} stroke={B3} strokeWidth="1.5" />
              <path d={`M150 ${o.y + 13}l13 9 13-9`} stroke={B3} strokeWidth="1.5" />
              <text x="186" y={o.y + 20} fill={B} fontSize="11" fontWeight="800">
                {o.price}
              </text>
              <text x="186" y={o.y + 33} fill={B3} fontSize="7" fontWeight="600">
                {o.terms}
              </text>
            </g>
          </g>
          {o.best && (
            <g className="hiw-pop" style={d(3.2)}>
              <rect x="246" y={o.y - 8} width="58" height="15" rx="7.5" fill={B2} />
              <text x="275" y={o.y + 2.5} textAnchor="middle" fill="white" fontSize="6.8" fontWeight="800" letterSpacing=".4">
                BEST TERMS
              </text>
            </g>
          )}
        </g>
      ))}
      <Sparkle x={306} y={74} delay={3.4} small />
    </>
  );
}

/** 6. A SOLD rider drops onto the sign (which carries the logo), and the keys change hands. */
function Sold() {
  return (
    <>
      <path d="M10 198h300" stroke={B4} strokeWidth="3" pathLength={1} className="hiw-draw" style={d(0.05)} />
      {/* Sign with the logo */}
      <g className="hiw-drop" style={d(0.2)}>
        <path d="M74 198V46M74 50h112" stroke={B} strokeWidth="5" />
        <path d="M96 50v12M168 50v12" stroke={B3} strokeWidth="1.8" />
        <rect x="84" y="62" width="96" height="74" rx="6" fill="white" stroke={B} strokeWidth="3" />
        <image href="/images/logo-mark.png" x="94" y="70" width="76" height="47" preserveAspectRatio="xMidYMid meet" />
        <text x="132" y="129" textAnchor="middle" fill={B} fontSize="7" fontWeight="800" letterSpacing=".6">
          GET IT SOLD REALTY
        </text>
      </g>
      {/* SOLD rider slams on and swings */}
      <g className="hiw-rider" style={d(1.05, { transformOrigin: "132px 140px" })}>
        <path d="M106 136v6M158 136v6" stroke={B3} strokeWidth="1.8" />
        <rect x="88" y="142" width="88" height="28" rx="5" fill={B2} />
        <text x="132" y="161.5" textAnchor="middle" fill="white" fontSize="15" fontWeight="900" letterSpacing="2.5">
          SOLD!
        </text>
      </g>
      {/* Confetti from the rider */}
      <g transform="translate(132 150)">
        {[
          [-70, -70, B2],
          [-40, -96, B3],
          [0, -104, B],
          [42, -92, B2],
          [80, -60, B3],
          [96, -20, B],
          [-92, -24, B3],
          [-20, -80, B4],
          [26, -70, B4],
          [60, -96, B],
        ].map(([x, y, c], i) => (
          <rect key={i} x="-3" y="-6" width="6" height="12" rx="1.5" fill={c as string} className="hiw-confetti" style={d(1.35 + (i % 3) * 0.05, { "--x": `${x}px`, "--y": `${y}px`, "--r": `${(i % 2 ? 1 : -1) * (200 + i * 15)}deg` } as CSSProperties)} />
        ))}
      </g>
      {/* Seller hands the keys to the buyer */}
      <g className="hiw-pop" style={d(1.8)}>
        <circle cx="222" cy="148" r="11" fill={B3} />
        <rect x="211" y="161" width="22" height="34" rx="10" fill={B3} />
      </g>
      <g className="hiw-pop" style={d(1.95)}>
        <circle cx="290" cy="146" r="12" fill={B} />
        <rect x="278" y="160" width="24" height="36" rx="11" fill={B} />
      </g>
      <g className="hiw-handoff" style={d(2.3)}>
        <g transform="translate(232 166)">
          <circle cx="0" cy="0" r="6" stroke={B2} strokeWidth="3" />
          <path d="M6 0h14M15 0v4M19 0v3" stroke={B2} strokeWidth="3" />
        </g>
      </g>
      <g className="hiw-pop" style={d(3.2)}>
        <path d="M284 120l-5-5a3.5 3.5 0 0 1 5-5 3.5 3.5 0 0 1 5 5z" fill={B2} />
      </g>
      <Sparkle x={196} y={40} delay={1.5} />
      <Sparkle x={46} y={96} delay={1.7} small />
    </>
  );
}

function Check({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g className="hiw-pop" style={d(delay)}>
      <circle cx={x} cy={y} r="10" fill={B2} />
      <path d={`M${x - 4.5} ${y}l3 3 6-6.5`} stroke="white" strokeWidth="2.4" pathLength={1} className="hiw-draw" style={d(delay + 0.15, { animationDuration: ".35s" })} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Close & get your keys: real 3D door and key                      */
/* ------------------------------------------------------------------ */
function Keys() {
  return (
    <div className="hiw-camera relative mx-auto aspect-[320/220] w-full max-w-[400px] overflow-hidden rounded-lg" style={{ perspective: "760px" }}>
      {/* Wall and floor */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(${B5}, white 70%)` }} />
      <div className="absolute inset-x-0 bottom-0 h-[18%]" style={{ background: B4 }} />
      {/* Light spilling onto the floor once the door opens */}
      <div
        className="hiw-spill absolute bottom-0 left-[33%] h-[18%] w-[40%]"
        style={d(2.9, { background: "linear-gradient(white, transparent)", clipPath: "polygon(8% 0, 78% 0, 100% 100%, 0 100%)" })}
      />

      {/* Door assembly, turned a little so the key and the swing read in 3D */}
      <div className="absolute left-[33%] top-[8%] h-[75%] w-[30%]" style={{ transformStyle: "preserve-3d", transform: "rotateY(-22deg)" }}>
        {/* Frame and the warm room behind */}
        <div className="absolute -inset-[7px] rounded-t-md" style={{ background: B }} />
        <div className="absolute inset-0 overflow-hidden" style={{ background: `radial-gradient(circle at 50% 40%, white 55%, ${B5})` }}>
          {/* The logo rises in the doorway */}
          <div className="hiw-emerge-up absolute inset-x-[10%] top-[30%] rounded-md bg-white p-1 shadow-md" style={d(3.15)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-mark.png" alt="" className="h-auto w-full" />
          </div>
          <div className="absolute inset-x-[12%] bottom-[4%] h-[8%] rounded-sm" style={{ background: B3 }} />
        </div>

        {/* Bolt between door and frame: slides back with a click */}
        <div className="hiw-bolt absolute right-[-6px] top-[52%] h-[5px] w-[12px] rounded-sm" style={d(1.95, { background: B3 })} />

        {/* The door swings open on its hinges */}
        <div className="hiw-door3d absolute inset-0" style={d(2.45, { transformOrigin: "left center", transformStyle: "preserve-3d" })}>
          <div className="absolute inset-0 rounded-[2px]" style={{ background: B2, boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.08)" }}>
            <div className="absolute inset-x-[14%] top-[8%] h-[34%] rounded-[3px] border-2" style={{ borderColor: "rgb(255 255 255 / 0.18)" }} />
            <div className="absolute inset-x-[14%] bottom-[8%] h-[40%] rounded-[3px] border-2" style={{ borderColor: "rgb(255 255 255 / 0.18)" }} />
            {/* Lock plate and keyhole */}
            <div className="absolute right-[9%] top-[46%] h-[16%] w-[13%] rounded-full" style={{ background: B4 }}>
              <div className="absolute left-1/2 top-[30%] h-[22%] w-[34%] -translate-x-1/2 rounded-full" style={{ background: B }} />
              <div className="absolute left-1/2 top-[45%] h-[35%] w-[16%] -translate-x-1/2" style={{ background: B }} />
            </div>
            {/* Shade on the door as it turns away from the light */}
            <div className="hiw-door-shade absolute inset-0 bg-black" style={d(2.45)} />
          </div>

        </div>
      </div>

      {/* "Click" lines at the lock */}
      <svg viewBox="0 0 320 220" className="absolute inset-0 h-full w-full" fill="none" strokeLinecap="round">
        {/* The key, in side view at the keyhole. It slides in, turns a quarter turn
            around its own shaft (the head and teeth foreshorten to a thin edge while
            the round shaft stays put), then is pulled back out before the door opens. */}
        <g className="hiw-key-out" style={d(2.0)}>
          <g className="hiw-key-slide" style={d(0.5)}>
            <ellipse cx="214" cy="117" rx="30" ry="3" fill={B} opacity="0.12" />
            <g className="hiw-key-turn" style={d(1.4, { transformOrigin: "214px 108px" })}>
              <path d="M190 110.5v6h4v-3.5h4.5v5h4.5v-4.5h3.5v-3z" fill={B} />
              <rect x="227" y="104.5" width="5" height="7" rx="1.5" fill={B} />
              <circle cx="244" cy="108" r="13" fill={B2} />
              <circle cx="244" cy="108" r="13" fill="none" stroke={B} strokeWidth="2.5" />
              <circle cx="247" cy="108" r="4.5" fill="white" />
              <path d="M236 101a9 9 0 0 1 6-3" stroke={B4} strokeWidth="2" />
            </g>
            {/* Round shaft: looks the same from every angle, so it doesn't foreshorten */}
            <rect x="184" y="105.5" width="45" height="5" rx="2.5" fill={B} />
            <path d="M187 106.6h38" stroke={B3} strokeWidth="1" opacity="0.8" />
          </g>
        </g>
        <g className="hiw-click" style={d(1.95)}>
          <path d="M176 92l-4-7M185 89v-8M194 92l4-7" stroke={B2} strokeWidth="2.5" />
        </g>
        {/* Confetti once the door is open */}
        <g transform="translate(152 96)">
          {[
            [-90, -60, B2],
            [-60, -84, B3],
            [-20, -92, B],
            [30, -88, B2],
            [74, -70, B3],
            [96, -30, B],
            [-104, -20, B3],
            [-44, -60, LIGHT],
            [50, -50, LIGHT],
            [8, -70, B4],
            [110, 10, B2],
            [-112, 18, B2],
          ].map(([x, y, c], i) => (
            <rect
              key={i}
              x="-3"
              y="-6"
              width="6"
              height="12"
              rx="1.5"
              fill={c as string}
              className="hiw-confetti"
              style={d(3.3 + (i % 3) * 0.06, { "--x": `${x}px`, "--y": `${y}px`, "--r": `${(i % 2 ? 1 : -1) * (180 + i * 20)}deg` } as CSSProperties)}
            />
          ))}
        </g>
        <Sparkle x={150} y={30} delay={3.55} />
        <Sparkle x={248} y={60} delay={3.7} small />
      </svg>
    </div>
  );
}

function Sparkle({ x, y, delay, small = false }: { x: number; y: number; delay: number; small?: boolean }): ReactNode {
  const s = small ? 6 : 9;
  return (
    <path
      d={`M${x} ${y - s}q1.5 ${s - 1.5} ${s} ${s}q${-(s - 1.5)} 1.5 ${-s} ${s}q-1.5 ${-(s - 1.5)} ${-s} ${-s}q${s - 1.5} -1.5 ${s} ${-s}z`}
      fill={B2}
      className="hiw-sparkle"
      style={d(delay)}
    />
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return reduced;
}

/** Counts up to `target` after `delay` ms over `duration` ms; shows the final number for reduced motion. */
function useCountUp(target: number, delay: number, duration: number, step = 1000) {
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
      setValue(Math.round((target * eased) / step) * step);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, delay, duration, step]);
  return value;
}
