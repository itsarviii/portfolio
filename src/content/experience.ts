export interface ExperienceEntry {
  kind: "work" | "education";
  role: string;
  org: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  url: string;
}

export const experience: ExperienceEntry[] = [
  {
    kind: "education",
    role: "BEng Computer Science (Hons)",
    org: "Anglia Ruskin University",
    location: "Cambridge, UK",
    start: "2023-09",
    end: "2026-05",
    bullets: [
      "Studied algorithms, data structures, and distributed systems — consistently applying theory through software engineering coursework and projects.",
      "Built and shipped full-stack applications from scratch, covering API design, database modelling, and frontend delivery.",
    ],
    url: "https://www.aru.ac.uk",
  },
  {
    kind: "work",
    role: "Full-Stack Developer",
    org: "S.A.E.T. Srl",
    location: "Piedmont, Italy",
    start: "2022-08",
    end: "2023-07",
    bullets: [
      "Took full ownership of multiple client-facing web applications — from architecture decisions and API design through to production deployment.",
      "Partnered with stakeholders to scope and ship features on tight timelines, turning business requirements into working software every time.",
    ],
    url: "https://www.saetsrl.com",
  },
  {
    kind: "education",
    role: "Diploma in Computer Science",
    org: "IIS Denina Pellico Rivoira",
    location: "Piedmont, Italy",
    start: "2017-09",
    end: "2022-07",
    bullets: [],
    url: "https://www.denina.it/",
  },
];
