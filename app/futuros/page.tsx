import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SITE } from "@/lib/constants";

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
        <section className="page-hero">
          <h1>FUTUROS</h1>
          <p className="lead">
            Exploramos escenarios, ideas y direcciones creativas que aún no existen, anticipando lo que viene.
          </p>
        </section>

        <section className="content-section">
          <div className="section-content-centered">
            <h2>Visión Prospectiva</h2>
            <p>
              En un mundo en constante cambio, el futuro no se predice: se construye. Exploramos tendencias
              emergentes, tecnologías disruptivas y nuevas formas de pensar para ayudar a nuestros clientes a
              anticiparse y liderar el cambio.
            </p>
          </div>
        </section>

        <section className="content-section">
          <div className="futures-grid">
            <div className="future-card">
              <h3>Investigación de Tendencias</h3>
              <p>
                Analizamos señales culturales, tecnológicas y sociales para identificar oportunidades antes de
                que se conviertan en mainstream.
              </p>
            </div>
            <div className="future-card">
              <h3>Prototipado de Conceptos</h3>
              <p>
                Materializamos ideas en prototipos tangibles que permiten explorar, testear y validar nuevas
                direcciones creativas.
              </p>
            </div>
            <div className="future-card">
              <h3>Diseño Especulativo</h3>
              <p>
                Creamos escenarios ficticios pero plausibles que desafían suposiciones y abren conversaciones
                sobre futuros posibles.
              </p>
            </div>
          </div>
        </section>

        <section className="content-section cta-section">
          <div className="cta-box">
            <h2>¿Listo para explorar el futuro?</h2>
            <p>Conversemos sobre cómo podemos anticipar y diseñar lo que viene.</p>
            <Link href="/contacto" className="cta-button">
              Iniciar conversación <span>↗</span>
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
