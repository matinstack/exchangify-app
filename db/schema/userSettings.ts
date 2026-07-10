import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { user } from "@/db/schema/auth-schema";
import { currencyEnum } from "@/db/schema/cards";

export const languageEnum = pgEnum("language", ["en", "fa"]);

export const userSettings = pgTable("user_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  currency: currencyEnum("currency"),
  language: languageEnum("language").$default(() => "en"),
  timezone: text("timezone").notNull().default("Asia/Tehran"),
  theme: text("theme"),
});
