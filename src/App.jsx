import React, { useEffect, useState } from "react";
import Hero, { Barcode } from "./components/Hero";
import Logo from "./components/Logo";
import Skyline from "./components/Skyline";
import AsciiCityWindow from "./components/AsciiCityWindow";
import NightCity from "./components/NightCity";
import useReveal from "./components/useReveal";
import useParallax from "./components/useParallax";
import {
  profile,
  education,
  leadership,
  work,
  volunteering,
  skills,
  activities,
  availability,
} from "./data/resume";

const NAV = [
  ["about", "01", "About"],
  ["leadership", "02", "Leadership"],
  ["volunteering", "03", "Volunteering"],
  ["skills", "04", "Skills"],
  ["contact", "05", "Contact"],
];

// Each skyline's last (nearest) layer matches the next section's top color.
const LIT = ["#ffd36b", "#ffd36b", "#ffe9a8", "#ff9ec4"];
const MIDDAY_SKYLINE = [
  { color: "#f2cdb6", minH: 120, maxH: 240, minW: 40, maxW: 80, gap: 6, speed: 0.12, shapes: ["spire", "dome", "taper", "flat"] },
  { color: "#ecbca2", minH: 70, maxH: 170, minW: 70, maxW: 130, gap: 10, speed: 0.06 },
  { color: "#e8ab8c", minH: 30, maxH: 90, minW: 90, maxW: 170, gap: 2, speed: 0 },
];
const GOLDEN_SKYLINE = [
  { color: "#d9707a", minH: 140, maxH: 260, minW: 40, maxW: 80, gap: 5, speed: 0.12, litChance: 0.04, colors: LIT },
  { color: "#b4527f", minH: 80, maxH: 190, minW: 70, maxW: 130, gap: 8, speed: 0.06, litChance: 0.08, colors: LIT },
  { color: "#8a3e86", minH: 30, maxH: 100, minW: 90, maxW: 170, gap: 2, speed: 0, litChance: 0.12, colors: LIT },
];
const DUSK_SKYLINE = [
  { color: "#3a2268", minH: 160, maxH: 300, minW: 40, maxW: 80, gap: 4, speed: 0.12, litChance: 0.08, colors: LIT },
  { color: "#28184f", minH: 90, maxH: 210, minW: 70, maxW: 130, gap: 6, speed: 0.06, litChance: 0.16, colors: LIT },
  { color: "#1a1240", minH: 30, maxH: 110, minW: 90, maxW: 170, gap: 2, speed: 0, litChance: 0.2, colors: LIT },
];

function MinneapolisClock() {
  const format = () =>
    new Date().toLocaleTimeString("en-US", { timeZone: "America/Chicago", hour: "2-digit", minute: "2-digit" });
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="hud__clock">MPLS {time}</span>;
}

// Nav flips to its dark style once a dark section is behind it.
function useNavTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const el = document.elementFromPoint(window.innerWidth / 2, 70);
      const scene = el && el.closest("[data-tone]");
      setDark(scene ? scene.dataset.tone === "dark" : false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return dark;
}

function Heading({ num, kana, variant, children }) {
  return (
    <div className={`heading heading--${variant}`} data-reveal>
      <span className="heading__num">{num}</span>
      <h2>{children}</h2>
      <span className="heading__kana" lang="ja" aria-hidden="true">
        {kana}
      </span>
    </div>
  );
}

export default function App() {
  useReveal();
  useParallax();
  const darkNav = useNavTheme();

  return (
    <>
      <nav className={`hud ${darkNav ? "hud--dark" : ""}`}>
        <a className="hud__logo" href="#top" aria-label="Bassirou Diop, back to top">
          <Logo size={26} />
        </a>
        <ul>
          {NAV.map(([id, num, label]) => (
            <li key={id}>
              <a href={`#${id}`}>
                <span>{num}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <MinneapolisClock />
      </nav>

      <Hero />

      {/* ---------- Midday: glossy aero glass ---------- */}
      <section id="about" className="scene scene--midday" data-tone="light">
        <div className="bubbles" aria-hidden="true">
          {[...Array(9)].map((_, i) => (
            <i key={i} data-speed={(0.1 + (i % 4) * 0.08).toFixed(2)} data-parallax="down" />
          ))}
        </div>
        <div className="scene__inner">
          <Heading num="01" kana="プロフィール" variant="aero">
            About
          </Heading>
          <div className="aero" data-reveal>
            <div className="aero__bar">
              <span className="aero__dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>profile.exe</span>
            </div>
            <div className="aero__body">
              <p className="aero__lead">{profile.objective}</p>
              <dl className="aero__stats">
                <div>
                  <dt>School</dt>
                  <dd>{education.school}</dd>
                </div>
                <div>
                  <dt>Grade</dt>
                  <dd className="big">
                    12<small>th</small>
                  </dd>
                </div>
                <div>
                  <dt>Class of</dt>
                  <dd className="big">{education.graduation}</dd>
                </div>
                <div className="wide">
                  <dt>Program</dt>
                  <dd>{education.program}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <Skyline layers={MIDDAY_SKYLINE} seed={21} height={240} />
      </section>

      {/* ---------- Golden hour: manga issues + work badges ---------- */}
      <section id="leadership" className="scene scene--golden" data-tone="light">
        <div className="golden-sun" aria-hidden="true" data-speed="0.25" data-parallax="down" />
        <div className="scene__inner">
          <Heading num="02" kana="リーダー" variant="manga">
            Leadership
          </Heading>
          <div className="issues">
            {leadership.map((job, i) => (
              <article key={job.role + job.org} className={`issue issue--${i % 4}`} data-reveal data-delay={i * 90}>
                <header className="issue__band">
                  <span className="issue__org">{job.org}</span>
                  <span className="issue__no">#{String(leadership.length - i).padStart(2, "0")}</span>
                </header>
                <div className="issue__body">
                  <p className="issue__date">{job.date}</p>
                  <h3>{job.role}</h3>
                  <ul>
                    {job.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <footer className="issue__foot">
                  <span>Club</span>
                  <Barcode code={String(612 + i * 137)} />
                </footer>
              </article>
            ))}
          </div>

          <div id="work" className="work">
            <Heading num="02.5" kana="仕事" variant="manga">
              Work
            </Heading>
            <div className="badges">
              {work.map((job, i) => (
                <article key={job.org} className={`badge badge--${i}`} data-reveal data-delay={i * 140}>
                  <span className="badge__clip" aria-hidden="true" />
                  <div className="badge__head">
                    <span>Staff ID</span>
                    <b>{job.org}</b>
                  </div>
                  <div className="badge__body">
                    <div className="badge__photo" aria-hidden="true">
                      BD
                    </div>
                    <div>
                      <h3>{job.role}</h3>
                      <p className="badge__date">{job.date}</p>
                    </div>
                  </div>
                  <ul className="badge__points">
                    {job.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <Barcode code={`${927 + i * 311}06124859273`} stretch />
                </article>
              ))}
            </div>
          </div>
        </div>
        <Skyline layers={GOLDEN_SKYLINE} seed={31} height={260} />
      </section>

      {/* ---------- Dusk: city-pop apartment + minidiscs ---------- */}
      <section id="volunteering" className="scene scene--dusk" data-tone="dark">
        <div className="scene__inner">
          <Heading num="03" kana="ボランティア" variant="vapor">
            Volunteering
          </Heading>
          <div className="dusk-room">
            <div className="dusk-room__window" data-reveal>
              <AsciiCityWindow label={profile.cityKana} />
            </div>
            <div className="discs">
              {volunteering.map((v, i) => (
                <article key={v.org} className={`disc disc--${i}`} data-reveal data-delay={i * 120}>
                  <div className="disc__case">
                    {/* full-face printed disc, like a game disc; it spins under a glare that stays put */}
                    <div className="disc__media" style={{ "--disc-bg": v.discBg, "--disc-ink": v.discInk }}>
                      <div className="disc__art">
                        <img className="disc__logo" src={v.logo} alt={`${v.org} logo`} loading="lazy" />
                        <span className="disc__meta">Disc {i + 1}</span>
                      </div>
                      <span className="disc__hub" aria-hidden="true" />
                    </div>
                    <div className="disc__glare" aria-hidden="true" />
                  </div>
                  <div className="disc__text">
                    <small>{v.date}</small>
                    <h3>{v.org}</h3>
                    <p>{v.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
        <Skyline layers={DUSK_SKYLINE} seed={41} height={280} />
      </section>

      {/* ---------- Night: cyberpunk HUD ---------- */}
      <section id="skills" className="scene scene--night" data-tone="dark">
        <NightCity />
        <div className="scene__inner">
          <Heading num="04" kana="スキル" variant="hud">
            Skills
          </Heading>
          <div className="hud-panel" data-reveal>
            <div className="hud-panel__col">
              <p className="hud-panel__title">// Skills loaded</p>
              {skills.map(({ group, items }) => (
                <div key={group} className="readout-group">
                  <p className="readout-group__name">{group}</p>
                  <ul className="readout">
                    {items.map((s) => (
                      <li key={s}>
                        <span>{s}</span>
                        <b>OK</b>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="hud-panel__col">
              <p className="hud-panel__title">// Outside of class</p>
              <ul className="tags">
                {activities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <p className="hud-panel__title hud-panel__title--gap">// Available</p>
              <ul className="tags tags--gold">
                {availability.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Midnight: neon sign in the rain ---------- */}
      <section id="contact" className="scene scene--midnight" data-tone="dark">
        <div className="rain" aria-hidden="true" />
        <div className="scene__inner contact">
          <p className="neon" data-reveal>
            <span lang="ja" aria-hidden="true">
              コンタクト
            </span>
            Let's work together
          </p>
          <div className="contact__links" data-reveal data-delay="150">
            <a className="btn btn--red" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="btn btn--paper" href={`tel:+1${profile.phone.replace(/-/g, "")}`}>
              {profile.phone}
            </a>
            <a className="btn btn--ink" href="/bassirou_diop_resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume ↓
            </a>
          </div>
          <p className="contact__note">References available on request.</p>
        </div>
        <footer className="footer">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span lang="ja">ミネアポリス</span>
          <a className="secret-art" href="#/art" aria-label="Secret: my art" title="?">
            <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
              <path
                className="secret-art__palette"
                d="M15 4C8 4 3 9 3 15.5S8 27 14 27c2 0 2.6-1.4 2-2.8-.7-1.6.2-3.2 2-3.2h3.4c3.6 0 6.6-2.6 6.6-6.4C28 8.6 22.5 4 15 4z"
              />
              <circle cx="9" cy="13" r="1.9" fill="#ff4f9a" />
              <circle cx="13" cy="8.6" r="1.9" fill="#ffd36b" />
              <circle cx="19" cy="8.4" r="1.9" fill="#2ee6ff" />
              <circle cx="23.2" cy="12.4" r="1.9" fill="#9ee07a" />
              <path className="secret-art__brush" d="M30 17.5l-9.6 9.6" />
              <path d="M20.6 26.6c-1.4-.2-2.8.6-3.2 2.2-.2.8-.9 1.2-1.6 1.2 2.6 1 5.6.4 6.2-1.6z" fill="#ff2a4f" />
            </svg>
          </a>
        </footer>
      </section>
    </>
  );
}
