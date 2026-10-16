import type { Metadata } from "next";
import Image from "next/image";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SITE, TEAM_IMAGE } from "@/lib/constants";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Estudio - ${SITE.name}`,
  description: "Estudio creativo independiente especializado en diseño estratégico, identidad visual y experiencias digitales.",
  openGraph: {
    title: `Estudio - ${SITE.name}`,
    description: "Estudio creativo independiente especializado en diseño estratégico, identidad visual y experiencias digitales.",
    type: "website",
  },
};

export default function EstudioPage() {
  return (
    <div className="site-wrapper">
      <SiteHeader />
      <main className="content-page estudio-page">
        <section className="page-hero">
          <h1>Nuestro Estudio</h1>
          <p className="lead">
            Somos un estudio creativo independiente que combina estrategia, diseño y tecnología para crear
            experiencias memorables.
          </p>
        </section>

        <section className="content-section">
          <div className="section-grid">
            <div className="section-content">
              <h2>Nuestro Enfoque</h2>
              <p>
                Creemos que el diseño va más allá de lo visual. Es una herramienta para resolver problemas,
                conectar personas y construir experiencias que perduran. Cada proyecto es una oportunidad para
                explorar nuevas ideas y desafiar lo establecido.
              </p>
              <p>
                Trabajamos de forma colaborativa con nuestros clientes, entendiendo sus necesidades y objetivos
                para crear soluciones únicas que generan impacto real.
              </p>
            </div>
            <div className="section-visual">
              <div className="visual-card">
                <h3>Servicios</h3>
                <ul className="services-list">
                  <li>Estrategia de marca</li>
                  <li>Identidad visual</li>
                  <li>Diseño de producto digital</li>
                  <li>Experiencia de usuario</li>
                  <li>Desarrollo web</li>
                  <li>Consultoría creativa</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section team-section">
          <div className="team-content">
            <h2>Equipo</h2>
            <p>
              Un equipo multidisciplinario de diseñadores, estrategas y desarrolladores unidos por la pasión de
              crear experiencias excepcionales.
            </p>
            <div className="team-image-wrapper">
              <Image
                src={TEAM_IMAGE}
                alt="Equipo de trabajo"
                width={800}
                height={500}
                className="team-image"
                quality={85}
              />
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="values-grid">
            <div className="value-card">
              <h3>Creatividad</h3>
              <p>Exploramos ideas sin límites, buscando soluciones innovadoras para cada desafío.</p>
            </div>
            <div className="value-card">
              <h3>Excelencia</h3>
              <p>Cada detalle cuenta. Nos comprometemos con la calidad en todo lo que hacemos.</p>
            </div>
            <div className="value-card">
              <h3>Colaboración</h3>
              <p>Trabajamos mano a mano con nuestros clientes, construyendo juntos el camino hacia el éxito.</p>
            </div>
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
