import { serial } from "drizzle-orm/mysql-core";
import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const todayCurrency = pgTable("today_currency", {
  id: uuid("id").primaryKey().defaultRandom(),
  euroRatio: text("euro_ratio").notNull(),
  usdRatio: text("usd_ratio").notNull(),
  usdEuroRatio: text("usd_euro_ratio").notNull(),
  euroUsdRatio: text("euro_usd_ratio").notNull(),
});
