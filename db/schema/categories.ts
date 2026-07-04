import {
  boolean,
  foreignKey,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "@/db/schema/auth-schema";
import { transactionTypeEnum } from "@/db/schema/transactions";
import { debts } from "@/db/schema/depts";

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    type: transactionTypeEnum("type").notNull(),
    icon: text("icon"),
    isDefault: boolean("is_default").default(false).notNull(),
    parentId: uuid("parent_id"),
    name: text("name").notNull(),
    debtId: uuid("debt_id").references(() => debts.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => {
    return {
      parent: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
        name: "categories_parent_id_fk",
      }).onDelete("cascade"),
    };
  },
);
