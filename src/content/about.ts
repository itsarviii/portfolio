export interface Fact {
  label: string;
  value: string;
}

export interface About {
  bio: string;
  manifesto: string[];
  facts: Fact[];
}

export const about: About = {
  bio: "Grew up across three countries — India, Italy, and the UK. Got into computers through games, stayed for everything else.",
  manifesto: [
    "I figure things out by getting into them.",
    "Curiosity got me here. It still drives everything I build.",
    "I care about the whole product, not just my part of it.",
    "Shipped is better than perfect — but I don't use that as an excuse.",
    "Three languages. Three countries. Adapting is just how I work.",
  ],
  facts: [
    { label: "Based in", value: "London, UK" },
    { label: "Available", value: "Open to roles" },
  ],
};
