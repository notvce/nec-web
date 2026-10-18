import Link from "next/link";

import { TeamAvatar } from "@/components/home/team-avatar";
import { isContactDetailVisible, SITE, SOCIAL_LINKS } from "@/lib/constants";

const PAGE_FOOTER_NAV = [
  { href: "/", label: "Inicio" },
  { href: "/estudio", label: "Estudio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/imaginamos", label: "Imaginamos" },
  { href: "/futuros", label: "Futuros" },
  { href: "/contacto", label: "Contacto" },
] as const;

type SiteFooterProps = {
  variant?: "home" | "page";
};

export function SiteFooter({ variant = "home" }: SiteFooterProps) {
  if (variant === "page") {
    const visibleSocial = SOCIAL_LINKS.filter((link) => isContactDetailVisible(link.url));

    return (
      <footer className="site-footer site-footer--page">
        <div className="site-footer-page-inner">
          <div className="site-footer-grid">
            <div className="site-footer-col site-footer-brand">
              <p className="site-footer-tagline">
                Diseñamos el futuro,
                <br />
                <span>hoy.</span>
              </p>
            </div>
            <nav className="site-footer-col" aria-label="Navegación del sitio">
              <p className="site-footer-col-label meta-mono">Navegación</p>
              <ul className="site-footer-links">
                {PAGE_FOOTER_NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="site-footer-col">
              <p className="site-footer-col-label meta-mono">Contacto</p>
              {isContactDetailVisible(SITE.email) ? (
                <a href={`mailto:${SITE.email}`} className="site-footer-email">
                  {SITE.email}
                </a>
              ) : (
                <Link href="/contacto" className="site-footer-email">Hablemos</Link>
              )}
              {visibleSocial.length > 0 ? (
                <ul className="site-footer-social">
                  {visibleSocial.map((link) => (
                    <li key={link.label}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="site-footer-col site-footer-legal">
              <p className="site-footer-col-label meta-mono">Legal</p>
            </div>
          </div>
          <div className="site-footer-bottom">
            <p className="site-footer-copy">© 2026 AXN Labs</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer" id="estudio">
      <div className="team-note" data-reveal>
        <div className="avatar-stack">
          <TeamAvatar slice={0} />
          <TeamAvatar slice={1} />
          <TeamAvatar slice={2} />
        </div>
        <p>
          Diseñamos el futuro,
          <br />
          <span>hoy.</span>
        </p>
      </div>
      {isContactDetailVisible(SITE.email) ? (
        <a href={`mailto:${SITE.email}`} className="email-link" data-reveal>
          {SITE.email}
        </a>
      ) : (
        <Link href="/contacto" className="email-link" data-reveal>
          Hablemos
        </Link>
      )}
    </footer>
  );
}
