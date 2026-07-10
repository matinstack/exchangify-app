import { db } from "@/db";
import { cards, categories } from "@/db/schema";
import { and, eq, isNotNull, isNull, or } from "drizzle-orm";

export const getNewTransactionDataByUserId = async (id: string) => {
  try {
    const [cardsData, categoriesData, subCategories] = await Promise.all([
      db
        .select({
          id: cards.id,
          currency: cards.currency,
          name: cards.bankName,
          number: cards.cardNumber,
        })
        .from(cards)
        .where(eq(cards.userId, id)),

      db
        .select({
          id: categories.id,
          name: categories.name,
          type: categories.type,
        })
        .from(categories)
        .where(
          and(
            or(eq(categories.userId, id), eq(categories.isDefault, true)),
            isNull(categories.parentId),
          ),
        ),

      db
        .select({
          id: categories.id,
          parentId: categories.parentId,
          name: categories.name,
          type: categories.type,
        })
        .from(categories)
        .where(
          and(
            or(eq(categories.userId, id), eq(categories.isDefault, true)),
            isNotNull(categories.parentId),
          ),
        ),
    ]);

    return {
      cards: cardsData,
      categories: categoriesData,
      subCategories,
      success: true,
    };
  } catch (err) {
    console.error(err);
    return { cards: [], categories: [], subCategories: [], success: false };
  }
};
