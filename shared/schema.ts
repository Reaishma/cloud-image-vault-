import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  size: integer("size").notNull(),
  mimeType: text("mime_type").notNull(),
  dimensions: text("dimensions"),
  uploadDate: timestamp("upload_date").notNull().defaultNow(),
  provider: text("provider").notNull().default("google"),
  cdnUrl: text("cdn_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  metadata: text("metadata"),
  userId: integer("user_id").references(() => users.id),
});

export const storageAnalytics = pgTable("storage_analytics", {
  id: serial("id").primaryKey(),
  totalStorage: text("total_storage").notNull(),
  totalImages: integer("total_images").notNull(),
  bandwidth: text("bandwidth").notNull(),
  monthlyCost: text("monthly_cost").notNull(),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertImageSchema = createInsertSchema(images).omit({
  id: true,
  uploadDate: true,
});

export const insertStorageAnalyticsSchema = createInsertSchema(storageAnalytics).omit({
  id: true,
  lastUpdated: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertImage = z.infer<typeof insertImageSchema>;
export type Image = typeof images.$inferSelect;
export type InsertStorageAnalytics = z.infer<typeof insertStorageAnalyticsSchema>;
export type StorageAnalytics = typeof storageAnalytics.$inferSelect;

