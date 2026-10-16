export const SITE = {
  name: "AXN Labs",
  title: "AXN Labs - Estudio creativo y digital",
  description: "Diseñamos lo que viene. Estudio creativo independiente.",
  email: "hola@orbita.studio",
  location: "Estudio independiente · Santiago, Chile",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nec-web.vercel.app",
} as const;

export const HERO_IMAGES = [
  "/images/astronauta-orbita.webp",
  "/images/astronauta-orbita-2.webp",
  "/images/astronauta-orbita-3.webp",
] as const;

export const TEAM_IMAGE = "/images/equipo-orbita.webp";

export const CAROUSEL_INTERVAL_MS = 2400;
