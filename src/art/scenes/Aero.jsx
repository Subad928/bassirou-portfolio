import React from "react";

// Intro scene in classic Frutiger Aero style, leaning green: glossy grass hills,
// a soft sun with lens flare, sweeping light ribbons and floating glossy bubbles.
const W = 1440;
const H = 1000;

const BUBBLES = [
  { x: 8, y: 22, s: 120, d: 0 },
  { x: 86, y: 16, s: 80, d: -3 },
  { x: 16, y: 62, s: 54, d: -6 },
  { x: 78, y: 58, s: 100, d: -2 },
  { x: 92, y: 40, s: 36, d: -8 },
  { x: 30, y: 12, s: 30, d: -5 },
  { x: 64, y: 8, s: 46, d: -9 },
];

export default function Aero() {
  return (
    <div className="art-scene scene-aero" aria-hidden="true">
      <div className="aero__sky" />

      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-speed="0.25">
        <defs>
          <radialGradient id="aero-sun">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.3" stopColor="#fbffe8" stopOpacity="0.9" />
            <stop offset="1" stopColor="#eaffd6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="1150" cy="170" r="260" fill="url(#aero-sun)" />
        {/* lens flare */}
        {[
          [980, 300, 26, 0.35],
          [860, 380, 14, 0.4],
          [700, 480, 40, 0.18],
          [560, 570, 10, 0.45],
        ].map(([x, y, r, o], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={o} />
        ))}
      </svg>

      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-speed="0.18" className="aero__swooshes">
        <defs>
          <linearGradient id="swoosh" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#e9ffb0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-120 560 C 300 380, 820 660, 1560 330" stroke="url(#swoosh)" strokeWidth="70" fill="none" strokeLinecap="round" opacity="0.45" />
        <path d="M-120 640 C 360 470, 900 700, 1560 440" stroke="url(#swoosh)" strokeWidth="22" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M-120 480 C 420 340, 960 520, 1560 260" stroke="url(#swoosh)" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.8" />
      </svg>

      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-speed="0.1">
        <defs>
          <linearGradient id="hill-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d4f78a" />
            <stop offset="0.5" stopColor="#8fdc52" />
            <stop offset="1" stopColor="#4fb53c" />
          </linearGradient>
        </defs>
        <path d="M0 640 C 280 540, 620 560, 860 610 S 1250 540, 1440 570 V1000 H0 Z" fill="url(#hill-back)" />
      </svg>

      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-speed="0.04">
        <defs>
          <linearGradient id="hill-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a8ee5a" />
            <stop offset="0.35" stopColor="#4cc43c" />
            <stop offset="1" stopColor="#167a2c" />
          </linearGradient>
          {/* glossy highlight along the crest */}
          <linearGradient id="hill-gloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="0.18" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 780 C 340 650, 760 670, 1010 730 S 1330 700, 1440 670 V1000 H0 Z" fill="url(#hill-front)" />
        <path d="M0 780 C 340 650, 760 670, 1010 730 S 1330 700, 1440 670 V1000 H0 Z" fill="url(#hill-gloss)" />
      </svg>

      <div className="aero__bubbles">
        {BUBBLES.map((b, i) => (
          <i key={i} style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.s, height: b.s, animationDelay: `${b.d}s` }} />
        ))}
      </div>
    </div>
  );
}
