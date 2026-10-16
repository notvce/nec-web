export function revealWithoutMotion(root: HTMLElement) {
  root
    .querySelectorAll<HTMLElement>(
      "[data-nav], [data-title], [data-reveal], [data-backdrop], [data-contact-reveal]"
    )
    .forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
}
