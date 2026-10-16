"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { revealWithoutMotion } from "@/lib/animations/reveal-without-motion";
import { BUDGET_RANGES, isContactDetailVisible, PROJECT_TYPES, SITE } from "@/lib/constants";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { validateContactFields, type ContactFieldErrors } from "@/lib/validate-contact";

type FormStatus = "idle" | "pending" | "success" | "error";

type FieldKey = keyof ContactFieldErrors;

function fieldErrorId(field: FieldKey) {
  return `contact-${field}-error`;
}

export function ContactForm() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    if (reducedMotion) {
      revealWithoutMotion(node);
      return;
    }

    let reverted = false;
    let revertAnimation: (() => void) | undefined;

    import("gsap").then(({ gsap }) => {
      if (reverted) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-contact-reveal]",
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.75, stagger: 0.1, ease: "power3.out" }
        );
      }, node);

      revertAnimation = () => ctx.revert();
    });

    return () => {
      reverted = true;
      revertAnimation?.();
    };
  }, [reducedMotion]);

  const toggleProjectType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.projectTypes;
      return next;
    });
  };

  const clearFieldError = (field: FieldKey) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "pending") return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      projectTypes: selectedTypes,
      budget: String(formData.get("budget") ?? ""),
      message: String(formData.get("message") ?? ""),
      _gotcha: String(formData.get("_gotcha") ?? ""),
    };

    if (payload._gotcha.trim()) {
      return;
    }

    const errors = validateContactFields(payload);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitError("");
      setStatus("idle");
      return;
    }

    setStatus("pending");
    setFieldErrors({});
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error || "Error al enviar el formulario");
      }

      setStatus("success");
      form.reset();
      setSelectedTypes([]);
    } catch (error) {
      setStatus("error");
      setSubmitError(
        error instanceof Error ? error.message : "Ocurrió un error inesperado. Intenta de nuevo."
      );
    }
  };

  const pending = status === "pending";
  const showEmail = isContactDetailVisible(SITE.email);
  const showLocation = isContactDetailVisible(SITE.location);

  return (
    <section className="contact-form-section" ref={root} aria-label="Formulario de contacto">
      <header className="contact-editorial-header" data-contact-reveal>
        <p className="contact-editorial-kicker">Nuevo proyecto</p>
        <h2 className="contact-editorial-title">Cuéntanos qué quieres construir</h2>
        <p className="contact-editorial-lead">
          Tres pasos. Sin rodeos. Respondemos en 24–48 horas hábiles.
        </p>
      </header>

      <div className="contact-form-grid">
        <aside className="contact-info-panel" data-contact-reveal>
          <div className="contact-info-content">
            <p className="contact-info-eyebrow">Vías directas</p>
            <div className="contact-info-details">
              {showEmail ? (
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Email</span>
                  <a href={`mailto:${SITE.email}`} className="contact-detail-link">
                    {SITE.email}
                  </a>
                </div>
              ) : null}
              {showLocation ? (
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Ubicación</span>
                  <span className="contact-detail-text">{SITE.location}</span>
                </div>
              ) : null}
            </div>
          </div>
        </aside>

        <div className="contact-form-panel" data-contact-reveal>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="_gotcha"
              className="contact-honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="form-section">
              <div className="form-section-head">
                <span className="form-section-num" aria-hidden="true">01</span>
                <h3 className="form-section-title">Quién eres</h3>
              </div>
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
                    autoComplete="name"
                    disabled={pending}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? fieldErrorId("name") : undefined}
                    onChange={() => clearFieldError("name")}
                  />
                  {fieldErrors.name ? (
                    <p id={fieldErrorId("name")} className="form-field-error" role="alert">
                      {fieldErrors.name}
                    </p>
                  ) : null}
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
                    autoComplete="email"
                    disabled={pending}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? fieldErrorId("email") : undefined}
                    onChange={() => clearFieldError("email")}
                  />
                  {fieldErrors.email ? (
                    <p id={fieldErrorId("email")} className="form-field-error" role="alert">
                      {fieldErrors.email}
                    </p>
                  ) : null}
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
                  aria-invalid={Boolean(fieldErrors.company)}
                  aria-describedby={fieldErrors.company ? fieldErrorId("company") : undefined}
                  onChange={() => clearFieldError("company")}
                />
                {fieldErrors.company ? (
                  <p id={fieldErrorId("company")} className="form-field-error" role="alert">
                    {fieldErrors.company}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-head">
                <span className="form-section-num" aria-hidden="true">02</span>
                <h3 className="form-section-title">Tu proyecto</h3>
              </div>

              <div className="form-field">
                <span className="form-label" id="contact-project-types-label">
                  Tipo de proyecto <span className="required-mark">*</span>
                </span>
                <div
                  className="project-types-chips"
                  role="group"
                  aria-labelledby="contact-project-types-label"
                  aria-invalid={Boolean(fieldErrors.projectTypes)}
                  aria-describedby={
                    fieldErrors.projectTypes ? fieldErrorId("projectTypes") : undefined
                  }
                >
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
                {fieldErrors.projectTypes ? (
                  <p id={fieldErrorId("projectTypes")} className="form-field-error" role="alert">
                    {fieldErrors.projectTypes}
                  </p>
                ) : null}
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
                  aria-invalid={Boolean(fieldErrors.budget)}
                  aria-describedby={fieldErrors.budget ? fieldErrorId("budget") : undefined}
                  onChange={() => clearFieldError("budget")}
                >
                  <option value="">Selecciona un rango</option>
                  {BUDGET_RANGES.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                {fieldErrors.budget ? (
                  <p id={fieldErrorId("budget")} className="form-field-error" role="alert">
                    {fieldErrors.budget}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-head">
                <span className="form-section-num" aria-hidden="true">03</span>
                <h3 className="form-section-title">El mensaje</h3>
              </div>

              <div className="form-field">
                <label htmlFor="contact-message" className="form-label">
                  Mensaje <span className="required-mark">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-textarea"
                  rows={6}
                  disabled={pending}
                  placeholder="Objetivo, plazos, referencias, lo que consideres útil..."
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? fieldErrorId("message") : undefined}
                  onChange={() => clearFieldError("message")}
                />
                {fieldErrors.message ? (
                  <p id={fieldErrorId("message")} className="form-field-error" role="alert">
                    {fieldErrors.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="form-footer">
              <button type="submit" className="form-submit-btn" disabled={pending}>
                {pending ? "Enviando..." : "Enviar mensaje"}
              </button>

              {status === "success" ? (
                <p className="form-message form-message-success" role="status">
                  Gracias. Recibimos tu mensaje y te responderemos pronto.
                </p>
              ) : null}

              {status === "error" || submitError ? (
                <p className="form-message form-message-error" role="alert">
                  {submitError || "Algo salió mal. Por favor, intenta de nuevo."}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
