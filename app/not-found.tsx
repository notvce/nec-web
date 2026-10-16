import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { EDGE_LABEL, HERO_IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe.",
};

export default function NotFoundPage() {
  return (
    <div className="site-wrapper not-found-wrapper">
      <div className="not-found-backdrop" aria-hidden="true">
        <Image src={HERO_IMAGES[0]} alt="" fill sizes="100vw" quality={60} className="not-found-backdrop-image" />
      </div>
      <SiteHeader />
      <main className="content-page not-found-page">
        <section className="page-hero">
          <h1 className="error-code">404</h1>
          <p className="lead">Página no encontrada</p>
          <p className="error-description">
            Lo sentimos, la página que buscas no existe o fue movida.
          </p>
          <div className="error-actions">
            <Link href="/" className="error-link primary">
              Volver al inicio <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/contacto" className="error-link">
              Contacto
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <span className="edge-label" aria-hidden="true">{EDGE_LABEL}</span>
    </div>
  );
}
