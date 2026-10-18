import { isContactDetailVisible, SITE, SOCIAL_LINKS } from "@/lib/constants";

export function ContactInfo() {
  const visibleSocial = SOCIAL_LINKS.filter((link) => isContactDetailVisible(link.url));
  const city = "Santiago, Chile";

  return (
    <aside className="contact-info" aria-label="Datos de contacto">
      {isContactDetailVisible(SITE.email) ? (
        <p className="contact-info-email">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      ) : null}
      <p className="contact-info-meta">Respondemos en 24–48 h hábiles</p>
      <p className="contact-info-location">{city}</p>
      {visibleSocial.length > 0 ? (
        <ul className="contact-info-social">
          {visibleSocial.map((link) => (
            <li key={link.label}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}
