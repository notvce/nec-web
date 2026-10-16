import { BUDGET_RANGES, CONTACT_LIMITS, PROJECT_TYPES } from "@/lib/constants";

const PROJECT_TYPE_SET = new Set<string>(PROJECT_TYPES);
const BUDGET_SET = new Set<string>(BUDGET_RANGES);

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "company" | "projectTypes" | "budget" | "message", string>
>;

export interface ContactInput {
  name: string;
  email: string;
  company: string;
  projectTypes: string[];
  budget: string;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactFields(input: ContactInput): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const company = input.company.trim();
  const message = input.message.trim();
  const budget = input.budget.trim();

  if (!name) {
    errors.name = "Ingresa tu nombre.";
  } else if (name.length > CONTACT_LIMITS.name) {
    errors.name = `Máximo ${CONTACT_LIMITS.name} caracteres.`;
  }

  if (!email) {
    errors.email = "Ingresa tu email.";
  } else if (email.length > CONTACT_LIMITS.email) {
    errors.email = `Máximo ${CONTACT_LIMITS.email} caracteres.`;
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Email no válido.";
  }

  if (company && company.length > CONTACT_LIMITS.company) {
    errors.company = `Máximo ${CONTACT_LIMITS.company} caracteres.`;
  }

  if (input.projectTypes.length === 0) {
    errors.projectTypes = "Selecciona al menos un tipo de proyecto.";
  } else if (!input.projectTypes.every((type) => PROJECT_TYPE_SET.has(type))) {
    errors.projectTypes = "Tipo de proyecto no válido.";
  }

  if (budget && !BUDGET_SET.has(budget)) {
    errors.budget = "Rango de presupuesto no válido.";
  }

  if (!message) {
    errors.message = "Cuéntanos sobre tu proyecto.";
  } else if (message.length > CONTACT_LIMITS.message) {
    errors.message = `Máximo ${CONTACT_LIMITS.message} caracteres.`;
  }

  return errors;
}

export function isValidContactPayload(input: ContactInput): boolean {
  return Object.keys(validateContactFields(input)).length === 0;
}

export { PROJECT_TYPE_SET, BUDGET_SET };
