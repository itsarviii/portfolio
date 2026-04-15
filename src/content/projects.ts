export interface ProjectLinks {
  live?: string;
  repo?: string;
  caseStudy?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  stack: string[];
  image: string | null;
  previewBg: string;
  links: ProjectLinks;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "unisphere",
    title: "UniSphere",
    summary:
      "Campus social platform where university students follow societies, discover events, and get AI-personalised feeds powered by Gemini embeddings.",
    role: "Solo",
    year: "2026",
    stack: ["React 19", "Django 5", "PostgreSQL", "Gemini API", "Tailwind CSS", "Framer Motion"],
    image: null,
    previewBg: "#6366f1",
    links: {
      live: "https://unisphere-aru.vercel.app",
      repo: "https://github.com/itsarviii/unisphere",
    },
    featured: true,
  },
  {
    slug: "specmaster",
    title: "SpecMaster",
    summary:
      "Bartender learning companion with 200+ cocktail recipes, XP-based progression, interactive games, and 9 unlockable achievement badges.",
    role: "Solo",
    year: "2026",
    stack: ["Next.js 15", "TypeScript", "Supabase", "Tailwind CSS", "shadcn/ui"],
    image: null,
    previewBg: "#f59e0b",
    links: {
      live: "https://specmaster-app.vercel.app",
      repo: "https://github.com/itsarviii/specmaster",
    },
    featured: true,
  },
  {
    slug: "optima-resume",
    title: "Optima Resume",
    summary:
      "Privacy-first, fully client-side ATS resume builder — drag-and-drop sections, two templates, accent colour picker, and one-click PDF export. No account needed.",
    role: "Solo",
    year: "2025",
    stack: ["Next.js 15", "React 19", "Tailwind CSS", "Zustand", "dnd-kit"],
    image: null,
    previewBg: "#06b6d4",
    links: {
      live: "https://optima-resume.vercel.app",
      repo: "https://github.com/itsarviii/optima-resume",
    },
    featured: true,
  },
];
