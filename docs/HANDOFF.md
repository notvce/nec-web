# Handoff — Órbita

Landing de una sola pantalla para un estudio creativo ficticio. Está hecha con Next.js App Router, React, TypeScript y GSAP.

## Estado y decisiones actuales

- El fondo del astronauta cubre el viewport con fundido cruzado cada 2,4 s. Opacidad activa `.68` con velo central reforzado.
- El titular es **"IMAGINAMOS FUTUROS"**, con enlaces interactivos a `/imaginamos` y `/futuros`.
- El correo del footer (`hola@orbita.studio`) navega a `/contacto`.
- La navegación superior mantiene `mailto:` en Contacto y Hablemos.
- `prefers-reduced-motion` desactiva rotación automática y transiciones.

## Archivos relevantes

- `app/page.tsx` — ruta home (Server Component)
- `components/home/home-client.tsx` — carrusel, navegación, animaciones GSAP
- `components/pages/sub-page.tsx` — layout compartido de páginas secundarias
- `lib/constants.ts` — email, imágenes, textos del sitio
- `styles/` — CSS modular (tokens, base, home, pages)
- `public/images/*.webp` — imágenes servidas
- `assets/source/images/*.png` — fuentes originales

## Requisitos y ejecución

```bash
pnpm install
pnpm dev
```

Ver `README.md` en la raíz para más detalle.
