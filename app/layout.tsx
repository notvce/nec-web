import type { Metadata } from "next";

import { SITE, SITE_URL } from "@/lib/constants";
import { dmSans, geistMono } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  metadataBase: new URL(SITE_URL),
  keywords: ["estudio creativo", "diseño", "branding", "UX/UI", "desarrollo web", "Chile"],
  authors: [{ name: SITE.name }],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE_URL,
    siteName: SITE.name,
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${geistMono.variable}`}>
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
