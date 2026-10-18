import React, { useEffect } from "react";
import anime from "animejs";
import DayCity from "./DayCity";
import Skyline from "./Skyline";
import { profile, education, leadership, work } from "../data/resume";

export function Barcode({ code = "0612927", stretch = false }) {
  // Bar widths derived from the digits so each barcode looks a little different.
  const bars = code.split("").flatMap((d) => [1 + (d % 3), 1, 2 - (d % 2), 1]);
  let x = 0;
  return (
    <svg
      className="barcode"
      viewBox={`0 0 ${bars.reduce((a, b) => a + b, 0)} 20`}
      preserveAspectRatio={stretch ? "none" : undefined}
      aria-hidden="true"
    >
      {bars.map((w, i) => {
        const rect = i % 2 === 0 ? <rect key={i} x={x} y="0" width={w} height="20" /> : null;
        x += w;
        return rect;
      })}
    </svg>
  );
}

// Morning → midday: pale towers melting into the About section's sky blue.
const HERO_SKYLINE = [
  { color: "#d4e4f5", minH: 120, maxH: 230, minW: 40, maxW: 80, gap: 6, speed: 0.12, shapes: ["spire", "dome", "taper"] },
  { color: "#c6dbf1", minH: 70, maxH: 160, minW: 70, maxW: 130, gap: 10, speed: 0.06 },
  { color: "#b9d3ee", minH: 30, maxH: 90, minW: 90, maxW: 170, gap: 2, speed: 0, shapes: ["flat", "step", "dome"] },
];

export default function Hero() {
  useEffect(() => {
    const intro = anime
      .timeline({ easing: "easeOutExpo" })
      .add({ targets: ".poster", translateY: [60, 0], opacity: [0, 1], duration: 1100 })
      .add({ targets: ".status-card", opacity: [0, 1], duration: 1000 }, "-=850")
      .add({ targets: ".poster__kana span", translateY: [50, 0], opacity: [0, 1], delay: anime.stagger(60), duration: 700 }, "-=800");

    // If animation frames are throttled (background tab), never leave the hero invisible.
    const fallback = setTimeout(() => intro.seek(intro.duration), 3000);
    return () => clearTimeout(fallback);
  }, []);

  const current = [...work, ...leadership].filter((j) => j.date.includes("Now")).slice(0, 4);

  return (
    <header className="hero scene scene--morning" id="top" data-tone="light">
      <DayCity />

      <div className="hero__inner">
        <article className="poster">
          <h1 className="poster__kana" lang="ja" aria-label={profile.name}>
            {profile.nameKana.split("").map((ch, i) => (
              <span key={i}>{ch}</span>
            ))}
          </h1>
          <p className="poster__credit">
            <span>{profile.name}</span>
            <span>Vol.01 / {profile.location}</span>
          </p>

          <div className="poster__art">
            <p className="poster__en">
              {profile.name.split(" ").map((w) => (
                <span key={w}>{w}</span>
              ))}
            </p>
            <p className="poster__intro">{profile.intro}</p>
            <div className="poster__cta">
              <a className="btn btn--paper" href="#contact">
                Get in touch
              </a>
              <a className="btn btn--ink" href="/bassirou_diop_resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume ↓
              </a>
            </div>
          </div>

          <footer className="poster__foot">
            <ul>
              {profile.tagline.slice(0, 4).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <Barcode />
          </footer>
        </article>

        <aside className="status-card" data-speed="-0.08">
          <div className="status-card__bar">
            <span className="status-card__dot" /> Currently
          </div>
          <p className="status-card__school">
            {education.grade} · {education.school}
          </p>
          <p className="status-card__year">
            Class of <b>{education.graduation}</b>
          </p>
          <ul>
            {current.map((j) => (
              <li key={j.role + j.org}>
                <b>{j.role}</b>
                <span>{j.org}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <Skyline layers={HERO_SKYLINE} seed={11} height={220} />
    </header>
  );
}
