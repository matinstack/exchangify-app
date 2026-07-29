"use server";
import { NewCardSchema, type NewCardSchemaType } from "@/schema/cards";
import { getSession } from "@/lib/auth-helpers";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { ActivityLog, cards } from "@/db/schema";
import { updateTag } from "next/cache";
import { withAction } from "@/lib/errors/error-handler";
import { AppError } from "@/lib/errors/AppError";

export const addNewCard = withAction(async (values: NewCardSchemaType) => {
  console.log("ADD NEW CARD START");
  const session = await getSession();

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

  const existingCard = await db
    .select({ id: cards.id })
    .from(cards)
    .where(eq(cards.cardNumber, cardNumber))
    .limit(1);

  if (existingCard.length > 0) throw new AppError("CARD_ALREADY_EXISTS");

  await db.transaction(async (tx) => {
    const [card] = await tx
      .insert(cards)
      .values({
        cardNumber,
        userId: session.user.id,
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
      entityType: "account",
      entityId: card.id,
      metadata: {
        bankName,
        currency,
      },
    });
  });

  updateTag(`cards:${session.user.id}`);
  updateTag(`activity-log:${session.user.id}`);

  return { message: "Card added successfully!" };
});
