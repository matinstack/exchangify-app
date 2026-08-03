import { isDeltaZero } from "framer-motion";
import { user } from "./auth-schema";
import {
  pgTable,
  uuid,
  text,
  numeric,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const cardTypeEnum = pgEnum("card_type", [
  "visa",
  "masterCard",
  "iranianBank",
]);

export const currencyEnum = pgEnum("currency", [
  "IRR", // ریال ایران
  "EUR", // یورو
  "USD", // دلار آمریکا
]);
export const cards = pgTable("cards", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  customName: text("custom_name"),
  bankName: text("bank_name").notNull(),
  balance: numeric("balance", { precision: 14, scale: 2 })
    .notNull()
    .default("0"),
  type: cardTypeEnum("card_type").notNull(),
  cardNumber: text("card_number").unique().notNull(),
  cardColor: text("card_color").notNull(),
  currency: currencyEnum("currency").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isDefault: boolean("is_default").notNull().default(false),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export type CardsType = typeof cards.$inferSelect;
