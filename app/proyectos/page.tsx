import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Proyectos - ${SITE.name}`,
  description: "Explora nuestro portafolio de proyectos creativos y digitales que transforman ideas en experiencias.",
  openGraph: {
    title: `Proyectos - ${SITE.name}`,
    description: "Explora nuestro portafolio de proyectos creativos y digitales que transforman ideas en experiencias.",
    type: "website",
  },
};

export default function ProyectosPage() {
  return (
    <div className="site-wrapper">
      <SiteHeader />
      <main className="content-page proyectos-page">
        <section className="page-hero">
          <h1>Proyectos</h1>
          <p className="lead">
            Cada proyecto es una historia de transformación, donde la creatividad y la estrategia se unen para
            crear experiencias únicas.
          </p>
        </section>

        <section className="content-section">
          <div className="projects-intro">
            <p>
              A lo largo de nuestra trayectoria, hemos trabajado con marcas y empresas de diversos sectores,
              ayudándoles a materializar sus visiones y alcanzar sus objetivos a través del diseño estratégico.
            </p>
          </div>
        </section>

        <section className="content-section">
          <div className="projects-grid">
            <article className="project-card">
              <div className="project-header">
                <h3>Identidad de Marca</h3>
                <span className="project-tag">Branding</span>
              </div>
              <p>
                Desarrollo de identidades visuales coherentes y memorables que capturan la esencia de cada marca
                y conectan con su audiencia.
              </p>
              <ul className="project-services">
                <li>Estrategia de marca</li>
                <li>Diseño de logotipo</li>
                <li>Sistema visual</li>
                <li>Guías de uso</li>
              </ul>
            </article>

            <article className="project-card">
              <div className="project-header">
                <h3>Experiencias Digitales</h3>
                <span className="project-tag">UX/UI</span>
              </div>
              <p>
                Diseño de interfaces intuitivas y atractivas que priorizan la experiencia del usuario y cumplen
                objetivos de negocio.
              </p>
              <ul className="project-services">
                <li>Investigación UX</li>
                <li>Diseño de interfaces</li>
                <li>Prototipado</li>
                <li>Testing de usabilidad</li>
              </ul>
            </article>

            <article className="project-card">
              <div className="project-header">
                <h3>Desarrollo Web</h3>
                <span className="project-tag">Desarrollo</span>
              </div>
              <p>
                Sitios web y aplicaciones construidas con las últimas tecnologías, optimizadas para rendimiento
                y accesibilidad.
              </p>
              <ul className="project-services">
                <li>Desarrollo frontend</li>
                <li>Optimización SEO</li>
                <li>Responsive design</li>
                <li>Integración de sistemas</li>
              </ul>
            </article>

            <article className="project-card">
              <div className="project-header">
                <h3>Consultoría Creativa</h3>
                <span className="project-tag">Estrategia</span>
              </div>
              <p>
                Acompañamiento estratégico para equipos que buscan elevar su propuesta creativa y alcanzar nuevos
                niveles de excelencia.
              </p>
              <ul className="project-services">
                <li>Auditoría de marca</li>
                <li>Estrategia creativa</li>
                <li>Dirección de arte</li>
                <li>Workshop y capacitación</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="content-section cta-section">
          <div className="cta-box">
            <h2>¿Tienes un proyecto en mente?</h2>
            <p>Nos encantaría conocer tu visión y explorar cómo podemos trabajar juntos.</p>
            <Link href="/contacto" className="cta-button">
              Conversemos <span>↗</span>
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
