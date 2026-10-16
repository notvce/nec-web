import Image from "next/image";

import type { PROJECT_CASES } from "@/lib/constants";
import { isContactDetailVisible } from "@/lib/constants";

type ProjectCase = (typeof PROJECT_CASES)[number];

export function CaseStudyList({ cases }: { cases: readonly ProjectCase[] }) {
  return (
    <div className="case-studies">
      {cases.map((project) => {
        const showOutcome = isContactDetailVisible(project.outcome);
        const showTitle = isContactDetailVisible(project.title);

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
                priority={project.slug === "caso-1"}
              />
            </div>
            <div className="case-study-content">
              <p className="case-study-meta meta-mono">
                <span className="case-study-index meta-index">{project.index}</span>
                <span className="case-study-discipline">{project.discipline}</span>
              </p>
              {showOutcome ? <p className="case-study-outcome">{project.outcome}</p> : null}
              {showTitle ? <h2 className="case-study-title">{project.title}</h2> : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
