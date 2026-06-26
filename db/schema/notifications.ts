import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "@/db/schema/auth-schema";

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title"),
  message: text("message").notNull(),
  isRead: boolean("is_read"),
  createdAt: timestamp("created_at").defaultNow(),
});
