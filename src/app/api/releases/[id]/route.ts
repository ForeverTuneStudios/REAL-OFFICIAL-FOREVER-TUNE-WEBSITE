import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { releases } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAuthUser } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [release] = await db.select().from(releases).where(eq(releases.id, parseInt(id))).limit(1);
    if (!release) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(release);
  } catch {
    return NextResponse.json({ error: "Failed to fetch release" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const [updated] = await db.update(releases).set({
      ...body,
      releaseDate: body.releaseDate ? new Date(body.releaseDate) : undefined,
      updatedAt: new Date(),
    }).where(eq(releases.id, parseInt(id))).returning();

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update release" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await db.delete(releases).where(eq(releases.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete release" }, { status: 500 });
  }
}
