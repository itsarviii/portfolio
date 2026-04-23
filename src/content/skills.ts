export interface SkillGroup {
  group: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  { group: "Core", items: ["TypeScript", "Python"] },
  { group: "Frontend", items: ["Next.js", "Tailwind CSS"] },
  { group: "Backend & Data", items: ["Express.js", "PostgreSQL", "Prisma"] },
  { group: "Tooling", items: ["GitHub", "Docker"] },
];
