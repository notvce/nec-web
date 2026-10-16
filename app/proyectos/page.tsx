import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CaseStudyList } from "@/components/pages/case-studies";
import { PageClosing, PageHero, SectionIntro } from "@/components/pages/sub-page";
import { EDGE_LABEL, PAGE_CLOSING_PHRASES, PROJECT_CASES, SITE } from "@/lib/constants";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Proyectos - ${SITE.name}`,
  description:
    "Explora nuestro portafolio de proyectos creativos y digitales que transforman ideas en experiencias.",
  openGraph: {
    title: `Proyectos - ${SITE.name}`,
    description:
      "Explora nuestro portafolio de proyectos creativos y digitales que transforman ideas en experiencias.",
    type: "website",
  },
};

export default function ProyectosPage() {
  return (
    <div className="site-wrapper">
      <SiteHeader />
      <main className="content-page proyectos-page">
        <PageHero
          title="Proyectos"
          lead="Historias de transformación donde creatividad y estrategia se encuentran."
        />

        <section className="content-section">
          <SectionIntro title="Trabajo seleccionado">
            <p>
              Casos donde el diseño estratégico materializa visiones con impacto medible.
            </p>
          </SectionIntro>
        </section>

        <section className="content-section content-section--flush">
          <CaseStudyList cases={PROJECT_CASES} />
        </section>

        <PageClosing phrase={PAGE_CLOSING_PHRASES.proyectos} />
      </main>
      <SiteFooter />
      <span className="edge-label" aria-hidden="true">{EDGE_LABEL}</span>
    </div>
  );
}
