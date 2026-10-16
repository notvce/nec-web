import Link from "next/link";

import { TeamAvatar } from "@/components/home/team-avatar";
import { isContactDetailVisible, SITE } from "@/lib/constants";

export function SiteFooter() {
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
        <Link href="/contacto" className="email-link" data-reveal>
          {SITE.email}
        </Link>
      ) : (
        <Link href="/contacto" className="email-link" data-reveal>
          Hablemos
        </Link>
      )}
    </footer>
  );
}
