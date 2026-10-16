import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL;

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectTypes: string[];
  budget: string;
  message: string;
}

function isValidContactData(data: unknown): data is ContactFormData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.name === "string" &&
    d.name.trim().length > 0 &&
    typeof d.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) &&
    typeof d.company === "string" &&
    Array.isArray(d.projectTypes) &&
    d.projectTypes.length > 0 &&
    d.projectTypes.every((t) => typeof t === "string") &&
    typeof d.budget === "string" &&
    typeof d.message === "string" &&
    d.message.trim().length > 0
  );
}

export async function POST(request: NextRequest) {
  try {
    const data: unknown = await request.json();

    if (!isValidContactData(data)) {
      return NextResponse.json(
        { error: "Datos del formulario inválidos" },
        { status: 400 }
      );
    }

    const { name, email, company, projectTypes, budget, message } = data;

    if (resend && TO_EMAIL) {
      const emailHtml = `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ""}
        <p><strong>Tipo(s) de proyecto:</strong> ${projectTypes.join(", ")}</p>
        ${budget ? `<p><strong>Presupuesto:</strong> ${budget}</p>` : ""}
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `;

      await resend.emails.send({
        from: "contacto@axntest.nuvak.dev",
        to: TO_EMAIL,
        subject: `Nuevo contacto: ${name} - ${projectTypes[0]}`,
        html: emailHtml,
        replyTo: email,
      });

      console.log(`[Contact Form] Email sent successfully via Resend to ${TO_EMAIL}`);
    } else {
      console.log("[Contact Form] Submission received (no email service configured):", {
        timestamp: new Date().toISOString(),
        projectTypes,
        hasBudget: !!budget,
        hasCompany: !!company,
        messageLength: message.length,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Contact Form] Error processing submission:", error);
    return NextResponse.json(
      { error: "Error al procesar el formulario" },
      { status: 500 }
    );
  }
}
