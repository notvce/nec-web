export const SITE = {
  name: "AXN Labs",
  title: "AXN Labs - Estudio creativo y digital",
  description: "Diseñamos lo que viene. Estudio creativo independiente.",
  email: "hola@orbita.studio",
  location: "Estudio independiente · Santiago, Chile",
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://axntest.nuvak.dev";

export const HERO_IMAGES = [
  "/images/astronauta-orbita.webp",
  "/images/astronauta-orbita-2.webp",
  "/images/astronauta-orbita-3.webp",
] as const;

export const TEAM_IMAGE = "/images/equipo-orbita.webp";

export const CAROUSEL_INTERVAL_MS = 2400;

export const PROJECT_TYPES = [
  "Sitio web",
  "E-commerce",
  "Branding",
  "UX/UI",
  "App móvil",
  "Marketing digital",
  "Otro",
] as const;

export const BUDGET_RANGES = [
  "< $2,000 USD",
  "$2,000 - $5,000 USD",
  "$5,000 - $10,000 USD",
  "$10,000 - $25,000 USD",
  "> $25,000 USD",
  "Por definir",
] as const;

export const CONTACT_PHONE = "PENDIENTE";
export const CONTACT_ADDRESS = "Santiago, Chile";
