import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import type { OfferingItem } from "@/lib/constants";
import { isContactDetailVisible, TEAM_IMAGE } from "@/lib/constants";

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
      <p className="page-closing-phrase">
        {phrase}{" "}
        <Link href="/contacto" className="page-closing-link">
          hablemos
          <span aria-hidden="true"> ↗</span>
        </Link>
      </p>
    </section>
  );
}

export function OfferingList({ items, label }: { items: readonly OfferingItem[]; label?: string }) {
  return (
    <div className="offering-block">
      {label ? <h2 className="offering-block-label meta-mono">{label}</h2> : null}
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

type TeamMember = {
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
