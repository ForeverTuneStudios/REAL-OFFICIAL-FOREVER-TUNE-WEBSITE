import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { releases } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const type = url.searchParams.get("type");
    const featured = url.searchParams.get("featured");

    const conditions = [];
    if (type && type !== "all") {
      conditions.push(eq(releases.type, type));
    }
    if (featured === "true") {
      conditions.push(eq(releases.isFeatured, true));
    }

    const results = conditions.length > 0
      ? await db.select().from(releases).where(and(...conditions)).orderBy(desc(releases.releaseDate))
      : await db.select().from(releases).orderBy(desc(releases.releaseDate));

    return NextResponse.json(results);
  } catch {
    return NextResponse.json({ error: "Failed to fetch releases" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const [release] = await db.insert(releases).values({
      title: body.title,
      type: body.type || "single",
      description: body.description || "",
      coverArt: body.coverArt || "",
      releaseDate: new Date(body.releaseDate || Date.now()),
      lyrics: body.lyrics || "",
      credits: body.credits || "",
      isFeatured: body.isFeatured || false,
      isUpcoming: body.isUpcoming || false,
      streamingLinks: body.streamingLinks || {},
    }).returning();

    return NextResponse.json(release, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create release" }, { status: 500 });
  }
}
