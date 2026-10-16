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
      <SiteHeader />
      <main className="content-page not-found-page">
        <section className="not-found-stage" aria-labelledby="not-found-title">
          <p id="not-found-title" className="error-code meta-mono meta-index" aria-label="Error 404">
            404
          </p>
          <div className="not-found-brand-photo">
            <Image
              src={TEAM_IMAGE}
              alt=""
              fill
              sizes="(max-width: 900px) 90vw, 480px"
              quality={85}
              className="not-found-brand-image"
            />
          </div>
          <div className="not-found-copy">
            <p className="not-found-lead">Página no encontrada</p>
            <p className="error-description">
              La ruta que buscas no existe o fue movida.
            </p>
            <Link href="/" className="error-link primary not-found-back">
              Volver al inicio <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <span className="edge-label" aria-hidden="true">{EDGE_LABEL}</span>
    </div>
  );
}
