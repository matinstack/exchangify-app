"use server";

import { db } from "@/db";
import { ActivityLog, cards, transactions } from "@/db/schema";
import { getSession } from "@/lib/auth-helpers";
import { AppError } from "@/lib/errors/AppError";
import { createAction } from "@/lib/errors/error-handler";
import { and, eq, sql } from "drizzle-orm";
import { updateTag } from "next/cache";

export const deleteTransactionById = createAction(
  async (transactionId: string) => {
    const session = await getSession();
    const userId = session.user.id;

    const res = await db.transaction(async (tx) => {
      const transaction = await tx
        .select({
          id: transactions.id,
          rialAmount: transactions.rialAmount,
          usdAmount: transactions.usdAmount,
          euroAmount: transactions.euroAmount,
          transactionType: transactions.transactionType,
          cardId: transactions.cardId,
        })
        .from(transactions)
        .where(
          and(
            eq(transactions.id, transactionId),
            eq(transactions.userId, userId),
          ),
        )
        .limit(1);

      if (transaction.length === 0) {
        throw new AppError("TRANSACTION_NOT_FOUND");
      }

      const { euroAmount, rialAmount, usdAmount, transactionType, cardId } =
        transaction[0];

      const card = await tx
        .select({
          balance: cards.balance,
          cardCurrency: cards.currency,
        })
        .from(cards)
        .where(and(eq(cards.id, cardId), eq(cards.userId, userId)))
        .for("update")
        .limit(1);

      if (card.length === 0) {
        throw new AppError("CARD_NOT_FOUND");
      }
      let amount;
      if (card[0]?.cardCurrency === "USD") amount = usdAmount;
      if (card[0]?.cardCurrency === "EUR") amount = euroAmount;
      if (card[0]?.cardCurrency === "IRR") amount = rialAmount;

      // برگردوندن اثر تراکنش: اگه income بود، حذفش یعنی بالانس کم می‌شه؛
      // اگه بالانس بعد از کم‌کردن منفی می‌شه، اجازه‌ی حذف نده
      if (
        transactionType === "income" &&
        Number(card[0].balance) < Number(amount)
      ) {
        throw new AppError("INSUFFICIENT_FUNDS");
      }

      await tx.delete(transactions).where(eq(transactions.id, transactionId));

      await tx
        .update(cards)
        .set({
          balance:
            transactionType === "income"
              ? sql`${cards.balance} - ${amount}`
              : sql`${cards.balance} + ${amount}`,
        })
        .where(and(eq(cards.id, cardId), eq(cards.userId, userId)));

      await tx.insert(ActivityLog).values({
        userId: userId,
        action: "transaction_deleted",
        entityId: transactionId,
        entityType: "transaction",
        metadata: {
          amount,
          type: transactionType,
        },
      });

      return {
        message: "Transaction Successfully deleted.",
      };
    });

    updateTag(`activity-log:${userId}`);
    updateTag(`transactions:${userId}`);
    updateTag(`cards:${userId}`);

    return res;
  },
);
