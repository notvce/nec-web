"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandMark } from "@/components/home/brand-mark";
import { SITE } from "@/lib/constants";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="topbar" data-nav>
      <Link className="brand" href="/" aria-label={`${SITE.name}, inicio`}>
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
        type="button"
        className="mobile-menu-toggle"
        aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      {mobileMenuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Menú de navegación">
          <nav aria-label="Navegación móvil">
            <Link
              href="/"
              className={isActive("/") ? "is-active" : ""}
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/estudio"
              className={isActive("/estudio") ? "is-active" : ""}
              onClick={() => setMobileMenuOpen(false)}
            >
              Estudio
            </Link>
            <Link
              href="/proyectos"
              className={isActive("/proyectos") ? "is-active" : ""}
              onClick={() => setMobileMenuOpen(false)}
            >
              Proyectos
            </Link>
            <Link
              href="/contacto"
              className={isActive("/contacto") ? "is-active" : ""}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
