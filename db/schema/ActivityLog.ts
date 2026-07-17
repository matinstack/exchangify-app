import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { user } from "@/db/schema/auth-schema";

export const entityTypeEnum = pgEnum("entity_type", [
  "transaction",
  "account",
  "budget",
  "goal",
  "category",
  "user",
]);

export const activityActionEnum = pgEnum("activity_action", [
  "signup",
  "login",
  "logout",

  "password_changed",

  "card_created",
  "card_updated",
  "card_deleted",

  "profile_updated",
  "currency_changed",

  "theme_changed",

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

export const ActivityLog = pgTable(
  "activity_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .references(() => user.id)
      .notNull(),
    action: activityActionEnum("activity_action").notNull(),
    entityType: entityTypeEnum("entity_type").notNull(),
    entityId: text("entity_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("activity_user_created_idx").on(table.userId, table.createdAt),
  ],
);
