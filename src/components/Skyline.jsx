import React, { useMemo } from "react";
import { mulberry32, buildSkyline } from "./cityGen";

/**
 * A layered skyline that sits at the bottom of a section and melts into the next one.
 * The nearest layer's color should match the next section's top background so the
 * silhouettes read as the ground the next section stands on.
 *
 * layers: [{ color, minH, maxH, minW, maxW, litChance?, colors?, speed? }], far → near
 */
// Extra building height hidden below the section edge, so parallax never reveals a gap.
const BLEED = 160;

export default function Skyline({ layers, seed = 1, height = 260, className = "" }) {
  const W = 1600;
  const H = height + BLEED;
  const rendered = useMemo(() => {
    const rand = mulberry32(seed);
    return layers.map((layer) => ({
      ...layer,
      buildings: buildSkyline(rand, { width: W, ...layer, baseY: H, minH: layer.minH + BLEED, maxH: layer.maxH + BLEED }),
    }));
  }, [layers, seed, H]);

  return (
    <div className={`skyline ${className}`} style={{ height }} aria-hidden="true">
      {rendered.map((layer, i) => (
        <svg
          key={i}
          className="skyline__layer"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMax slice"
          data-speed={layer.speed ?? 0}
        >
          <g fill={layer.color}>
            {layer.buildings.map((b, j) => (
              <path key={j} d={b.d} />
            ))}
          </g>
          {layer.buildings.map((b, j) =>
            b.windows.map((w, k) => <rect key={`${j}-${k}`} x={w.x} y={w.y} width="3.5" height="5" fill={w.fill} />)
          )}
        </svg>
      ))}
    </div>
  );
}
