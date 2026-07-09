import { db } from "@/db";
import { categories } from "@/db/schema";
import { isNull } from "drizzle-orm";

export const getMainCategories = async () =>
  await db
    .select({ id: categories.id, name: categories.name, type: categories.type })
    .from(categories)
    .where(isNull(categories.parentId));

export type MainCategories = Awaited<ReturnType<typeof getMainCategories>>;
