import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { EDGE_LABEL, TEAM_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe.",
};

export default function NotFoundPage() {
  return (
    <div className="site-wrapper not-found-wrapper">
      <div className="not-found-bg" aria-hidden="true">
        <Image
          src={TEAM_IMAGE}
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="not-found-bg-image"
        />
      </div>
      <SiteHeader />
      <main className="content-page not-found-page">
        <section className="not-found-stage" aria-labelledby="not-found-title">
          <p className="error-code meta-mono" aria-hidden="true">404</p>
          <h1 id="not-found-title">Página no encontrada</h1>
          <p className="error-description">
            La ruta que buscas no existe o fue movida.
          </p>
          <Link href="/" className="error-link primary not-found-back">
            Volver al inicio <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <SiteFooter />
      <span className="edge-label" aria-hidden="true">{EDGE_LABEL}</span>
    </div>
  );
}
