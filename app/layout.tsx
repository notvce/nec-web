import type { Metadata } from "next";

import { SITE } from "@/lib/constants";
import { dmSans } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  metadataBase: new URL("https://axnlabs.com"),
  keywords: ["estudio creativo", "diseño", "branding", "UX/UI", "desarrollo web", "Chile"],
  authors: [{ name: SITE.name }],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: "https://axnlabs.com",
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
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
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
    <html lang="es" className={dmSans.variable}>
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
