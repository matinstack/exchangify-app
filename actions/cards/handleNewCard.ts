"use server";
import { NewCardSchema, type NewCardSchemaType } from "@/schema/cards";
import { getSession } from "@/lib/auth-helpers";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { ActivityLog, cards } from "@/db/schema";
import { updateTag } from "next/cache";
import { createAction } from "@/lib/errors/error-handler";
import { AppError } from "@/lib/errors/AppError";

export const handleNewCard = createAction(
  async (
    values: NewCardSchemaType,
    type: "create" | "update",
    cardId?: string,
  ) => {
    const session = await getSession();
    const id = session.user.id;

    // TODO: Balance Too large Number BUG

    const {
      cardNumber,
      cardColor,
      balance,
      bankName,
      optionalName,
      currency,
      cardType,
    } = NewCardSchema.parse(values);

    if (type === "update") {
      if (!cardId) throw new AppError("CARD_NOT_FOUND");

      await db.transaction(async (tx) => {
        await tx
          .update(cards)
          .set({
            cardNumber,
            cardColor,
            balance,
            bankName,
            customName: optionalName,
            currency,
            type: cardType,
          })
          .where(and(eq(cards.id, cardId), eq(cards.userId, session.user.id)));

        await tx.insert(ActivityLog).values({
          action: "card_updated",
          entityType: "card",
          userId: id,
          metadata: {
            cardId,
            cardNumber,
          },
        });
      });
    } else {
      const existingCard = await db
        .select({ id: cards.id })
        .from(cards)
        .where(and(eq(cards.cardNumber, cardNumber), eq(cards.userId, id)))
        .limit(1);

      if (existingCard.length > 0) throw new AppError("CARD_ALREADY_EXISTS");

      await db.transaction(async (tx) => {
        const [card] = await tx
          .insert(cards)
          .values({
            cardNumber,
            userId: id,
            cardColor,
            bankName,
            balance,
            customName: optionalName,
            type: cardType,
            currency,
          })
          .returning({ id: cards.id });

        await tx.insert(ActivityLog).values({
          userId: session.user.id,
          action: "card_created",
          entityType: "card",
          entityId: card.id,
          metadata: {
            bankName,
            currency,
          },
        });
      });
    }

    const message =
      type === "create"
        ? "Card added successfully!"
        : "Card Updated Successfuly";

    updateTag(`cards:${session.user.id}`);
    updateTag(`activity-log:${session.user.id}`);

    return { message };
  },
);
