import {
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { user } from "@/db/schema/auth-schema";

export const debtTypeEnum = pgEnum("debt_type", ["loan", "debt"]);
export const debtStatusEnum = pgEnum("debt_status", ["active", "paid"]);

export const debts = pgTable("debts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => user.id)
    .notNull(),
  name: text("name"),
  deptType: debtTypeEnum("debt_type").notNull(),
  amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
  interestRate: text("interest_rate"),
  totalAmount: numeric("total_amount", { precision: 14, scale: 2 }),
  remainingAmount: numeric("remaining_amount", { precision: 14, scale: 2 }),
  startDate: timestamp("start_date").notNull(),
  dueDate: timestamp("due_date").notNull(),
  status: debtStatusEnum("debt_status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
