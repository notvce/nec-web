export const SITE = {
  name: "AXN Labs",
  title: "AXN Labs - Estudio creativo y digital",
  description: "Diseñamos lo que viene. Estudio creativo independiente.",
  email: "PENDIENTE",
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

export const EDGE_LABEL = "ESTUDIO CREATIVO";

export const TEAM_MEMBERS = [
  { slice: 0 as const, name: "PENDIENTE", role: "PENDIENTE" },
  { slice: 1 as const, name: "PENDIENTE", role: "PENDIENTE" },
  { slice: 2 as const, name: "PENDIENTE", role: "PENDIENTE" },
] as const;

export const ESTUDIO_SERVICES = [
  "Estrategia de marca",
  "Identidad visual",
  "Diseño de producto digital",
  "Experiencia de usuario",
  "Desarrollo web",
  "Consultoría creativa",
] as const;

export const FUTUROS_ITEMS = [
  {
    index: "01",
    title: "Investigación de Tendencias",
    description:
      "Analizamos señales culturales, tecnológicas y sociales para identificar oportunidades antes de que se conviertan en mainstream.",
  },
  {
    index: "02",
    title: "Prototipado de Conceptos",
    description:
      "Materializamos ideas en prototipos tangibles que permiten explorar, testear y validar nuevas direcciones creativas.",
  },
  {
    index: "03",
    title: "Diseño Especulativo",
    description:
      "Creamos escenarios ficticios pero plausibles que desafían suposiciones y abren conversaciones sobre futuros posibles.",
  },
] as const;

export const IMAGINAMOS_STEPS = [
  {
    index: "01",
    title: "Descubrir",
    description:
      "Investigamos a fondo tu marca, audiencia y contexto para identificar oportunidades únicas y desafíos a resolver.",
  },
  {
    index: "02",
    title: "Idear",
    description:
      "Generamos múltiples conceptos creativos, explorando direcciones diversas antes de converger en la mejor solución.",
  },
  {
    index: "03",
    title: "Diseñar",
    description:
      "Refinamos cada detalle visual y funcional, asegurando coherencia, usabilidad y excelencia en la ejecución.",
  },
  {
    index: "04",
    title: "Implementar",
    description:
      "Llevamos el diseño a la realidad con desarrollo de calidad, asegurando que la visión se materialice fielmente.",
  },
] as const;

export const ESTUDIO_VALUES = [
  {
    index: "01",
    title: "Creatividad",
    description: "Exploramos ideas sin límites, buscando soluciones innovadoras para cada desafío.",
  },
  {
    index: "02",
    title: "Excelencia",
    description: "Cada detalle cuenta. Nos comprometemos con la calidad en todo lo que hacemos.",
  },
  {
    index: "03",
    title: "Colaboración",
    description: "Trabajamos mano a mano con nuestros clientes, construyendo juntos el camino hacia el éxito.",
  },
] as const;

export const PROJECT_CASES = [
  {
    slug: "caso-1",
    title: "PENDIENTE",
    client: "PENDIENTE",
    year: "PENDIENTE",
    discipline: "PENDIENTE",
    image: HERO_IMAGES[0],
    layout: "full" as const,
  },
  {
    slug: "caso-2",
    title: "PENDIENTE",
    client: "PENDIENTE",
    year: "PENDIENTE",
    discipline: "PENDIENTE",
    image: HERO_IMAGES[1],
    layout: "split" as const,
  },
  {
    slug: "caso-3",
    title: "PENDIENTE",
    client: "PENDIENTE",
    year: "PENDIENTE",
    discipline: "PENDIENTE",
    image: HERO_IMAGES[2],
    layout: "full" as const,
  },
] as const;

export const PAGE_CLOSING_PHRASES = {
  estudio: "Diseñamos con criterio.",
  futuros: "Anticipamos lo que sigue.",
  imaginamos: "Las ideas piden forma.",
  proyectos: "Cada trabajo deja huella.",
} as const;

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
  "Menos de $2.000.000 CLP",
  "$2.000.000 – $5.000.000 CLP",
  "$5.000.000 – $10.000.000 CLP",
  "$10.000.000 – $25.000.000 CLP",
  "Más de $25.000.000 CLP",
  "Por definir",
] as const;

export const CONTACT_LIMITS = {
  name: 120,
  company: 120,
  email: 200,
  message: 5000,
} as const;

export function isContactDetailVisible(value: string): boolean {
  return value.trim().length > 0 && value !== "PENDIENTE";
}
