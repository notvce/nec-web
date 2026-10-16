import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { EditorialList, PageClosing, PageHero, SectionIntro } from "@/components/pages/sub-page";
import { EDGE_LABEL, FUTUROS_ITEMS, PAGE_CLOSING_PHRASES, SITE } from "@/lib/constants";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Futuros - ${SITE.name}`,
  description: "Exploramos escenarios, ideas y direcciones creativas que aún no existen.",
  openGraph: {
    title: `Futuros - ${SITE.name}`,
    description: "Exploramos escenarios, ideas y direcciones creativas que aún no existen.",
    type: "website",
  },
};

export default function FuturosPage() {
  return (
    <div className="site-wrapper">
      <SiteHeader />
      <main className="content-page futuros-page">
        <PageHero
          title="FUTUROS"
          lead="Exploramos escenarios, ideas y direcciones creativas que aún no existen, anticipando lo que viene."
        />

        <section className="content-section">
          <SectionIntro title="Visión Prospectiva">
            <p>
              En un mundo en constante cambio, el futuro no se predice: se construye. Exploramos tendencias
              emergentes, tecnologías disruptivas y nuevas formas de pensar para ayudar a nuestros clientes a
              anticiparse y liderar el cambio.
            </p>
          </SectionIntro>
        </section>

        <section className="content-section">
          <EditorialList items={FUTUROS_ITEMS} />
        </section>

        <PageClosing phrase={PAGE_CLOSING_PHRASES.futuros} />
      </main>
      <SiteFooter />
      <span className="edge-label" aria-hidden="true">{EDGE_LABEL}</span>
    </div>
  );
}
