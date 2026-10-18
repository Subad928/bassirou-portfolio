import React, { forwardRef, useMemo } from "react";
import { mulberry32, buildSkyline } from "./cityGen";

const WINDOW_COLORS = ["#ffd36b", "#ffd36b", "#ffd36b", "#2ee6ff", "#ff4f9a"];

// A dusk city view: striped sun, two skyline layers, neon sign.
// Exported on its own so the ASCII window can sample the exact same picture.
export const CityScene = forwardRef(function CityScene({ label, className, style }, ref) {
  const { back, front } = useMemo(() => {
    const rand = mulberry32(928);
    return {
      back: buildSkyline(rand, { width: 400, baseY: 300, minH: 90, maxH: 190, minW: 22, maxW: 44, gap: 2, litChance: 0.12, colors: WINDOW_COLORS }),
      front: buildSkyline(rand, { width: 400, baseY: 300, minH: 40, maxH: 130, minW: 30, maxW: 60, gap: 2, litChance: 0.3, colors: WINDOW_COLORS }),
    };
  }, []);

  const sign = label.split("");

  return (
    <svg ref={ref} className={className} style={style} viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a1450" />
            <stop offset="0.45" stopColor="#6b3cff" />
            <stop offset="0.72" stopColor="#ff4f9a" />
            <stop offset="1" stopColor="#ff8a3d" />
          </linearGradient>
          <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe27a" />
            <stop offset="1" stopColor="#ff2a4f" />
          </linearGradient>
          <mask id="sun-stripes">
            <rect width="400" height="300" fill="#fff" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="0" y={150 + i * 11} width="400" height={2 + i * 1.2} fill="#000" />
            ))}
          </mask>
        </defs>

        <rect width="400" height="300" fill="url(#sky)" />
        {[...Array(26)].map((_, i) => (
          <circle key={i} cx={(i * 97) % 400} cy={(i * 53) % 110} r={i % 4 === 0 ? 1.1 : 0.6} fill="#fff" opacity={0.5 + (i % 3) * 0.2} />
        ))}
        <circle cx="270" cy="170" r="70" fill="url(#sun)" mask="url(#sun-stripes)" />
        <path d="M0 230 L60 190 L110 215 L170 175 L230 210 L300 180 L360 205 L400 190 L400 300 L0 300 Z" fill="#3b1f6e" opacity="0.8" />

        <g fill="#24164f">
          {back.map((b, i) => (
            <path key={i} d={b.d} />
          ))}
        </g>
        {back.map((b, i) => b.windows.map((w, j) => <rect key={`${i}-${j}`} x={w.x} y={w.y} width="3" height="4" fill={w.fill} opacity="0.45" />))}

        <g fill="#0b0920">
          {front.map((b, i) => (
            <path key={i} d={b.d} />
          ))}
        </g>
        {front.map((b, i) => b.windows.map((w, j) => <rect key={`${i}-${j}`} x={w.x} y={w.y} width="3" height="4" fill={w.fill} />))}

        <g className="neon-sign">
          <rect x="96" y="70" width="30" height={sign.length * 24 + 16} rx="4" fill="#0b0920" stroke="#ff4f9a" strokeWidth="2" />
          {sign.map((ch, i) => (
            <text key={i} x="111" y={98 + i * 24} textAnchor="middle" fontSize="18" fontWeight="900" fill="#ffe0ef">
              {ch}
            </text>
          ))}
        </g>
    </svg>
  );
});

// The view out of a city-pop apartment window.
export default function CityWindow({ label }) {
  return (
    <div className="city-window" aria-hidden="true">
      <CityScene label={label} />
      <div className="city-window__frame" />
    </div>
  );
}
