import React, { useMemo } from "react";
import { mulberry32, buildSkyline } from "./cityGen";

// Pastel daytime megacity behind the hero: hazy towers, white skyscrapers with
// rooftop gardens, a monorail, and drifting clouds. Each layer gets its own parallax speed.
const W = 1600;
const H = 900;

const CLOUDS = [
  { x: 120, y: 140, s: 1.2, d: 0 },
  { x: 620, y: 90, s: 0.8, d: -18 },
  { x: 1050, y: 190, s: 1.4, d: -9 },
  { x: 1400, y: 110, s: 0.9, d: -27 },
];

function Cloud({ x, y, s, d }) {
  return (
    <g className="cloud" style={{ animationDelay: `${d}s` }} transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="90" ry="26" />
      <ellipse cx="-40" cy="-14" rx="44" ry="30" />
      <ellipse cx="22" cy="-26" rx="52" ry="38" />
    </g>
  );
}

export default function DayCity() {
  const { far, mid, near, gardens } = useMemo(() => {
    const rand = mulberry32(2027);
    const far = buildSkyline(rand, {
      width: W, baseY: H, minH: 480, maxH: 800, minW: 40, maxW: 80, gap: 8,
      shapes: ["spire", "dome", "taper", "flat"],
    });
    const mid = buildSkyline(rand, {
      width: W, baseY: H, minH: 300, maxH: 600, minW: 70, maxW: 130, gap: 22,
      shapes: ["dome", "step", "flat", "taper"],
    });
    const near = buildSkyline(rand, {
      width: W, baseY: H, minH: 110, maxH: 260, minW: 90, maxW: 170, gap: 14,
      shapes: ["flat", "step", "dome"],
    });
    // tree clusters on some mid-layer rooftops
    const gardens = mid
      .filter((_, i) => i % 3 === 1)
      .map((b) => ({ x: b.x + b.w / 2, y: H - b.h + (b.shape === "dome" ? b.w / 2 : 0), w: b.w }));
    return { far, mid, near, gardens };
  }, []);

  return (
    <div className="day-city" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-speed="0.35">
        <circle cx="1270" cy="210" r="210" fill="#fff4d6" opacity="0.55" />
        <circle cx="1270" cy="210" r="110" fill="#fff8e6" />
        <g fill="#fff">
          {CLOUDS.map((c, i) => (
            <Cloud key={i} {...c} />
          ))}
        </g>
      </svg>

      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-speed="0.25">
        <g fill="#c4d8ef">
          {far.map((b, i) => (
            <path key={i} d={b.d} />
          ))}
        </g>
      </svg>

      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-speed="0.15">
        {mid.map((b, i) => (
          <g key={i}>
            <path d={b.d} fill="#f7fbff" stroke="#9dbbe0" strokeWidth="2.5" />
            {/* glass bands */}
            {[...Array(Math.floor(b.h / 46))].map((_, k) => (
              <rect key={k} x={b.x + 8} y={H - b.h + 40 + k * 46} width={Math.max(b.w - 16, 4)} height="14" rx="7" fill="#bcd8f5" />
            ))}
          </g>
        ))}
        {/* skybridges */}
        {mid.slice(1, -1).map((b, i) =>
          i % 2 === 0 ? <rect key={i} x={b.x + b.w - 4} y={H - b.h * 0.55} width="40" height="10" rx="5" fill="#e6f0fb" stroke="#b8d1ea" strokeWidth="2" /> : null
        )}
        {gardens.map((g, i) => (
          <g key={i} transform={`translate(${g.x} ${g.y})`}>
            <circle cx="-16" cy="-6" r="16" fill="#8fd18a" />
            <circle cx="10" cy="-14" r="20" fill="#6cc07a" />
            <circle cx="26" cy="-2" r="12" fill="#a7e09a" />
          </g>
        ))}
        {/* monorail */}
        <rect x="-20" y="638" width={W + 40} height="10" fill="#9fbde0" />
        {[...Array(9)].map((_, i) => (
          <rect key={i} x={80 + i * 190} y="648" width="12" height={H - 648} fill="#c4d8ee" />
        ))}
        <g className="monorail-train">
          <rect x="0" y="606" width="190" height="30" rx="15" fill="#ffffff" stroke="#9fbde0" strokeWidth="2" />
          <rect x="18" y="613" width="140" height="10" rx="5" fill="#7fb6ff" />
          <rect x="166" y="613" width="16" height="10" rx="5" fill="#ff2a4f" />
        </g>
      </svg>

      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-speed="0.05">
        <g fill="#e4dafb" stroke="#b9a8ee" strokeWidth="2.5">
          {near.map((b, i) => (
            <path key={i} d={b.d} />
          ))}
        </g>
        {near.map((b, i) =>
          i % 2 === 0 ? (
            <g key={i} transform={`translate(${b.x + b.w * 0.3} ${H - 6})`}>
              <circle cx="0" cy="-22" r="24" fill="#7ccf86" />
              <circle cx="30" cy="-14" r="18" fill="#9fde95" />
              <rect x="-2" y="-8" width="4" height="10" fill="#6b8f6f" />
            </g>
          ) : null
        )}
      </svg>
    </div>
  );
}
