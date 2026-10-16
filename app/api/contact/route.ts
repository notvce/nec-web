import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { isContactRateLimited } from "@/lib/contact-rate-limit";
import { escapeHtml } from "@/lib/escape-html";
import { CONTACT_LIMITS } from "@/lib/constants";
import { isValidContactPayload, type ContactInput } from "@/lib/validate-contact";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function parseContactBody(data: unknown): ContactInput | null {
  if (!data || typeof data !== "object") return null;
  const body = data as Record<string, unknown>;


  if (
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.company !== "string" ||
    typeof body.budget !== "string" ||
    typeof body.message !== "string" ||
    !Array.isArray(body.projectTypes)
  ) {
    return null;
  }

  if (!body.projectTypes.every((item) => typeof item === "string")) {
    return null;
  }

  const input: ContactInput = {
    name: body.name.slice(0, CONTACT_LIMITS.name),
    email: body.email.slice(0, CONTACT_LIMITS.email),
    company: body.company.slice(0, CONTACT_LIMITS.company),
    projectTypes: body.projectTypes,
    budget: body.budget,
    message: body.message.slice(0, CONTACT_LIMITS.message),
  };

  if (!isValidContactPayload(input)) {
    return null;
  }

  return input;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isContactRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiados intentos. Intenta más tarde." },
        { status: 429 }
      );
    }

    const data: unknown = await request.json();

    const body = data as Record<string, unknown>;
    if (
      data &&
      typeof data === "object" &&
      typeof body._gotcha === "string" &&
      body._gotcha.trim().length > 0
    ) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const contact = parseContactBody(data);

    if (!contact) {
      return NextResponse.json({ error: "Datos del formulario inválidos" }, { status: 400 });
    }

    const { name, email, company, projectTypes, budget, message } = contact;

    if (resend && TO_EMAIL && FROM_EMAIL) {
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safeCompany = escapeHtml(company);
      const safeBudget = escapeHtml(budget);
      const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
      const safeTypes = projectTypes.map((type) => escapeHtml(type)).join(", ");

      const emailHtml = `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${company ? `<p><strong>Empresa:</strong> ${safeCompany}</p>` : ""}
        <p><strong>Tipo(s) de proyecto:</strong> ${safeTypes}</p>
        ${budget ? `<p><strong>Presupuesto:</strong> ${safeBudget}</p>` : ""}
        <p><strong>Mensaje:</strong></p>
        <p>${safeMessage}</p>
      `;

      await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `Nuevo contacto: ${name.slice(0, 80)} - ${projectTypes[0]}`,
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
    return NextResponse.json({ error: "Error al procesar el formulario" }, { status: 500 });
  }
}
