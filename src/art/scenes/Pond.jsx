import React, { useMemo } from "react";

// Web Design scene: sunlit pond water with soft drifting caustic light,
// swaying sunrays and a few rising motes. Kept light so scrolling stays smooth.
export default function Pond() {
  const motes = useMemo(
    () => [...Array(16)].map((_, i) => ({ left: (i * 37) % 100, delay: -(i * 1.9) % 24, size: 2 + (i % 4), dur: 18 + (i % 7) * 3 })),
    []
  );

  return (
    <div className="art-scene pond" aria-hidden="true">
      <div className="pond__water" />

      {/* one static caustic texture, drifted with a cheap composited transform */}
      <svg className="pond__caustics" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <filter id="caustic-a" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="turbulence" baseFrequency="0.018 0.028" numOctaves="2" seed="7" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.85  0 0 0 0 1  0 0 0 0 0.9  0 0 0 -3.2 1.25" />
        </filter>
        <rect width="800" height="500" filter="url(#caustic-a)" />
      </svg>

      <div className="pond__rays" />

      <div className="pond__motes">
        {motes.map((m, i) => (
          <i
            key={i}
            style={{
              left: `${m.left}%`,
              width: m.size,
              height: m.size,
              animationDelay: `${m.delay}s`,
              animationDuration: `${m.dur}s`,
            }}
          />
        ))}
      </div>

      <div className="pond__vignette" />
    </div>
  );
}
