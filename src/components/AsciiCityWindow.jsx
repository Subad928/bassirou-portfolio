import React, { useEffect, useRef } from "react";
import { CityScene } from "./CityWindow";

// The Volunteering window's city, redrawn as colored ASCII.
// The scene SVG is rasterized off-screen, sampled once per character cell, and
// painted onto a canvas using the letters of TEXT in reading order. Each letter takes
// the color of the scene behind it; the letters slowly flow through the frame.
const TEXT = "BASSIROUDIOP";
const FONT_PX = 11; // glyph size
const CELL_W = 7; // horizontal step per character
const CELL_H = 11; // line height
const STEP_MS = 160; // how often the letters shift by one

export default function AsciiCityWindow({ label }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const scene = useRef(null);

  useEffect(() => {
    const box = wrap.current;
    const cv = canvas.current;
    const svg = scene.current;
    const ctx = cv.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cells = null; // { cols, rows, colors: [[r,g,b,a]...] }
    let offset = 0;
    let timer = 0;
    let visible = true;
    let cancelled = false;

    // Rasterize the SVG at the window's aspect and read back one sample per cell,
    // keeping the brightest of 2×2 sub-samples so small lit windows don't vanish.
    const sample = async () => {
      const { width, height } = box.getBoundingClientRect();
      if (!width || !height) return;
      const cols = Math.ceil(width / CELL_W);
      const rows = Math.ceil(height / CELL_H);

      const clone = svg.cloneNode(true);
      clone.setAttribute("width", cols * CELL_W);
      clone.setAttribute("height", rows * CELL_H);
      clone.removeAttribute("class");
      clone.removeAttribute("style");
      const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml" }));
      const img = new Image();
      img.src = url;
      try {
        await img.decode();
      } finally {
        URL.revokeObjectURL(url);
      }
      if (cancelled) return;

      const sw = cols * 2;
      const sh = rows * 2;
      const off = document.createElement("canvas");
      off.width = sw;
      off.height = sh;
      const octx = off.getContext("2d", { willReadFrequently: true });
      octx.drawImage(img, 0, 0, sw, sh);
      const data = octx.getImageData(0, 0, sw, sh).data;

      const colors = new Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let best = null;
          let bestL = -1;
          for (let dy = 0; dy < 2; dy++) {
            for (let dx = 0; dx < 2; dx++) {
              const i = ((r * 2 + dy) * sw + (c * 2 + dx)) * 4;
              const L = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
              if (L > bestL) {
                bestL = L;
                best = [data[i], data[i + 1], data[i + 2]];
              }
            }
          }
          // brighter parts of the scene get more opaque letters; colors get a lift so
          // even the dark sky and buildings keep a visible letter texture
          const lum = bestL / 255;
          const lift = (v) => Math.min(255, Math.round(v * 1.2 + 28));
          colors[r * cols + c] = [lift(best[0]), lift(best[1]), lift(best[2]), Math.min(1, 0.34 + lum * 1.3)];
        }
      }
      cells = { cols, rows, colors };

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = cols * CELL_W * dpr;
      cv.height = rows * CELL_H * dpr;
      cv.style.width = `${cols * CELL_W}px`;
      cv.style.height = `${rows * CELL_H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      if (!cells) return;
      const { cols, rows, colors } = cells;
      ctx.fillStyle = "#07051a";
      ctx.fillRect(0, 0, cols * CELL_W, rows * CELL_H);
      ctx.font = `700 ${FONT_PX}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const [cr, cg, cb, a] = colors[r * cols + c];
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${a.toFixed(2)})`;
          ctx.fillText(TEXT[(r * cols + c + offset) % TEXT.length], c * CELL_W, r * CELL_H);
        }
      }
    };

    const tick = () => {
      offset = (offset + 1) % TEXT.length;
      draw();
    };
    const start = () => {
      if (!reduced && !timer && visible) timer = setInterval(tick, STEP_MS);
    };
    const stop = () => {
      clearInterval(timer);
      timer = 0;
    };

    // Only animate while the window is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(box);

    let resizeFrame = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => sample());
    });
    ro.observe(box);

    (document.fonts?.ready || Promise.resolve()).then(() => !cancelled && sample()).then(start);

    return () => {
      cancelled = true;
      stop();
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(resizeFrame);
    };
  }, [label]);

  return (
    <div className="city-window city-window--ascii" ref={wrap} aria-hidden="true">
      <CityScene ref={scene} label={label} className="city-window__source" />
      <canvas ref={canvas} className="city-window__ascii" />
      <div className="city-window__frame" />
    </div>
  );
}
