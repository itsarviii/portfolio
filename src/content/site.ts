export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  ogImage: string;
}

export interface Site {
  name: string;
  nickname: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  resumeUrl: string;
  available: boolean;
  hero: {
    greeting: string;
    subtitle: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  socials: SocialLink[];
  nav: NavItem[];
  metadata: SiteMetadata;
}

export const site: Site = {
  name: "Arvind",
  nickname: "Arvii",
  role: "Full-stack Developer",
  tagline: "I like building things properly, not just making them work.",
  location: "London, UK",
  email: "arvind.pal.office@gmail.com",
  resumeUrl: "/resume.pdf",
  available: true,

  hero: {
    greeting: "Hi, I'm",
    subtitle: "I like building things properly, not just making them work.",
    primaryCta: { label: "Let's talk", href: "#contact" },
    secondaryCta: { label: "See my work", href: "#projects" },
  },

  socials: [
    {
      label: "GitHub",
      href: "https://github.com/itsarviii",
      icon: "Github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/dev-arvindpal/",
      icon: "Linkedin",
    },
  ],

  nav: [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],

  metadata: {
    title: "Arvind — Full-stack Developer",
    description: "Portfolio of Arvind, a full-stack developer based in London.",
    url: "TODO: https://yourdomain.com",
    ogImage: "/og.png",
  },
};
