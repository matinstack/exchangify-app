import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { user } from "@/db/schema/auth-schema";

export const activityActionEnum = pgEnum("activity_action", [
  "signup",
  "login",
  "logout",

  "password_changed",

  "account_created",
  "account_updated",
  "account_deleted",

  "transaction_created",
  "transaction_updated",
  "transaction_deleted",

  "budget_created",
  "budget_updated",
  "budget_deleted",

  "goal_created",
  "goal_updated",
  "goal_completed",

  "category_created",
  "category_updated",
  "category_deleted",
]);

export const ActivityLog = pgTable("activity_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => user.id),
  action: activityActionEnum("activity_action").notNull(),
  entityType: text("entity_type"),
  entityId: text("entity_id"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});
