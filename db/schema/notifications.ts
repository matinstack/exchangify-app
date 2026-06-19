import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "@/db/schema/users";

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  title: text("title"),
  message: text("message").notNull(),
  isRead: boolean("is_read"),
  createdAt: timestamp("created_at").defaultNow(),
});
