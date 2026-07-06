import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await db.select().from(siteSettings);
    const map: Record<string, string> = {};
    for (const s of settings) {
      map[s.key] = s.value || "";
    }
    return NextResponse.json(map);
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json() as Record<string, string>;

    for (const [key, value] of Object.entries(body)) {
      const [existing] = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
      if (existing) {
        await db.update(siteSettings).set({ value, updatedAt: new Date() }).where(eq(siteSettings.key, key));
      } else {
        await db.insert(siteSettings).values({ key, value });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
