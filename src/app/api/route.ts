import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, siteSettings } from "@/db/schema";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const hash = await bcrypt.hash("admin123", 12);
    
    await db.insert(users).values({
      username: "admin",
      passwordHash: hash,
      role: "admin",
    }).onConflictDoNothing();

    await db.insert(siteSettings).values({
      key: "business_email",
      value: "forevertune.service@gmail.com",
    }).onConflictDoNothing();

    await db.insert(siteSettings).values({
      key: "site_name",
      value: "FOREVER TUNE STUDIOS",
    }).onConflictDoNothing();

    return NextResponse.json({ 
      success: true, 
      message: "Database seeded! Login with admin/admin123" 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: "Failed to seed database" 
    }, { status: 500 });
  }
}