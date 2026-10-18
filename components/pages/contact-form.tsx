"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { CONTACT_FORM_FINAL, setGsapFinalState } from "@/lib/animations/reveal-without-motion";
import { BUDGET_RANGES, PROJECT_TYPES, SITE } from "@/lib/constants";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { validateContactFields, type ContactFieldErrors } from "@/lib/validate-contact";

type FormStatus = "idle" | "pending" | "success" | "error";

type FieldKey = keyof ContactFieldErrors;

const SERVER_ERROR_MESSAGE = (
  <>
    No pudimos enviar tu mensaje. Escríbenos a{" "}
    <a href={`mailto:${SITE.email}`}>{SITE.email}</a> o intenta de nuevo.
  </>
);

function fieldErrorId(field: FieldKey) {
  return `contact-${field}-error`;
}

function RequiredMark() {
  return (
    <span className="form-required-mark" aria-hidden="true">
      *
    </span>
  );
}

export function ContactForm() {
  const root = useRef<HTMLElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [showServerError, setShowServerError] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    if (reducedMotion) {
      void setGsapFinalState(node, CONTACT_FORM_FINAL);
      return;
    }

    let reverted = false;
    let revertAnimation: (() => void) | undefined;

    import("gsap").then(({ gsap }) => {
      if (reverted) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-contact-reveal]",
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, ease: "power2.out" }
        );
      }, node);

      revertAnimation = () => ctx.revert();
    });

    return () => {
      reverted = true;
      revertAnimation?.();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (status !== "success") return;
    const heading = successHeadingRef.current;
    if (!heading) return;
    heading.focus();
  }, [status]);

  const clearFieldError = (field: FieldKey) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const resetForm = () => {
    setStatus("idle");
    setFieldErrors({});
    setShowServerError(false);
    setDetailsOpen(false);
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
      projectType: String(formData.get("projectType") ?? ""),
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
      if (errors.company || errors.budget) {
        setDetailsOpen(true);
      }
      setShowServerError(false);
      setStatus("idle");
      return;
    }

    setStatus("pending");
    setFieldErrors({});
    setShowServerError(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        await response.json().catch(() => null);
        throw new Error("server");
      }

      setStatus("success");
      form.reset();
      setDetailsOpen(false);
    } catch (error) {
      setStatus("error");
      if (error instanceof Error && error.message === "server") {
        setShowServerError(true);
      } else {
        setShowServerError(true);
      }
    }
  };

  const pending = status === "pending";

  if (status === "success") {
    return (
      <section
        className="contact-form-section contact-success-panel"
        ref={root}
        role="status"
        aria-label="Confirmación de envío"
      >
        <h2
          ref={successHeadingRef}
          className="contact-success-title"
          tabIndex={-1}
        >
          Mensaje recibido
        </h2>
        <p className="contact-success-text">Te respondemos en 24–48 horas hábiles.</p>
        <button type="button" className="contact-success-reset" onClick={resetForm}>
          Enviar otro mensaje
        </button>
      </section>
    );
  }

  return (
    <section className="contact-form-section" ref={root} aria-label="Formulario de contacto">
      <form className="contact-form" data-contact-reveal onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="_gotcha"
          className="contact-honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="form-field">
          <label htmlFor="contact-name" className="form-label">
            Nombre <RequiredMark />
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            className="form-input"
            autoComplete="name"
            disabled={pending}
            aria-required="true"
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
            Email <RequiredMark />
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            className="form-input"
            autoComplete="email"
            disabled={pending}
            aria-required="true"
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

        <div className="form-field">
          <label htmlFor="contact-project-type" className="form-label">
            Tipo de proyecto <RequiredMark />
          </label>
          <select
            id="contact-project-type"
            name="projectType"
            className="form-select"
            disabled={pending}
            defaultValue=""
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.projectType)}
            aria-describedby={fieldErrors.projectType ? fieldErrorId("projectType") : undefined}
            onChange={() => clearFieldError("projectType")}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {fieldErrors.projectType ? (
            <p id={fieldErrorId("projectType")} className="form-field-error" role="alert">
              {fieldErrors.projectType}
            </p>
          ) : null}
        </div>

        <details
          className="contact-optional-details"
          open={detailsOpen}
          onToggle={(event) => setDetailsOpen(event.currentTarget.open)}
        >
          <summary className="contact-optional-summary">Añadir detalles (opcional)</summary>
          <div className="contact-optional-fields">
            <div className="form-field">
              <label htmlFor="contact-company" className="form-label">
                Empresa
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

            <div className="form-field">
              <label htmlFor="contact-budget" className="form-label">
                Presupuesto aproximado
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
        </details>

        <div className="form-field">
          <label htmlFor="contact-message" className="form-label">
            Mensaje <RequiredMark />
          </label>
          <textarea
            id="contact-message"
            name="message"
            className="form-textarea"
            rows={5}
            disabled={pending}
            aria-required="true"
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

        <div className="form-footer">
          <button type="submit" className="form-submit-link" disabled={pending}>
            {pending ? "Enviando..." : "Enviar mensaje"}
            <span aria-hidden="true">↗</span>
          </button>

          {showServerError ? (
            <p className="form-message form-message-error" role="alert">
              {SERVER_ERROR_MESSAGE}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
