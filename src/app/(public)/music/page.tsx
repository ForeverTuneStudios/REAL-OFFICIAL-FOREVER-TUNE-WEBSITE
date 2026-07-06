import { db } from "@/db";
import { releases } from "@/db/schema";
import { desc } from "drizzle-orm";
import MusicPageClient from "./MusicPageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Music | FOREVER TUNE STUDIOS",
  description: "Browse all releases from FOREVER TUNE STUDIOS",
};

export default async function MusicPage() {
  const allReleases = await db
    .select()
    .from(releases)
    .orderBy(desc(releases.releaseDate));

  const serialized = allReleases.map((r) => ({
    ...r,
    releaseDate: r.releaseDate.toISOString(),
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));

  return <MusicPageClient releases={serialized} />;
}
