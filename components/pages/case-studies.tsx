import Image from "next/image";

import type { PROJECT_CASES } from "@/lib/constants";
import { isContactDetailVisible } from "@/lib/constants";

type ProjectCase = (typeof PROJECT_CASES)[number];

function caseDisplayName(project: ProjectCase): string | null {
  if (isContactDetailVisible(project.title)) return project.title;
  if (isContactDetailVisible(project.outcome)) return project.outcome;
  if (isContactDetailVisible(project.discipline)) return project.discipline;
  return null;
}

export function CaseStudyList({ cases }: { cases: readonly ProjectCase[] }) {
  return (
    <div className="case-studies">
      {cases.map((project, index) => {
        const displayName = caseDisplayName(project);
        const showClient = isContactDetailVisible(project.client);
        const showYear = isContactDetailVisible(project.year);
        const metaParts = [
          showClient ? project.client : null,
          showYear ? project.year : null,
          project.discipline,
        ].filter(Boolean);

        return (
          <article
            key={project.slug}
            className={`case-study case-study--${project.layout}`}
          >
            <div className="case-study-media">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 66vw"
                quality={80}
                className="case-study-image"
                priority={index === 0}
              />
            </div>
            <div className="case-study-footer">
              {displayName ? (
                <h2 className="case-study-name">{displayName}</h2>
              ) : (
                <h2 className="case-study-name case-study-name--placeholder">
                  <span className="meta-mono">{project.index}</span> {project.discipline}
                </h2>
              )}
              <p className="case-study-meta-row meta-mono">
                <span className="case-study-index meta-index">{project.index}</span>
                {metaParts.map((part) => (
                  <span key={String(part)}>{part}</span>
                ))}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
