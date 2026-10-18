import React, { useMemo } from "react";
import { mulberry32 } from "../../components/cityGen";

// Drawings scene: velvety rolling moss hills under a soft misty sky,
// with a carpet of clover in the foreground.
const W = 1440;
const H = 1000;

function ridge(yBase, amp, freq, phase) {
  let d = `M0 ${H}L0 ${yBase}`;
  for (let x = 0; x <= W; x += 30) {
    const y = yBase + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2.3 + phase * 1.7) * amp * 0.35;
    d += `L${x} ${y.toFixed(1)}`;
  }
  return `${d}L${W} ${H}Z`;
}

// far → near: lighter, hazier hills in back, deep velvet green in front
const HILLS = [
  { y: 330, amp: 40, freq: 0.004, phase: 0.6, top: "#d7e6a2", bottom: "#a9c46a", speed: 0.16 },
  { y: 420, amp: 55, freq: 0.0036, phase: 2.1, top: "#bfd77a", bottom: "#86a843", speed: 0.12 },
  { y: 520, amp: 60, freq: 0.0042, phase: 4.0, top: "#a6c45a", bottom: "#6a8f2c", speed: 0.08 },
  { y: 630, amp: 70, freq: 0.0032, phase: 1.2, top: "#8db246", bottom: "#4f7420", speed: 0.05 },
];

export default function Moss() {
  const clovers = useMemo(() => {
    const rand = mulberry32(410);
    return [...Array(140)].map(() => {
      const x = rand() * W;
      const y = 800 + rand() * 230;
      return { x, y, s: 0.6 + ((y - 800) / 230) * 0.9 + rand() * 0.3, rot: rand() * 360, bright: rand() < 0.25 };
    }).sort((a, b) => a.y - b.y);
  }, []);

  return (
    <div className="art-scene scene-moss" aria-hidden="true">
      <div className="moss__sky" />
      {HILLS.map((h, i) => (
        <svg key={i} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-speed={h.speed}>
          <defs>
            <linearGradient id={`hill-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={h.top} />
              <stop offset="0.35" stopColor={h.bottom} />
              <stop offset="1" stopColor="#2f4f16" />
            </linearGradient>
          </defs>
          <path d={ridge(h.y, h.amp, h.freq, h.phase)} fill={`url(#hill-${i})`} />
          <path d={ridge(h.y, h.amp, h.freq, h.phase)} fill="url(#moss-grain)" opacity="0.55" className="moss__grain" />
        </svg>
      ))}

      {/* fine grain so the hills read as soft moss instead of flat vector */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="moss-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.12  0 0 0 0 0.2  0 0 0 0 0.05  0 0 0 1.1 -0.45" />
          </filter>
          <pattern id="moss-grain" width="260" height="260" patternUnits="userSpaceOnUse">
            <rect width="260" height="260" filter="url(#moss-noise)" />
          </pattern>
        </defs>
      </svg>

      <div className="moss__mist" />

      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className="moss__clover">
        <defs>
          <linearGradient id="clover-bed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1d5a1c" stopOpacity="0" />
            <stop offset="0.25" stopColor="#174d18" />
            <stop offset="1" stopColor="#0c2f0f" />
          </linearGradient>
          {/* one three-leaf clover, reused for the whole carpet */}
          <symbol id="clover" viewBox="-30 -30 60 60" overflow="visible">
            {[0, 120, 240].map((a) => (
              <g key={a} transform={`rotate(${a})`}>
                <path d="M0 0 C -14 -6, -16 -24, -4 -26 C 0 -26, 0 -22, 0 -20 C 0 -22, 0 -26, 4 -26 C 16 -24, 14 -6, 0 0 Z" />
                <path d="M0 -4 L0 -19" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
              </g>
            ))}
          </symbol>
        </defs>
        <rect x="0" y="760" width={W} height={H - 760} fill="url(#clover-bed)" />
        {clovers.map((c, i) => (
          <use
            key={i}
            href="#clover"
            x={-30}
            y={-30}
            width="60"
            height="60"
            className={c.bright ? "clover clover--bright" : "clover"}
            transform={`translate(${c.x.toFixed(1)} ${c.y.toFixed(1)}) rotate(${c.rot.toFixed(0)}) scale(${c.s.toFixed(2)})`}
          />
        ))}
      </svg>
    </div>
  );
}
