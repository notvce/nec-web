type GsapVars = Record<string, unknown>;

export async function setGsapFinalState(root: HTMLElement, targets: Record<string, GsapVars>) {
  const { gsap } = await import("gsap");
  Object.entries(targets).forEach(([selector, vars]) => {
    const elements = root.querySelectorAll(selector);
    if (elements.length) {
      gsap.set(elements, vars);
    }
  });
}

export const HOME_INTRO_FINAL = {
  "[data-nav]": { y: 0, autoAlpha: 1 },
  "[data-backdrop]": { scale: 1, autoAlpha: 1 },
  "[data-title]": { y: 0, autoAlpha: 1 },
  "[data-reveal]": { y: 0, autoAlpha: 1 },
} as const;

export const CONTACT_FORM_FINAL = {
  "[data-contact-reveal]": { y: 0, autoAlpha: 1 },
} as const;
