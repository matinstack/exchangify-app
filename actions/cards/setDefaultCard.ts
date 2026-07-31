"use server";

import { db } from "@/db";
import { ActivityLog, cards } from "@/db/schema";
import { getSession } from "@/lib/auth-helpers";
import { AppError } from "@/lib/errors/AppError";
import { createAction } from "@/lib/errors/error-handler";
import { and, eq, inArray } from "drizzle-orm";
import { updateTag } from "next/cache";

export const setDefaultCard = createAction(async (cardId: string) => {
  const session = await getSession();
  const id = session.user.id;

  const [card] = await db
    .select()
    .from(cards)
    .where(and(eq(cards.id, cardId), eq(cards.userId, id)));

  if (!card) {
    throw new AppError("CARD_NOT_FOUND");
  }

  await db.transaction(async (tx) => {
    await tx
      .update(cards)
      .set({ isDefault: false })
      .where(eq(cards.userId, id));

    await tx
      .update(cards)
      .set({ isDefault: true })
      .where(and(eq(cards.id, cardId), eq(cards.userId, id)));

    await tx.insert(ActivityLog).values({
      action: "card_updated",
      entityType: "card",
      userId: id,
      metadata: {
        desc: "Set card to default card",
      },
    });
  });

  updateTag(`cards:${session.user.id}`);

  return {
    message: "Card updated successfully",
  };
});
