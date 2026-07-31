"use server";

import { db } from "@/db";
import { ActivityLog, cards } from "@/db/schema";
import { getSession } from "@/lib/auth-helpers";
import { AppError } from "@/lib/errors/AppError";
import { createAction } from "@/lib/errors/error-handler";
import { and, eq } from "drizzle-orm";
import { updateTag } from "next/cache";

export const deleteCardAction = createAction(async (cardId: string) => {
  const session = await getSession();

  const [card] = await db
    .select()
    .from(cards)
    .where(and(eq(cards.id, cardId), eq(cards.userId, session.user.id)));

  if (!card) {
    throw new AppError("CARD_NOT_FOUND");
  }

  await db.transaction(async (tx) => {
    await tx
      .delete(cards)
      .where(and(eq(cards.id, cardId), eq(cards.userId, session.user.id)));

    await tx.insert(ActivityLog).values({
      action: "card_deleted",
      entityType: "card",
      userId: session.user.id,
      metadata: {
        cardName: card.customName ?? "",
        bankName: card.bankName,
        createdAt: card.createdAt?.toISOString(),
        cardId: card.id,
        lastFourDigits: card.cardNumber.slice(-4),
      },
    });
  });

  updateTag(`cards:${session.user.id}`);
  updateTag(`activity-log:${session.user.id}`);

  return {
    message: "Your card has been deleted successfully.",
  };
});
