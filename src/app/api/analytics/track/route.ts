import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { pageViews, buttonClicks } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ua = req.headers.get("user-agent") || "";

    if (body.type === "pageview") {
      await db.insert(pageViews).values({
        page: body.page || "/",
        referrer: body.referrer || "",
        userAgent: ua,
        country: body.country || "",
        city: body.city || "",
        device: detectDevice(ua),
        browser: detectBrowser(ua),
        sessionId: body.sessionId || "",
        isNewVisitor: body.isNewVisitor ?? true,
      });
    } else if (body.type === "click") {
      await db.insert(buttonClicks).values({
        buttonName: body.buttonName || "unknown",
        page: body.page || "/",
        releaseId: body.releaseId || null,
        platform: body.platform || "",
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
  }
}

function detectDevice(ua: string): string {
  if (/mobile/i.test(ua)) return "mobile";
  if (/tablet|ipad/i.test(ua)) return "tablet";
  return "desktop";
}

function detectBrowser(ua: string): string {
  if (/chrome/i.test(ua) && !/edge/i.test(ua)) return "Chrome";
  if (/firefox/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return "Safari";
  if (/edge/i.test(ua)) return "Edge";
  return "Other";
}
