import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { TEAM_IMAGE } from "@/lib/constants";

export function PageHero({ title, lead }: { title: string; lead: string }) {
  return (
    <section className="page-hero">
      <h1>{title}</h1>
      <p className="lead">{lead}</p>
    </section>
  );
}

export function PageClosing({ phrase }: { phrase: string }) {
  return (
    <section className="page-closing" aria-label="Siguiente paso">
      <p className="page-closing-phrase">{phrase}</p>
      <Link href="/contacto" className="page-closing-link">
        Hablemos <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

export type EditorialItem = {
  index: string;
  title: string;
  description: string;
};

export function EditorialList({ items }: { items: readonly EditorialItem[] }) {
  return (
    <ul className="editorial-list">
      {items.map((item) => (
        <li key={item.index} className="editorial-row">
          <span className="editorial-index meta-mono">{item.index}</span>
          <h3 className="editorial-title">{item.title}</h3>
          <p className="editorial-desc">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

export function ProcessTimeline({ items }: { items: readonly EditorialItem[] }) {
  return (
    <ol className="process-timeline">
      {items.map((item) => (
        <li key={item.index} className="process-timeline-step">
          <span className="process-timeline-index meta-mono">{item.index}</span>
          <div className="process-timeline-body">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ServicesList({ items }: { items: readonly string[] }) {
  return (
    <ul className="estudio-services">
      {items.map((item) => (
        <li key={item}>
          <span>{item}</span>
          <span className="service-arrow meta-mono" aria-hidden="true">↗</span>
        </li>
      ))}
    </ul>
  );
}

type TeamMember = {
  slice: 0 | 1 | 2;
  name: string;
  role: string;
};

export function TeamPortraits({ members }: { members: readonly TeamMember[] }) {
  return (
    <div className="team-portraits">
      {members.map((member) => (
        <figure key={member.slice} className="team-portrait">
          <div className="team-portrait-frame">
            <Image
              src={TEAM_IMAGE}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={85}
              className="team-portrait-image"
              style={{ left: `${-member.slice * 100}%` }}
            />
          </div>
          <figcaption>
            <span className="team-portrait-name">{member.name}</span>
            <span className="team-portrait-role meta-mono">{member.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function SectionIntro({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="section-intro">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
