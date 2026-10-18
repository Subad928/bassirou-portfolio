# Bassirou Diop — Portfolio

My personal portfolio: a retro-future city that turns from a pastel morning to a rainy neon midnight as you scroll, built with React and Vite.

- **Main site:** a manga-style poster hero, comic-book leadership cards, staff-ID work badges, an ASCII city made of the letters `BASSIROUDIOP`, spinning game-disc volunteering cards, a cyberpunk skills HUD and a neon contact sign. Layered SVG skylines melt each section into the next.
- **Secret art page:** click the palette icon in the bottom-right corner of the footer (or go to `#/art`). It's a calmer, nature-themed page with liquid-glass panels for my web design, drawings and 3D art.

## Run it locally

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

To make a production build in `dist/`:

```bash
npm run build
```

## Where things live

| What | File |
| --- | --- |
| Resume content (roles, skills, volunteering) | `src/data/resume.js` |
| Art page content (web design, drawings, 3D) | `src/data/art.js` |
| Images for the art page and disc logos | `public/art/` |
| Downloadable resume | `public/bassirou_diop_resume.pdf` |
| Main site layout | `src/App.jsx`, `src/styles/App.css` |
| Art page | `src/art/` |

To add a drawing or 3D piece, put the image in `public/art/` and add an entry in `src/data/art.js`.

## Credits

Volunteering logos belong to their organizations (Feed My Starving Children, Anthony Middle School, Al-Maa'uun) and are used only to show where I've volunteered.
