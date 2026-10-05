"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/home/brand-mark";
import { TeamAvatar } from "@/components/home/team-avatar";
import { revealWithoutMotion } from "@/lib/animations/reveal-without-motion";
import { CAROUSEL_INTERVAL_MS, HERO_IMAGES, SITE } from "@/lib/constants";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { scheduleIdleTask } from "@/lib/utils/schedule-idle";

export function HomeClient() {
  const root = useRef<HTMLElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % HERO_IMAGES.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

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
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .fromTo("[data-nav]", { y: -14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 })
          .fromTo("[data-backdrop]", { scale: 1.06, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.35 }, "-=0.35")
          .fromTo("[data-title]", { y: 44, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85 }, "-=0.62")
          .fromTo("[data-reveal]", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.08 }, "-=0.48");
      }, node);

      revertAnimation = () => ctx.revert();
    });

    return () => {
      reverted = true;
      revertAnimation?.();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    return scheduleIdleTask(() => {
      HERO_IMAGES.slice(1).forEach((src) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
      });
    });
  }, [reducedMotion]);

  return (
    <main className="site-shell" ref={root} id="inicio">
      <div className="hero-backdrop" data-backdrop aria-hidden="true">
        {HERO_IMAGES.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            quality={75}
            className={`backdrop-image${activeImage === index ? " is-active" : ""}`}
          />
        ))}
      </div>
      <header className="topbar" data-nav>
        <a className="brand" href="#inicio" aria-label={`${SITE.name}, inicio`}>
          <BrandMark />
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#estudio">Estudio</a>
          <a href="#proyectos">Proyectos</a>
          <a href={`mailto:${SITE.email}`}>Contacto</a>
        </nav>
        <div className="nav-right">
          <a className="journal-link" href="#estudio">
            Nuestro enfoque
          </a>
          <a className="start-link" href={`mailto:${SITE.email}`}>
            Hablemos <span>↗</span>
          </a>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <span className="hero-project-anchor" id="proyectos" aria-hidden="true" />
        <h1 id="hero-title" className="hero-title" data-title>
          <Link href="/imaginamos" className="hero-word hero-word--imaginamos">
            IMAGINAMOS
          </Link>{" "}
          <Link href="/futuros" className="hero-word hero-word--futuros">
            FUTUROS
          </Link>
        </h1>
        <div className="carousel-controls" role="group" aria-label="Imágenes de portada">
          {HERO_IMAGES.map((image, index) => (
            <button
              key={image}
              type="button"
              className={`carousel-dot${activeImage === index ? " is-active" : ""}`}
              aria-label={`Ver imagen ${index + 1} de ${HERO_IMAGES.length}`}
              aria-pressed={activeImage === index}
              onClick={() => setActiveImage(index)}
            />
          ))}
        </div>
      </section>

      <footer className="footer" id="estudio">
        <div className="team-note" data-reveal>
          <div className="avatar-stack">
            <TeamAvatar slice={0} />
            <TeamAvatar slice={1} />
            <TeamAvatar slice={2} />
          </div>
          <p>
            Diseñamos el futuro,
            <br />
            <span>hoy.</span>
          </p>
        </div>
        <Link href="/contacto" className="email-link" data-reveal>
          {SITE.email}
        </Link>
      </footer>
      <span className="edge-label" aria-hidden="true">
        ESTUDIO CREATIVO — 2025
      </span>
    </main>
  );
}
