import Image from "next/image";

import type { PROJECT_CASES } from "@/lib/constants";

type ProjectCase = (typeof PROJECT_CASES)[number];

export function CaseStudyList({ cases }: { cases: readonly ProjectCase[] }) {
  return (
    <div className="case-studies">
      {cases.map((project) => (
        <article
          key={project.slug}
          className={`case-study case-study--${project.layout}`}
        >
          <div className="case-study-media">
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 90vw"
              quality={80}
              className="case-study-image"
              priority={project.slug === "caso-1"}
            />
          </div>
          <div className="case-study-content">
            <ul className="case-study-meta meta-mono" aria-label="Metadatos del proyecto">
              <li>{project.client}</li>
              <li>{project.year}</li>
              <li>{project.discipline}</li>
            </ul>
            <p className="case-study-outcome">{project.outcome}</p>
            <h2 className="case-study-title">{project.title}</h2>
          </div>
        </article>
      ))}
    </div>
  );
}
