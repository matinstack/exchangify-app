"use server";
import { NewCardSchema, type NewCardSchemaType } from "@/schema/cards";
import { getSession } from "@/lib/auth-helpers";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { cards } from "@/db/schema";
import { updateTag } from "next/cache";

export const addNewCard = async (values: NewCardSchemaType) => {
  const session = await getSession();

  if (!session || !session.user.id) {
    throw new Error("Unauthorized! Please login again.");
  }
  // ُTODO: Balance Too large Number BUG
  const validatedFields = NewCardSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }
  const {
    cardNumber,
    cardColor,
    balance,
    bankName,
    optionalName,
    currency,
    cardType,
  } = validatedFields.data;

  const existingCard = await db
    .select({ id: cards.id })
    .from(cards)
    .where(eq(cards.cardNumber, cardNumber))
    .limit(1);

  if (existingCard.length > 0) {
    return { error: "You already have a card with this card number." };
  }

  try {
    await db.insert(cards).values({
      cardNumber,
      userId: session.user.id,
      cardColor,
      bankName,
      balance,
      customName: optionalName,
      type: cardType,
      currency,
    });

    updateTag(`cards:${session.user.id}`);

    return { success: "Card added successfully!" };
  } catch (err) {
    console.error("DB Insert Error", err);

    return {
      error:
        err instanceof Error
          ? `Database Error ${err.message}`
          : "An Unexpected database error occurred.",
    };
  }
};
