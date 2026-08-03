import {
  pgTable,
  uuid,
  pgEnum,
  text,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";
import { cards, currencyEnum } from "@/db/schema/cards";
import { user } from "@/db/schema/auth-schema";
import { categories } from "@/db/schema/categories";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "expense",
]);

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  cardId: uuid("card_id")
    .notNull()
    .references(() => cards.id, { onDelete: "set null" }),
  rialAmount: numeric("rial_amount", { scale: 2, precision: 14 }).notNull(),
  usdAmount: numeric("usd_amount", { scale: 2, precision: 14 }).notNull(),
  euroAmount: numeric("euro_amount", { scale: 2, precision: 14 }).notNull(),
  euroRatio: text("euro_ratio").notNull(),
  usdRatio: text("usd_ratio").notNull(),
  usdEuroRatio: text("usd_euro_ratio").notNull(),
  euroUsdRatio: text("euro_usd_ratio").notNull(),
  transactionType: transactionTypeEnum("transaction_type").notNull(),
  categoryId: uuid("category_id")
    .references(() => categories.id, { onDelete: "set null" })
    .notNull(),
  date: timestamp("date").notNull(),
  note: text("note"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type TransactionsType = typeof transactions.$inferSelect;
