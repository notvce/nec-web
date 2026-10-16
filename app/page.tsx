import type { Metadata } from "next";

import { HomeClient } from "@/components/home/home-client";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
