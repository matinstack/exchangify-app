"use server";
import {
  NewTransactionSchema,
  type NewTransactionsType,
} from "@/schema/transactions";
import { db } from "@/db";
import { cards, categories, transactions } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";

export const newTransaction = async (values: NewTransactionsType) => {
  const session = await getSession();
  if (!session || !session.user.id) {
    throw new Error("Unauthorized!");
  }
  const { id } = session.user;

  const validatedFields = NewTransactionSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Fields",
    };
  }
  const {
    cardId,
    categoryId,
    amount,
    date,
    transactionType,
    description,
    note,
  } = validatedFields.data;

  try {
    const [validCard, validCategory] = await Promise.all([
      db
        .select()
        .from(cards)
        .where(and(eq(cards.id, cardId), eq(cards.userId, id))),

      db
        .select()
        .from(categories)
        .where(and(eq(categories.id, categoryId), eq(categories.userId, id))),
    ]);

    if (validCard.length === 0) {
      return { error: "Invalid Card" };
    }
    if (validCategory.length === 0) {
      return { error: "Invalid category" };
    }

    // TODO Check See if card reaches maximum allowed Inventory value

    await db.insert(transactions).values({
      userId: id,
      cardId,
      amount,
      categoryId,
      transactionType,
      note,
      description,
      date,
    });

    revalidatePath("/app");

    return {
      success: "Success",
    };
  } catch (err) {
    console.error(err);

    return {
      error:
        err instanceof Error
          ? `Database Error ${err.message}`
          : "An Unexpected database error occurred.",
    };
  }
};
