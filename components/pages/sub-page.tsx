import Link from "next/link";
import type { ReactNode } from "react";

type SubPageProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function SubPage({ title, description, children }: SubPageProps) {
  return (
    <main className="sub-page">
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
      <Link href="/" className="sub-page-back">
        ← Volver al inicio
      </Link>
    </main>
  );
}
