import { isContactDetailVisible, SITE } from "@/lib/constants";

export function ContactPanel() {
  const showEmail = isContactDetailVisible(SITE.email);

  return (
    <section className="contacto-area" aria-label="Información de contacto">
      {showEmail ? (
        <a
          href={`mailto:${SITE.email}`}
          className="contacto-email"
          target="_blank"
          rel="noopener noreferrer"
        >
          {SITE.email}
        </a>
      ) : null}
      <p className="contacto-meta">{SITE.location}</p>
      {showEmail ? (
        <a
          href={`mailto:${SITE.email}`}
          className="contacto-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Escríbenos <span>↗</span>
        </a>
      ) : null}
    </section>
  );
}
