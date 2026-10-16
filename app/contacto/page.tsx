import type { Metadata } from "next";

import { ContactForm } from "@/components/pages/contact-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Contacto - ${SITE.name}`,
  description: "Cuéntanos tu proyecto. Respondemos en 24–48 horas hábiles.",
  openGraph: {
    title: `Contacto - ${SITE.name}`,
    description: "Cuéntanos tu proyecto. Respondemos en 24–48 horas hábiles.",
    type: "website",
  },
};

export default function ContactoPage() {
  return (
    <div className="site-wrapper">
      <SiteHeader />
      <main className="content-page contacto-main">
        <section className="page-hero contacto-page-hero">
          <h1>Contacto</h1>
        </section>
        <ContactForm />
      </main>
      <SiteFooter />
      <span className="edge-label" aria-hidden="true">
        ESTUDIO CREATIVO — 2025
      </span>
    </div>
  );
}
