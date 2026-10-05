import { SITE } from "@/lib/constants";

export function ContactPanel() {
  return (
    <section className="contacto-area" aria-label="Información de contacto">
      <a href={`mailto:${SITE.email}`} className="contacto-email">
        {SITE.email}
      </a>
      <p className="contacto-meta">{SITE.location}</p>
      <a href={`mailto:${SITE.email}`} className="contacto-cta">
        Escríbenos <span>↗</span>
      </a>
    </section>
  );
}
