import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SITE } from "@/lib/constants";

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
        <section className="page-hero">
          <h1>IMAGINAMOS</h1>
          <p className="lead">
            Convertimos ideas en experiencias tangibles, marcas memorables y productos con visión creativa.
          </p>
        </section>

        <section className="content-section">
          <div className="section-content-centered">
            <h2>Proceso Creativo</h2>
            <p>
              Todo gran proyecto comienza con la imaginación. Transformamos conceptos abstractos en soluciones
              concretas a través de un proceso colaborativo que combina investigación, creatividad y ejecución
              impecable.
            </p>
          </div>
        </section>

        <section className="content-section">
          <div className="process-grid">
            <div className="process-step">
              <span className="step-number">01</span>
              <h3>Descubrir</h3>
              <p>
                Investigamos a fondo tu marca, audiencia y contexto para identificar oportunidades únicas y
                desafíos a resolver.
              </p>
            </div>
            <div className="process-step">
              <span className="step-number">02</span>
              <h3>Idear</h3>
              <p>
                Generamos múltiples conceptos creativos, explorando direcciones diversas antes de converger en
                la mejor solución.
              </p>
            </div>
            <div className="process-step">
              <span className="step-number">03</span>
              <h3>Diseñar</h3>
              <p>
                Refinamos cada detalle visual y funcional, asegurando coherencia, usabilidad y excelencia en la
                ejecución.
              </p>
            </div>
            <div className="process-step">
              <span className="step-number">04</span>
              <h3>Implementar</h3>
              <p>
                Llevamos el diseño a la realidad con desarrollo de calidad, asegurando que la visión se
                materialice fielmente.
              </p>
            </div>
          </div>
        </section>

        <section className="content-section cta-section">
          <div className="cta-box">
            <h2>¿Tienes una idea?</h2>
            <p>Ayudamos a darle forma y convertirla en realidad.</p>
            <Link href="/contacto" className="cta-button">
              Cuéntanos tu idea <span>↗</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <span className="edge-label" aria-hidden="true">
        ESTUDIO CREATIVO — 2025
      </span>
    </div>
  );
}
