import React from "react";

// 3D Art scene: deep in the pond. Sunbeams cut down through teal water
// and bubbles drift up.
const W = 1440;
const H = 1000;

const RAYS = [
  { x: 260, w: 90, spread: 220, o: 0.32, d: 0 },
  { x: 520, w: 50, spread: 160, o: 0.22, d: -3 },
  { x: 760, w: 120, spread: 300, o: 0.38, d: -6 },
  { x: 1040, w: 60, spread: 180, o: 0.24, d: -2 },
  { x: 1240, w: 80, spread: 240, o: 0.3, d: -8 },
];

export default function Deep() {
  const bubbles = [...Array(22)].map((_, i) => ({
    left: (i * 29 + 7) % 100,
    size: 4 + (i % 5) * 3,
    delay: -(i * 1.7),
    dur: 10 + (i % 6) * 3,
  }));

  return (
    <div className="art-scene scene-deep" aria-hidden="true">
      <div className="deep__water" />
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin slice" className="deep__rays">
        <defs>
          <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f2fff6" stopOpacity="0.9" />
            <stop offset="1" stopColor="#bff7ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        {RAYS.map((r, i) => (
          <polygon
            key={i}
            className="deep__ray"
            style={{ animationDelay: `${r.d}s` }}
            points={`${r.x - r.w / 2},0 ${r.x + r.w / 2},0 ${r.x + r.spread / 2 + 80},${H} ${r.x - r.spread / 2 + 80},${H}`}
            fill="url(#ray)"
            opacity={r.o}
          />
        ))}
      </svg>
      <div className="deep__bubbles">
        {bubbles.map((b, i) => (
          <i
            key={i}
            style={{
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.dur}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
