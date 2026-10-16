import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  OfferingList,
  PageClosing,
  PageHero,
  SectionIntro,
  TeamPortraits,
} from "@/components/pages/sub-page";
import {
  EDGE_LABEL,
  ESTUDIO_SERVICES,
  ESTUDIO_VALUES,
  PAGE_CLOSING_PHRASES,
  SITE,
  TEAM_MEMBERS,
} from "@/lib/constants";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Estudio - ${SITE.name}`,
  description:
    "Estudio creativo independiente especializado en diseño estratégico, identidad visual y experiencias digitales.",
  openGraph: {
    title: `Estudio - ${SITE.name}`,
    description:
      "Estudio creativo independiente especializado en diseño estratégico, identidad visual y experiencias digitales.",
    type: "website",
  },
};

export default function EstudioPage() {
  return (
    <div className="site-wrapper">
      <SiteHeader />
      <main className="content-page estudio-page">
        <PageHero
          title="Estudio"
          lead="Estrategia, diseño y tecnología en un solo equipo para experiencias que perduran."
        />

        <section className="content-section">
          <SectionIntro title="Nuestro Enfoque">
            <p>
              Creemos que el diseño va más allá de lo visual. Es una herramienta para resolver problemas,
              conectar personas y construir experiencias que perduran.
            </p>
          </SectionIntro>
        </section>

        <section className="content-section">
          <OfferingList items={ESTUDIO_SERVICES} label="Qué hacemos" />
        </section>

        <section className="content-section team-section">
          <SectionIntro title="Equipo">
            <p>
              Un equipo multidisciplinario unido por la pasión de crear experiencias excepcionales.
            </p>
          </SectionIntro>
          <TeamPortraits members={TEAM_MEMBERS} />
        </section>

        <section className="content-section">
          <OfferingList items={ESTUDIO_VALUES} label="Valores" />
        </section>

        <PageClosing phrase={PAGE_CLOSING_PHRASES.estudio} />
      </main>
      <SiteFooter />
      <span className="edge-label" aria-hidden="true">{EDGE_LABEL}</span>
    </div>
  );
}
