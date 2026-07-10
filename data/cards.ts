import { cacheTag, cacheLife } from "next/cache";
import { db } from "@/db";
import { cards } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getCardsById = async (id: string) => {
  "use cache";
  cacheLife("days");
  cacheTag(`cards:${id}`);

  return db.select().from(cards).where(eq(cards.userId, id));
};
