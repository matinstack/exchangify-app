import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const priorityEnum = pgEnum("priority_enum", [
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
]);

export const reportStatusEnum = pgEnum("report_status_enum", [
  "PENDING",
  "IN_PROGRESS",
  "RESOLVED",
  "REJECTED",
]);

export const categoryEnum = pgEnum("category_enum", [
  "BUG",
  "FEATURE",
  "BILLING",
  "OTHER",
]);

export const reports = pgTable("reports", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuidv7()`),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  status: reportStatusEnum("status").default("PENDING").notNull(),
  priority: priorityEnum("priority").notNull(),
  categoty: categoryEnum("category").notNull(),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  isAnswered: boolean("is_answered").default(false).notNull(),
  adminReply: text("admin_reply"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
