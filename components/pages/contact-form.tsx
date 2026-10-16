"use client";

import { useState, type FormEvent } from "react";

import { PROJECT_TYPES, BUDGET_RANGES } from "@/lib/constants";

type FormStatus = "idle" | "pending" | "success" | "error";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectTypes: string[];
  budget: string;
  message: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const toggleProjectType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "pending") return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const botField = formData.get("_gotcha");
    if (botField) {
      return;
    }

    if (selectedTypes.length === 0) {
      setErrorMessage("Selecciona al menos un tipo de proyecto");
      return;
    }

    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      projectTypes: selectedTypes,
      budget: formData.get("budget") as string,
      message: formData.get("message") as string,
    };

    setStatus("pending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      setStatus("success");
      form.reset();
      setSelectedTypes([]);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Ocurrió un error inesperado. Intenta de nuevo."
      );
    }
  };

  const pending = status === "pending";

  return (
    <section className="contact-form-section">
      <div className="contact-form-grid">
        <div className="contact-info-panel">
          <div className="contact-info-content">
            <p className="contact-info-eyebrow">Conversemos</p>
            <h2 className="contact-info-title">Cuéntanos tu proyecto</h2>
            <p className="contact-info-description">
              Respondemos en 24–48 horas hábiles. Cuanto más detalles compartas, mejor podremos
              ayudarte.
            </p>
            <div className="contact-info-details">
              <div className="contact-detail-item">
                <span className="contact-detail-label">Email</span>
                <a href="mailto:hola@orbita.studio" className="contact-detail-link">
                  hola@orbita.studio
                </a>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-label">Ubicación</span>
                <span className="contact-detail-text">Santiago, Chile</span>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-label">Horario</span>
                <span className="contact-detail-text">Lun–Vie, 9:00–18:00 CLT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-panel">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="_gotcha"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="contact-name" className="form-label">
                  Nombre <span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  className="form-input"
                  required
                  autoComplete="name"
                  disabled={pending}
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email" className="form-label">
                  Email <span className="required-mark">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  className="form-input"
                  required
                  autoComplete="email"
                  disabled={pending}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-company" className="form-label">
                Empresa <span className="optional-mark">(opcional)</span>
              </label>
              <input
                type="text"
                id="contact-company"
                name="company"
                className="form-input"
                autoComplete="organization"
                disabled={pending}
              />
            </div>

            <div className="form-field">
              <label className="form-label">
                Tipo de proyecto <span className="required-mark">*</span>
              </label>
              <div className="project-types-chips" role="group" aria-label="Tipos de proyecto">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`project-chip ${selectedTypes.includes(type) ? "is-selected" : ""}`}
                    onClick={() => toggleProjectType(type)}
                    disabled={pending}
                    aria-pressed={selectedTypes.includes(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-budget" className="form-label">
                Presupuesto aproximado <span className="optional-mark">(opcional)</span>
              </label>
              <select
                id="contact-budget"
                name="budget"
                className="form-select"
                disabled={pending}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona un rango
                </option>
                {BUDGET_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="contact-message" className="form-label">
                Mensaje <span className="required-mark">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                className="form-textarea"
                rows={5}
                required
                disabled={pending}
                placeholder="Cuéntanos sobre tu proyecto, objetivos y plazos..."
              />
            </div>

            <div className="form-footer">
              <button type="submit" className="form-submit-btn" disabled={pending}>
                {pending ? "Enviando..." : "Enviar mensaje"}
              </button>

              {status === "success" && (
                <p className="form-message form-message-success" role="status">
                  ¡Gracias por escribirnos! Te responderemos pronto.
                </p>
              )}

              {(status === "error" || errorMessage) && (
                <p className="form-message form-message-error" role="alert">
                  {errorMessage || "Algo salió mal. Por favor, intenta de nuevo."}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
