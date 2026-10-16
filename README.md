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

### Variables de entorno

El formulario de contacto soporta envío por email usando [Resend](https://resend.com). Si las siguientes variables están configuradas, los mensajes se enviarán por email; de lo contrario, se loguearán en el servidor:

```env
RESEND_API_KEY=re_xxxxx             # API key de Resend
CONTACT_FROM_EMAIL=onboarding@resend.dev # Remitente verificado en Resend
CONTACT_TO_EMAIL=email@domain.com   # Email destino para los mensajes
```

Crea un archivo `.env.local` en la raíz del proyecto con estas variables.

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
