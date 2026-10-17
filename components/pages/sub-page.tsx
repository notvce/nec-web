import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import type { OfferingItem } from "@/lib/constants";
import { isContactDetailVisible, SITE, TEAM_IMAGE } from "@/lib/constants";

export function TeamGroupPhoto() {
  return (
    <figure className="team-group-photo">
      <Image
        src={TEAM_IMAGE}
        alt=""
        width={1200}
        height={750}
        sizes="100vw"
        quality={85}
        className="team-group-image"
      />
      <figcaption className="team-group-caption meta-mono">
        EQUIPO — {SITE.location}
      </figcaption>
    </figure>
  );
}

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
      <div className="page-closing-inner">
        <p className="page-closing-phrase">
          {phrase}{" "}
          <Link href="/contacto" className="page-closing-link">
            hablemos
            <span aria-hidden="true"> ↗</span>
          </Link>
        </p>
      </div>
    </section>
  );
}

export function ProcessTimeline({ items }: { items: readonly OfferingItem[] }) {
  return (
    <div className="process-timeline">
      <p className="offering-block-label meta-mono">Cómo trabajamos</p>
      <h2 className="offering-section-title">Proceso</h2>
      <ol className="process-timeline-list">
        {items.map((item) => (
          <li key={item.index} className="process-timeline-step">
            <span className="process-timeline-index meta-mono">{item.index}</span>
            <h3 className="process-timeline-title">{item.title}</h3>
            <p className="process-timeline-desc">{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FuturosSignal() {
  return (
    <section className="futuros-signal" aria-label="Señal prospectiva">
      <div className="futuros-signal-band" aria-hidden="true" />
      <blockquote className="futuros-signal-quote">
        <p className="futuros-signal-display">Lo que aún no existe</p>
        <p className="futuros-signal-muted">es donde empezamos a diseñar.</p>
      </blockquote>
    </section>
  );
}

export function OfferingList({
  items,
  title,
  metaLabel,
}: {
  items: readonly OfferingItem[];
  title: string;
  metaLabel?: string;
}) {
  return (
    <div className="offering-block">
      {metaLabel ? <p className="offering-block-label meta-mono">{metaLabel}</p> : null}
      <h2 className="offering-section-title">{title}</h2>
      <ul className="offering-list">
        {items.map((item) => {
          const visibleDeliverables = item.deliverables.filter(isContactDetailVisible);
          return (
            <li key={item.index} className="offering-row">
              <span className="offering-index meta-mono meta-index">{item.index}</span>
              <div className="offering-main">
                <h3 className="offering-title">{item.title}</h3>
                <p className="offering-desc">{item.description}</p>
              </div>
              {visibleDeliverables.length > 0 ? (
                <ul className="offering-deliverables" aria-label={`Entregables de ${item.title}`}>
                  {visibleDeliverables.map((deliverable) => (
                    <li key={`${item.index}-${deliverable}`} className="meta-mono">
                      {deliverable}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Listo para cuando existan datos reales de equipo (no renderizar sin miembros válidos). */
export type TeamMember = {
  slice: 0 | 1 | 2;
  name: string;
  role: string;
};

export function TeamPortraits({ members }: { members: readonly TeamMember[] }) {
  return (
    <div className="team-portraits">
      {members.map((member) => {
        const showName = isContactDetailVisible(member.name);
        const showRole = isContactDetailVisible(member.role);
        return (
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
            {showName || showRole ? (
              <figcaption>
                {showName ? <span className="team-portrait-name">{member.name}</span> : null}
                {showRole ? <span className="team-portrait-role">{member.role}</span> : null}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
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
