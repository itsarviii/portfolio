<div align="center">
  <h1>Portfolio</h1>
  <p>My corner of the web — built exactly how I wanted it.</p>

  <p>
    <a href="https://itsarviii.vercel.app"><strong>itsarviii.vercel.app</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/GSAP-animation-88ce02?logo=greensock&logoColor=white" alt="GSAP" />
    <img src="https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel" alt="Vercel" />
  </p>
</div>

---

## Sections

- **Hero** — GSAP entrance animation, magnetic CTA buttons, and animated name reveal
- **Featured Projects** — Sticky split layout with live browser mockup previews powered by Microlink
- **About** — Numbered manifesto with an animated emoji cursor follower
- **Skills** — Grouped technology grid with spring hover animations
- **Experience** — GSAP horizontal scroll with panel dimming on desktop, vertical stack on mobile
- **Contact** — Word-by-word heading reveal, dot-grid background, and mailto link

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion + GSAP |
| Scroll | Lenis |
| Fonts | Inter · Instrument Serif · Geist Mono |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/               # Next.js App Router (layout, page, globals.css)
├── components/
│   ├── layout/        # Navbar, Footer, SmoothScroll, ThemeProvider
│   ├── sections/      # Hero, FeaturedProjects, About, Skills, Experience, Contact
│   └── ui/            # Button, Chip, Reveal, MagneticButton, BrowserMockup, CustomCursor
├── content/           # Data files (site, projects, about, skills, experience)
├── hooks/             # usePointerFine
└── lib/               # GSAP setup, utils
```
