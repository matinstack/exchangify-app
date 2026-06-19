import { users } from "./users";
import {
  pgTable,
  uuid,
  text,
  numeric,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const typeEnum = pgEnum("card_type", [
  "visa",
  "masterCard",
  "iranianBank",
  "cashWallet",
]);

export const cards = pgTable("cards", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  customName: text("custom_name"),
  bankName: text("bank_name").notNull(),
  balance: numeric("balance", { precision: 14, scale: 2 })
    .notNull()
    .default("0"),
  type: typeEnum("card_type").notNull(),
  currency: text("currency"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
