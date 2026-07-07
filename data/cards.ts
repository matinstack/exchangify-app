import { db } from "@/db";
import { cards } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getCardsById = async (id: string) =>
  await db.select().from(cards).where(eq(cards.userId, id));
