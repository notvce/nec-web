import type { Metadata } from "next";

import { SITE } from "@/lib/constants";

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}` | "/";
}): Metadata {
  const pageTitle = title.includes(SITE.name) ? title : `${title} - ${SITE.name}`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: path,
      type: "website",
    },
    twitter: {
      title: pageTitle,
      description,
    },
  };
}
