import React, { useMemo } from "react";
import { mulberry32, buildSkyline } from "./cityGen";

// Dense cyberpunk backdrop: stacked towers with lit windows, vertical neon signs,
// and flying-car light trails. Sits behind the night sections.
const W = 1600;
const H = 1000;

const SIGNS = [
  { x: 180, y: 260, text: "スキル", color: "#2ee6ff" },
  { x: 520, y: 380, text: "ネオン", color: "#ff4f9a" },
  { x: 1080, y: 300, text: "夜景", color: "#ffd36b" },
  { x: 1380, y: 420, text: "未来", color: "#2ee6ff" },
];

const TRAFFIC = [
  { y: 330, dur: 9, delay: 0, color: "#ff4f9a" },
  { y: 410, dur: 13, delay: -4, color: "#2ee6ff" },
  { y: 520, dur: 11, delay: -7, color: "#ffd36b" },
  { y: 610, dur: 16, delay: -2, color: "#ff2a4f" },
];

export default function NightCity() {
  const { far, mid, near } = useMemo(() => {
    const rand = mulberry32(612);
    const windowColors = ["#ffd36b", "#ffd36b", "#2ee6ff", "#ff4f9a", "#b9a6ff"];
    return {
      far: buildSkyline(rand, { width: W, baseY: H, minH: 600, maxH: 920, minW: 50, maxW: 90, gap: 4, litChance: 0.05, colors: windowColors }),
      mid: buildSkyline(rand, { width: W, baseY: H, minH: 420, maxH: 760, minW: 70, maxW: 130, gap: 10, litChance: 0.14, colors: windowColors }),
      near: buildSkyline(rand, { width: W, baseY: H, minH: 200, maxH: 520, minW: 100, maxW: 180, gap: 8, litChance: 0.22, colors: windowColors }),
    };
  }, []);

  const layer = (buildings, fill, opacity) => (
    <>
      <g fill={fill}>
        {buildings.map((b, i) => (
          <path key={i} d={b.d} />
        ))}
      </g>
      <g opacity={opacity}>
        {buildings.map((b, j) => b.windows.map((w, k) => <rect key={`${j}-${k}`} x={w.x} y={w.y} width="3.5" height="5" fill={w.fill} />))}
      </g>
    </>
  );

  return (
    <div className="night-city" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-speed="0.3" data-parallax="down">
        {layer(far, "#1b1650", 0.35)}
      </svg>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-speed="0.18" data-parallax="down">
        {TRAFFIC.map((t, i) => (
          <g key={i} className="traffic" style={{ animationDuration: `${t.dur}s`, animationDelay: `${t.delay}s` }}>
            <rect x="0" y={t.y} width="70" height="2" fill={t.color} opacity="0.9" />
            <circle cx="72" cy={t.y + 1} r="3" fill="#fff" />
          </g>
        ))}
        {layer(mid, "#120f3a", 0.6)}
        {SIGNS.map((s, i) => (
          <g key={i} className="night-sign" style={{ animationDelay: `${i * 1.7}s` }}>
            <rect x={s.x} y={s.y} width="34" height={s.text.length * 30 + 14} rx="4" fill="#0a0820" stroke={s.color} strokeWidth="2.5" />
            {s.text.split("").map((ch, k) => (
              <text key={k} x={s.x + 17} y={s.y + 34 + k * 30} textAnchor="middle" fontSize="22" fontWeight="900" fill={s.color}>
                {ch}
              </text>
            ))}
          </g>
        ))}
      </svg>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-speed="0.06" data-parallax="down">
        {layer(near, "#08071c", 1)}
      </svg>
    </div>
  );
}
