import { ContactForm } from "@/components/pages/contact-form";
import { ContactInfo } from "@/components/pages/contact-info";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { EDGE_LABEL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/page-metadata";

export const dynamic = "force-static";

export const metadata = createPageMetadata({
  title: "Contacto",
  description: "Cuéntanos tu proyecto. Respondemos en 24–48 horas hábiles.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <div className="site-wrapper">
      <SiteHeader />
      <main className="content-page contacto-main">
        <div className="contacto-layout">
          <section className="page-hero contacto-page-hero">
            <h1>Contacto</h1>
          </section>
          <ContactInfo />
          <ContactForm />
        </div>
      </main>
      <SiteFooter variant="page" />
      <span className="edge-label" aria-hidden="true">{EDGE_LABEL}</span>
    </div>
  );
}
