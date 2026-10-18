import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { EDGE_LABEL, HERO_IMAGES } from "@/lib/constants";

export default function NotFoundPage() {
  return (
    <div className="site-wrapper not-found-wrapper">
      <SiteHeader />
      <div className="not-found-hero">
        <div className="not-found-bg" aria-hidden="true">
          <Image
            src={HERO_IMAGES[2]}
            alt=""
            fill
            sizes="100vw"
            quality={60}
            className="not-found-bg-image"
          />
        </div>
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
        <span className="edge-label" aria-hidden="true">{EDGE_LABEL}</span>
      </div>
      <SiteFooter variant="page" />
    </div>
  );
}
