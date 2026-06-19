import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { users } from "@/db/schema/users";

export const currencyEnum = pgEnum("currency", [
  "IRR", // Iranian Rial
  "USD", // US Dollar
  "EUR", // Euro
  "GBP", // British Pound
  "AED", // UAE Dir-ham
  "TRY", // Turkish Lira
]);

export const languageEnum = pgEnum("language", ["en", "fa"]);

export const userSettings = pgTable("user_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("id").references(() => users.id),
  currency: currencyEnum("currency"),
  language: languageEnum("language").$default(() => "en"),
  timezone: text("timezone").notNull().default("Asia/Tehran"),
  theme: text("theme"),
});
