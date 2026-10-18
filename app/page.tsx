import { HomeClient } from "@/components/home/home-client";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/page-metadata";

export const dynamic = "force-static";

export const metadata = createPageMetadata({
  title: SITE.title,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return <HomeClient />;
}
