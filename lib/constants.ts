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

export type OfferingItem = {
  index: string;
  title: string;
  description: string;
  deliverables: readonly string[];
};

export const ESTUDIO_SERVICES: readonly OfferingItem[] = [
  {
    index: "01",
    title: "Estrategia de marca",
    description:
      "Definimos posicionamiento, narrativa y criterio para que cada decisión creativa tenga dirección.",
    deliverables: ["PENDIENTE"],
  },
  {
    index: "02",
    title: "Identidad visual",
    description: "Sistemas visuales coherentes que funcionan en todos los puntos de contacto.",
    deliverables: ["PENDIENTE"],
  },
  {
    index: "03",
    title: "Diseño de producto digital",
    description: "Interfaces y flujos pensados para claridad, rendimiento y evolución.",
    deliverables: ["PENDIENTE"],
  },
  {
    index: "04",
    title: "Experiencia de usuario",
    description: "Investigación y diseño centrado en personas, con foco en lo esencial.",
    deliverables: ["PENDIENTE"],
  },
  {
    index: "05",
    title: "Desarrollo web",
    description: "Implementación cuidada, accesible y lista para escalar.",
    deliverables: ["PENDIENTE"],
  },
  {
    index: "06",
    title: "Consultoría creativa",
    description: "Acompañamiento estratégico para equipos que quieren elevar su propuesta.",
    deliverables: ["PENDIENTE"],
  },
];

export const FUTUROS_ITEMS: readonly OfferingItem[] = [
  {
    index: "01",
    title: "Investigación de Tendencias",
    description:
      "Analizamos señales culturales, tecnológicas y sociales para identificar oportunidades antes de que se conviertan en mainstream.",
    deliverables: ["PENDIENTE"],
  },
  {
    index: "02",
    title: "Prototipado de Conceptos",
    description:
      "Materializamos ideas en prototipos tangibles que permiten explorar, testear y validar nuevas direcciones creativas.",
    deliverables: ["PENDIENTE"],
  },
  {
    index: "03",
    title: "Diseño Especulativo",
    description:
      "Creamos escenarios ficticios pero plausibles que desafían suposiciones y abren conversaciones sobre futuros posibles.",
    deliverables: ["PENDIENTE"],
  },
];

export const IMAGINAMOS_STEPS: readonly OfferingItem[] = [
  {
    index: "01",
    title: "Descubrir",
    description:
      "Investigamos a fondo tu marca, audiencia y contexto para identificar oportunidades únicas y desafíos a resolver.",
    deliverables: ["PENDIENTE"],
  },
  {
    index: "02",
    title: "Idear",
    description:
      "Generamos múltiples conceptos creativos, explorando direcciones diversas antes de converger en la mejor solución.",
    deliverables: ["PENDIENTE"],
  },
  {
    index: "03",
    title: "Diseñar",
    description:
      "Refinamos cada detalle visual y funcional, asegurando coherencia, usabilidad y excelencia en la ejecución.",
    deliverables: ["PENDIENTE"],
  },
  {
    index: "04",
    title: "Implementar",
    description:
      "Llevamos el diseño a la realidad con desarrollo de calidad, asegurando que la visión se materialice fielmente.",
    deliverables: ["PENDIENTE"],
  },
];

export const ESTUDIO_VALUES: readonly OfferingItem[] = [
  {
    index: "01",
    title: "Creatividad",
    description: "Exploramos ideas sin límites, buscando soluciones innovadoras para cada desafío.",
    deliverables: ["PENDIENTE"],
  },
  {
    index: "02",
    title: "Excelencia",
    description: "Cada detalle cuenta. Nos comprometemos con la calidad en todo lo que hacemos.",
    deliverables: ["PENDIENTE"],
  },
  {
    index: "03",
    title: "Colaboración",
    description: "Trabajamos mano a mano con nuestros clientes, construyendo juntos el camino hacia el éxito.",
    deliverables: ["PENDIENTE"],
  },
];

export const PROJECT_CASES = [
  {
    slug: "caso-1",
    index: "01",
    title: "PENDIENTE",
    client: "PENDIENTE",
    year: "PENDIENTE",
    discipline: "Identidad",
    outcome: "PENDIENTE",
    image: HERO_IMAGES[0],
    layout: "full" as const,
  },
  {
    slug: "caso-2",
    index: "02",
    title: "PENDIENTE",
    client: "PENDIENTE",
    year: "PENDIENTE",
    discipline: "Web",
    outcome: "PENDIENTE",
    image: HERO_IMAGES[1],
    layout: "split" as const,
  },
  {
    slug: "caso-3",
    index: "03",
    title: "PENDIENTE",
    client: "PENDIENTE",
    year: "PENDIENTE",
    discipline: "Producto",
    outcome: "PENDIENTE",
    image: HERO_IMAGES[1],
    layout: "full" as const,
  },
] as const;

export const PAGE_CLOSING_PHRASES = {
  estudio: "Si buscas un equipo que piense contigo,",
  futuros: "Si quieres explorar lo que viene,",
  imaginamos: "Si tienes una idea que merece forma,",
  proyectos: "Si tu próximo proyecto pide criterio,",
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
