import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  EditorialList,
  PageClosing,
  PageHero,
  SectionIntro,
  ServicesList,
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
          title="Nuestro Estudio"
          lead="Somos un estudio creativo independiente que combina estrategia, diseño y tecnología para crear experiencias memorables."
        />

        <section className="content-section">
          <div className="section-grid">
            <SectionIntro title="Nuestro Enfoque">
              <p>
                Creemos que el diseño va más allá de lo visual. Es una herramienta para resolver problemas,
                conectar personas y construir experiencias que perduran. Cada proyecto es una oportunidad para
                explorar nuevas ideas y desafiar lo establecido.
              </p>
              <p>
                Trabajamos de forma colaborativa con nuestros clientes, entendiendo sus necesidades y objetivos
                para crear soluciones únicas que generan impacto real.
              </p>
            </SectionIntro>
            <div className="section-aside">
              <h3 className="section-aside-label meta-mono">Servicios</h3>
              <ServicesList items={ESTUDIO_SERVICES} />
            </div>
          </div>
        </section>

        <section className="content-section team-section">
          <SectionIntro title="Equipo">
            <p>
              Un equipo multidisciplinario de diseñadores, estrategas y desarrolladores unidos por la pasión de
              crear experiencias excepcionales.
            </p>
          </SectionIntro>
          <TeamPortraits members={TEAM_MEMBERS} />
        </section>

        <section className="content-section">
          <EditorialList items={ESTUDIO_VALUES} />
        </section>

        <PageClosing phrase={PAGE_CLOSING_PHRASES.estudio} />
      </main>
      <SiteFooter />
      <span className="edge-label" aria-hidden="true">{EDGE_LABEL}</span>
    </div>
  );
}
