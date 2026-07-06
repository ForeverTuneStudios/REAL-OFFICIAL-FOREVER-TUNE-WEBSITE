import { db } from "@/db";
import { releases } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ReleaseDetailClient from "./ReleaseDetailClient";

export const dynamic = "force-dynamic";

export default async function ReleaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [release] = await db.select().from(releases).where(eq(releases.id, parseInt(id))).limit(1);

  if (!release) notFound();

  const serialized = {
    ...release,
    releaseDate: release.releaseDate.toISOString(),
    createdAt: release.createdAt.toISOString(),
    updatedAt: release.updatedAt.toISOString(),
  };

  return <ReleaseDetailClient release={serialized} />;
}
