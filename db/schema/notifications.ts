import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "@/db/schema/auth-schema";

export const notificationTypeEnum = pgEnum("notification_type_enum", [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
]);

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  title: text("title").notNull(),
  message: text("message").notNull(),

  type: notificationTypeEnum("type").default("INFO").notNull(),
  link: text("link"),

  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
