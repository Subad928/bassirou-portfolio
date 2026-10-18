// Procedural skyline helpers shared by every city scene on the page.

// Small seeded PRNG so each skyline looks the same on every load.
export function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SHAPES = ["flat", "flat", "step", "dome", "spire", "taper", "flat"];

// Returns an SVG path for one building, with the base sitting on baseY.
function buildingPath({ x, w, h, shape }, baseY) {
  const top = baseY - h;
  switch (shape) {
    case "step": {
      const s = Math.min(w * 0.22, 14);
      return `M${x} ${baseY}V${top + s * 2}H${x + s}V${top + s}H${x + s * 2}V${top}H${x + w - s * 2}V${top + s}H${x + w - s}V${top + s * 2}H${x + w}V${baseY}Z`;
    }
    case "dome": {
      const r = w / 2;
      return `M${x} ${baseY}V${top + r}A${r} ${r} 0 0 1 ${x + w} ${top + r}V${baseY}Z`;
    }
    case "spire": {
      const mid = x + w / 2;
      return `M${x} ${baseY}V${top + 18}L${mid - 2} ${top + 4}V${top - 26}H${mid + 2}V${top + 4}L${x + w} ${top + 18}V${baseY}Z`;
    }
    case "taper": {
      const inset = w * 0.18;
      return `M${x} ${baseY}L${x + inset} ${top}H${x + w - inset}L${x + w} ${baseY}Z`;
    }
    default:
      return `M${x} ${baseY}V${top}H${x + w}V${baseY}Z`;
  }
}

// Widest window drawn by any scene; keeps lit windows inside the outline.
const WIN_W = 4;

// Left/right edge of a building's outline at height y, so windows follow
// tapered and stepped tops instead of floating outside them.
function rowBounds({ x, w, h, shape }, y, baseY) {
  const top = baseY - h;
  if (shape === "taper") {
    const inset = w * 0.18 * ((baseY - y) / h);
    return [x + inset, x + w - inset];
  }
  if (shape === "step") {
    const s = Math.min(w * 0.22, 14);
    // window rects are 5px tall, so test the row's top edge against each step
    if (y < top + s) return [x + s * 2, x + w - s * 2];
    if (y < top + s * 2) return [x + s, x + w - s];
  }
  return [x, x + w];
}

/**
 * Lay buildings left-to-right across `width`.
 * Each result has a `d` path, plus lit window rects when `litChance` > 0.
 */
export function buildSkyline(
  rand,
  { width = 400, baseY = 300, minH, maxH, minW, maxW, litChance = 0, gap = 3, colors = ["#ffd36b"], shapes = SHAPES }
) {
  const buildings = [];
  let x = -20;
  while (x < width + 20) {
    const w = minW + rand() * (maxW - minW);
    const h = minH + rand() * (maxH - minH);
    const shape = shapes[Math.floor(rand() * shapes.length)];
    const b = { x, w, h, shape };
    b.d = buildingPath(b, baseY);
    b.windows = [];
    if (litChance > 0) {
      const startY = baseY - h + (shape === "dome" ? w / 2 + 6 : shape === "spire" ? 24 : 12);
      for (let wy = startY; wy < baseY - 8; wy += 10) {
        const [left, right] = rowBounds(b, wy, baseY);
        for (let wx = left + 5; wx + WIN_W <= right - 4; wx += 8) {
          if (rand() < litChance) {
            b.windows.push({ x: wx, y: wy, fill: colors[Math.floor(rand() * colors.length)] });
          }
        }
      }
    }
    buildings.push(b);
    x += w + gap + rand() * gap * 2;
  }
  return buildings;
}
