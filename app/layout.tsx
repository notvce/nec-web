import type { Metadata } from "next";

import { SITE } from "@/lib/constants";
import { dmSans } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={dmSans.variable}>
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
