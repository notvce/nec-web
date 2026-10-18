import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageClosing, PageHero, ProcessTimeline } from "@/components/pages/sub-page";
import { EDGE_LABEL, IMAGINAMOS_STEPS, PAGE_CLOSING_PHRASES } from "@/lib/constants";
import { createPageMetadata } from "@/lib/page-metadata";

export const dynamic = "force-static";

export const metadata = createPageMetadata({
  title: "Imaginamos",
  description: "Convertimos ideas en experiencias, marcas y productos con visión creativa.",
  path: "/imaginamos",
});

export default function ImaginamosPage() {
  return (
    <div className="site-wrapper">
      <SiteHeader />
      <main className="content-page imaginamos-page">
        <PageHero
          title="Imaginamos"
          lead="Convertimos ideas en experiencias tangibles, marcas memorables y productos con visión creativa."
        />

        <section className="content-section">
          <ProcessTimeline items={IMAGINAMOS_STEPS} />
        </section>

        <PageClosing phrase={PAGE_CLOSING_PHRASES.imaginamos} />
      </main>
      <SiteFooter variant="page" />
      <span className="edge-label" aria-hidden="true">{EDGE_LABEL}</span>
    </div>
  );
}
