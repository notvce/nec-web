import { ContactPanel } from "@/components/pages/contact-panel";
import { SubPage } from "@/components/pages/sub-page";

export const dynamic = "force-static";

export default function ContactoPage() {
  return (
    <SubPage title="CONTACTO" description="Cuéntanos tu proyecto. Respondemos en 24–48 horas hábiles.">
      <ContactPanel />
    </SubPage>
  );
}
