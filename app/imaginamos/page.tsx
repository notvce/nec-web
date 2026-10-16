import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageClosing, PageHero, ProcessTimeline, SectionIntro } from "@/components/pages/sub-page";
import { EDGE_LABEL, IMAGINAMOS_STEPS, PAGE_CLOSING_PHRASES, SITE } from "@/lib/constants";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Imaginamos - ${SITE.name}`,
  description: "Convertimos ideas en experiencias, marcas y productos con visión creativa.",
  openGraph: {
    title: `Imaginamos - ${SITE.name}`,
    description: "Convertimos ideas en experiencias, marcas y productos con visión creativa.",
    type: "website",
  },
};

export default function ImaginamosPage() {
  return (
    <div className="site-wrapper">
      <SiteHeader />
      <main className="content-page imaginamos-page">
        <PageHero
          title="IMAGINAMOS"
          lead="Convertimos ideas en experiencias tangibles, marcas memorables y productos con visión creativa."
        />

        <section className="content-section">
          <SectionIntro title="Proceso Creativo">
            <p>
              Todo gran proyecto comienza con la imaginación. Transformamos conceptos abstractos en soluciones
              concretas a través de un proceso colaborativo que combina investigación, creatividad y ejecución
              impecable.
            </p>
          </SectionIntro>
        </section>

        <section className="content-section">
          <ProcessTimeline items={IMAGINAMOS_STEPS} />
        </section>

        <PageClosing phrase={PAGE_CLOSING_PHRASES.imaginamos} />
      </main>
      <SiteFooter />
      <span className="edge-label" aria-hidden="true">{EDGE_LABEL}</span>
    </div>
  );
}
