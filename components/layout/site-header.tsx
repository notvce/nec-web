"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";

import { BrandMark } from "@/components/home/brand-mark";
import { SITE } from "@/lib/constants";

const MOBILE_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/estudio", label: "Estudio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerToggleRef = useRef<HTMLButtonElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const lastLinkRef = useRef<HTMLAnchorElement>(null);
  const isActive = (path: string) => pathname === path;

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((open) => {
      if (open) {
        window.requestAnimationFrame(() => {
          headerToggleRef.current?.focus();
        });
      }
      return !open;
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (mobileMenuOpen) {
      root.classList.add("mobile-menu-open");
      root.style.overflow = "hidden";
      const focusTimer = window.requestAnimationFrame(() => {
        firstLinkRef.current?.focus();
      });
      return () => {
        window.cancelAnimationFrame(focusTimer);
        root.classList.remove("mobile-menu-open");
        root.style.overflow = "";
      };
    }
    root.classList.remove("mobile-menu-open");
    root.style.overflow = "";
    return undefined;
  }, [mobileMenuOpen]);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu();
        window.requestAnimationFrame(() => {
          headerToggleRef.current?.focus();
        });
        return;
      }

      if (event.key !== "Tab") return;

      const toggle = menuToggleRef.current;
      const first = firstLinkRef.current;
      const last = lastLinkRef.current;
      if (!toggle || !first || !last) return;

      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          toggle.focus();
        } else if (active === toggle) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last) {
        event.preventDefault();
        toggle.focus();
      } else if (active === toggle) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, closeMobileMenu]);

  return (
    <>
    <header className="topbar site-header" data-nav>
      <Link
        className="brand"
        href="/"
        aria-label={`${SITE.name}, inicio`}
        aria-hidden={mobileMenuOpen}
        tabIndex={mobileMenuOpen ? -1 : 0}
      >
        <BrandMark />
      </Link>
      <nav className="main-nav" aria-label="Navegación principal">
        <Link href="/" className={isActive("/") ? "is-active" : ""}>
          Inicio
        </Link>
        <Link href="/estudio" className={isActive("/estudio") ? "is-active" : ""}>
          Estudio
        </Link>
        <Link href="/proyectos" className={isActive("/proyectos") ? "is-active" : ""}>
          Proyectos
        </Link>
        <Link href="/contacto" className={isActive("/contacto") ? "is-active" : ""}>
          Contacto
        </Link>
      </nav>
      <div className="nav-right">
        <Link className="journal-link" href="/estudio">
          Nuestro enfoque
        </Link>
        <Link className="start-link" href="/contacto">
          Hablemos <span>↗</span>
        </Link>
      </div>
      <button
        ref={headerToggleRef}
        type="button"
        className="mobile-menu-toggle"
        aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
        aria-hidden={mobileMenuOpen}
        tabIndex={mobileMenuOpen ? -1 : 0}
        onClick={toggleMobileMenu}
      >
        <span className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </header>
    <MobileMenuPortal
      open={mobileMenuOpen}
      pathname={pathname}
      onClose={closeMobileMenu}
      onToggle={toggleMobileMenu}
      firstLinkRef={firstLinkRef}
      lastLinkRef={lastLinkRef}
      menuToggleRef={menuToggleRef}
    />
    </>
  );
}

function MobileMenuPortal({
  open,
  pathname,
  onClose,
  onToggle,
  firstLinkRef,
  lastLinkRef,
  menuToggleRef,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
  onToggle: () => void;
  firstLinkRef: RefObject<HTMLAnchorElement | null>;
  lastLinkRef: RefObject<HTMLAnchorElement | null>;
  menuToggleRef: RefObject<HTMLButtonElement | null>;
}) {
  const isActive = (path: string) => pathname === path;

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      <div className="mobile-menu-chrome">
        <Link className="brand" href="/" aria-label={`${SITE.name}, inicio`} onClick={onClose}>
          <BrandMark />
        </Link>
        <button
          ref={menuToggleRef}
          type="button"
          className="mobile-menu-toggle"
          aria-label="Cerrar menú"
          aria-expanded={true}
          aria-controls="mobile-navigation"
          onClick={onToggle}
        >
          <span className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
      <div
        className="mobile-menu"
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <nav aria-label="Navegación móvil">
          {MOBILE_LINKS.map((link, index) => (
            <Link
              key={link.href}
              ref={index === 0 ? firstLinkRef : index === MOBILE_LINKS.length - 1 ? lastLinkRef : undefined}
              href={link.href}
              className={isActive(link.href) ? "is-active" : ""}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>,
    document.body,
  );
}
