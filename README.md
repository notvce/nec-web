# Órbita — Estudio creativo

Landing estática construida con Next.js 15, React 19, TypeScript y GSAP.

## Estructura del proyecto

```
├── app/                  # Rutas (App Router)
├── components/           # UI por dominio (home, pages)
├── lib/                  # Constantes, fuentes, hooks, utilidades
├── styles/               # CSS modular (tokens, base, home, pages)
├── public/images/        # Assets servidos (WebP optimizados)
├── assets/source/        # Fuentes originales (PNG, no servidos)
└── docs/                 # Documentación del proyecto
```

## Requisitos

- Node.js 18.18+
- pnpm

## Desarrollo

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Producción

```bash
pnpm build
pnpm start
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing principal |
| `/imaginamos` | Página de enfoque creativo |
| `/futuros` | Página de proyectos |
| `/contacto` | Área de contacto |
