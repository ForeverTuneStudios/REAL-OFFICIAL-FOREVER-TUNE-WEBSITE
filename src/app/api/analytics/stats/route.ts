import { NextResponse } from "next/server";
import { db } from "@/db";
import { pageViews, buttonClicks } from "@/db/schema";
import { sql, desc } from "drizzle-orm";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total views
    const [totalResult] = await db.select({ count: sql<number>`count(*)::int` }).from(pageViews);
    const totalViews = totalResult?.count || 0;

    // Today views
    const [todayResult] = await db.select({ count: sql<number>`count(*)::int` }).from(pageViews)
      .where(sql`${pageViews.createdAt} >= ${todayStart}`);
    const todayViews = todayResult?.count || 0;

    // Week views
    const [weekResult] = await db.select({ count: sql<number>`count(*)::int` }).from(pageViews)
      .where(sql`${pageViews.createdAt} >= ${weekStart}`);
    const weekViews = weekResult?.count || 0;

    // Month views
    const [monthResult] = await db.select({ count: sql<number>`count(*)::int` }).from(pageViews)
      .where(sql`${pageViews.createdAt} >= ${monthStart}`);
    const monthViews = monthResult?.count || 0;

    // Top pages
    const topPages = await db.select({
      page: pageViews.page,
      count: sql<number>`count(*)::int`,
    }).from(pageViews).groupBy(pageViews.page).orderBy(desc(sql`count(*)`)).limit(10);

    // Browser stats
    const browsers = await db.select({
      browser: pageViews.browser,
      count: sql<number>`count(*)::int`,
    }).from(pageViews).groupBy(pageViews.browser).orderBy(desc(sql`count(*)`));

    // Device stats
    const devices = await db.select({
      device: pageViews.device,
      count: sql<number>`count(*)::int`,
    }).from(pageViews).groupBy(pageViews.device).orderBy(desc(sql`count(*)`));

    // Top clicked buttons
    const topClicks = await db.select({
      buttonName: buttonClicks.buttonName,
      count: sql<number>`count(*)::int`,
    }).from(buttonClicks).groupBy(buttonClicks.buttonName).orderBy(desc(sql`count(*)`)).limit(10);

    // Platform clicks
    const platformClicks = await db.select({
      platform: buttonClicks.platform,
      count: sql<number>`count(*)::int`,
    }).from(buttonClicks)
      .where(sql`${buttonClicks.platform} IS NOT NULL AND ${buttonClicks.platform} != ''`)
      .groupBy(buttonClicks.platform).orderBy(desc(sql`count(*)`));

    return NextResponse.json({
      totalViews,
      todayViews,
      weekViews,
      monthViews,
      topPages,
      browsers,
      devices,
      topClicks,
      platformClicks,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
