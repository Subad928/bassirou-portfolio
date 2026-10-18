import React, { useEffect } from "react";
import Aero from "./scenes/Aero";
import Pond from "./scenes/Pond";
import Moss from "./scenes/Moss";
import Deep from "./scenes/Deep";
import useParallax from "../components/useParallax";
import Logo from "../components/Logo";
import { webDesign, drawings, threeD } from "../data/art";
import { profile } from "../data/resume";
import "./art.css";

const SECTIONS = [
  ["art-web", "Web Design"],
  ["art-drawings", "Drawings"],
  ["art-3d", "3D Art"],
];

// Empty categories show a few frames so the layout still reads.
const withPlaceholders = (items, n = 3) => (items.length ? items : [...Array(n)].map(() => null));

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionHead({ num, kana, title, blurb }) {
  return (
    <div className="art-head">
      <span className="lg lg--pill art-head__num">{num}</span>
      <h2>{title}</h2>
      <span className="art-head__kana" lang="ja" aria-hidden="true">
        {kana}
      </span>
      <p className="art-head__blurb">{blurb}</p>
    </div>
  );
}

function WebCard({ item }) {
  return (
    <article className="lg art-web" data-reveal-art>
      <div className="art-web__bar">
        <span className="art-web__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="lg lg--pill art-web__addr">{item.title}</span>
      </div>
      <div className="art-web__preview">
        {item.image ? (
          <img src={item.image} alt={`Screenshot of the ${item.title} website`} loading="lazy" />
        ) : (
          <div className="art-web__mock" aria-hidden="true">
            <i className="hero" />
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
      <div className="art-web__body">
        <p className="art-meta">{item.year}</p>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
        <ul className="art-tags">
          {item.tags.map((t) => (
            <li key={t} className="lg lg--pill">
              {t}
            </li>
          ))}
        </ul>
        {item.link && (
          <a
            className="lg lg--pill art-link"
            href={item.link}
            {...(item.link.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            Visit {item.link.startsWith("http") ? "site ↗" : "→"}
          </a>
        )}
      </div>
    </article>
  );
}

function DrawingFrame({ item, i }) {
  const shapes = ["tall", "square", "wide"];
  return (
    <figure className={`lg art-drawing art-drawing--${shapes[i % 3]}`} data-reveal-art>
      <span className="art-dew" aria-hidden="true" />
      <div className="art-drawing__paper">
        {item ? (
          <img src={item.image} alt={item.title} loading="lazy" />
        ) : (
          <div className="art-empty">
            <PencilIcon />
            <span>Drawing coming soon</span>
          </div>
        )}
      </div>
      <figcaption>
        <b>{item ? item.title : "Untitled"}</b>
        <span>{item ? [item.medium, item.year].filter(Boolean).join(" · ") : "Pencil · ink · paint"}</span>
      </figcaption>
    </figure>
  );
}

function ModelPlinth({ item }) {
  return (
    <figure className="lg art-model" data-reveal-art>
      <div className="art-model__stage">
        {item ? (
          <img src={item.image} alt={item.title} loading="lazy" />
        ) : (
          <div className="art-cube" aria-hidden="true">
            {["front", "back", "left", "right", "top", "bottom"].map((f) => (
              <i key={f} className={`art-cube__${f}`} />
            ))}
          </div>
        )}
        <span className="art-model__shadow" aria-hidden="true" />
      </div>
      <figcaption>
        <b>{item ? item.title : "Model coming soon"}</b>
        <span>{item ? [item.tool, item.year].filter(Boolean).join(" · ") : "Renders & sculpts"}</span>
      </figcaption>
    </figure>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 20l1.2-4.6L16.6 4a2 2 0 0 1 2.8 0l.6.6a2 2 0 0 1 0 2.8L8.6 18.8z" />
      <path d="M14.5 6l3.5 3.5M4 20l4.6-1.2" />
    </svg>
  );
}

export default function ArtPage() {
  useParallax();

  // Fade cards in as they surface.
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal-art]");
    if (!("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    items.forEach((el) => {
      el.classList.add("will-reveal");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Specular highlight follows the pointer across whichever glass panel it's over.
  const onPointerMove = (e) => {
    const el = e.target.closest(".lg");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  return (
    <div className="art" onPointerMove={onPointerMove}>
      <nav className="art-nav">
        <a className="lg lg--pill art-nav__back" href="#top">
          <Logo size={18} /> ← Back to the city
        </a>
        <ul className="lg lg--pill art-nav__links">
          {SECTIONS.map(([id, label]) => (
            <li key={id}>
              <button type="button" onClick={() => scrollToId(id)}>
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---------- Intro: green Frutiger Aero ---------- */}
      <header className="art-sec art-sec--aero art-hero">
        <Aero />

        <div className="lg art-hero__card">
          <p className="art-kicker">
            <span lang="ja">ようこそ</span> · Welcome to the studio
          </p>
          <h1>
            Art by <em>{profile.name.split(" ")[0]}</em>
          </h1>
          <p className="art-hero__text">
            You found the secret page. This is where I keep my creative work: the websites I design, my drawings, and my
            3D art.
          </p>
          <div className="art-hero__chips">
            {SECTIONS.map(([id, label], i) => (
              <button key={id} type="button" className="lg lg--pill art-chip" onClick={() => scrollToId(id)}>
                <small>0{i + 1}</small> {label}
              </button>
            ))}
          </div>
        </div>
        <p className="art-scroll" aria-hidden="true">
          dive in ↓
        </p>
      </header>

      {/* ---------- Web Design: the koi pond surface ---------- */}
      <section id="art-web" className="art-sec art-sec--pond">
        <Pond />
        <div className="art-inner">
          <SectionHead
            num="01"
            kana="ウェブデザイン"
            title="Web Design"
            blurb="Sites I've designed and built, from club pages to this portfolio."
          />
          <div className="art-web-grid">
            {webDesign.map((item) => (
              <WebCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Drawings: moss hills and clover ---------- */}
      <section id="art-drawings" className="art-sec art-sec--moss">
        <Moss />
        <div className="art-inner">
          <SectionHead num="02" kana="苔と絵" title="Drawings" blurb="Sketchbook pages, studies and finished pieces." />
          <div className="art-drawing-grid">
            {withPlaceholders(drawings, 5).map((item, i) => (
              <DrawingFrame key={item ? item.title : i} item={item} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 3D Art: the deep water ---------- */}
      <section id="art-3d" className="art-sec art-sec--deep">
        <Deep />
        <div className="art-inner">
          <SectionHead num="03" kana="3Dアート" title="3D Art" blurb="Models, scenes and renders." />
          <div className="art-model-grid">
            {withPlaceholders(threeD).map((item, i) => (
              <ModelPlinth key={item ? item.title : i} item={item} />
            ))}
          </div>
        </div>
        <footer className="art-footer">
          <Logo size={34} className="art-footer__logo" />
          <a className="lg lg--pill" href="#top">
            ↑ Back to the city
          </a>
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
        </footer>
      </section>
    </div>
  );
}
