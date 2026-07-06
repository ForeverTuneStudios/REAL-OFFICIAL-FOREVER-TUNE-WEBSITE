import {
  pgTable,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  serial,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";

/* ── Users (Admin) ── */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("admin"),
  twoFactorSecret: text("two_factor_secret"),
  twoFactorEnabled: boolean("two_factor_enabled").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ── Releases (Songs / Albums / EPs) ── */
export const releases = pgTable("releases", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  type: varchar("type", { length: 50 }).notNull().default("single"), // single, album, ep, instrumental
  description: text("description"),
  coverArt: text("cover_art"), // URL to image
  releaseDate: timestamp("release_date").notNull(),
  lyrics: text("lyrics"),
  credits: text("credits"),
  isFeatured: boolean("is_featured").notNull().default(false),
  isUpcoming: boolean("is_upcoming").notNull().default(false),
  streamingLinks: jsonb("streaming_links").$type<Record<string, string>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── Site Settings ── */
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 200 }).notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── Page Views / Analytics ── */
export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  page: varchar("page", { length: 500 }).notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 200 }),
  device: varchar("device", { length: 50 }),
  browser: varchar("browser", { length: 100 }),
  sessionId: varchar("session_id", { length: 100 }),
  isNewVisitor: boolean("is_new_visitor").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ── Button Clicks ── */
export const buttonClicks = pgTable("button_clicks", {
  id: serial("id").primaryKey(),
  buttonName: varchar("button_name", { length: 200 }).notNull(),
  page: varchar("page", { length: 500 }),
  releaseId: integer("release_id"),
  platform: varchar("platform", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ── Contact Form Submissions ── */
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 300 }).notNull(),
  subject: varchar("subject", { length: 500 }),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ── Activity Logs ── */
export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  action: varchar("action", { length: 200 }).notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
