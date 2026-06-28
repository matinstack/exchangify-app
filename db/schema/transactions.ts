import {
  pgTable,
  uuid,
  pgEnum,
  text,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";
import { cards } from "@/db/schema/cards";
import { user } from "@/db/schema/auth-schema";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "expense",
]);

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  cardId: uuid("card_id")
    .notNull()
    .references(() => cards.id, { onDelete: "cascade" }),
  amount: numeric("amount", { scale: 2, precision: 14 }).notNull(),
  transactionType: transactionTypeEnum("transaction_type").notNull(),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
