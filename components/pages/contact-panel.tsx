import { SITE } from "@/lib/constants";

export function ContactPanel() {
  return (
    <section className="contacto-area" aria-label="Información de contacto">
      <a
        href={`mailto:${SITE.email}`}
        className="contacto-email"
        target="_blank"
        rel="noopener noreferrer"
      >
        {SITE.email}
      </a>
      <p className="contacto-meta">{SITE.location}</p>
      <a
        href={`mailto:${SITE.email}`}
        className="contacto-cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        Escríbenos <span>↗</span>
      </a>
    </section>
  );
}
