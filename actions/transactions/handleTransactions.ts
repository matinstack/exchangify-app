"use server";

import { db } from "@/db";
import { ActivityLog, cards, categories, transactions } from "@/db/schema";
import { todayCurrency } from "@/db/schema/todayCurrency";
import { getSession } from "@/lib/auth-helpers";
import { AppError } from "@/lib/errors/AppError";
import { createAction } from "@/lib/errors/error-handler";
import {
  NewTransactionSchema,
  NewTransactionsType,
} from "@/schema/transactions";
import { and, asc, eq, inArray, or, sql } from "drizzle-orm";
import { updateTag } from "next/cache";

export const handleTransaction = createAction(
  async (
    values: NewTransactionsType,
    type: "create" | "update",
    transactionId?: string,
  ) => {
    const session = await getSession();
    const { id } = session.user;

    const {
      cardId,
      subCategoryId,
      amount,
      date,
      transactionType,
      description,
      note,
    } = NewTransactionSchema.parse(values);

    const [cardCurrency] = await db
      .select({ currency: cards.currency })
      .from(cards)
      .where(and(eq(cards.userId, id), eq(cards.id, cardId)))
      .limit(1);

    await db.transaction(async (tx) => {
      const category = await tx
        .select({ id: categories.id })
        .from(categories)
        .where(
          or(
            and(eq(categories.id, subCategoryId), eq(categories.userId, id)),
            and(
              eq(categories.id, subCategoryId),
              eq(categories.isDefault, true),
            ),
          ),
        );

      if (category.length === 0) {
        throw new AppError("CATEGORY_NOT_FOUND");
      }

      if (type === "update") {
        if (!transactionId) {
          throw new AppError("FORBIDDEN");
        }

        const [previousTransaction] = await tx
          .select({
            previousRialAmount: transactions.rialAmount,
            previousUsdAmount: transactions.usdAmount,
            previousEuroAmount: transactions.euroAmount,
            previousType: transactions.transactionType,
            previousCardId: transactions.cardId,
            euroRatio: transactions.euroRatio,
            usdRatio: transactions.usdRatio,
            usdEuroRatio: transactions.usdEuroRatio,
            euroUsdRatio: transactions.euroUsdRatio,
          })
          .from(transactions)
          .where(
            and(
              eq(transactions.id, transactionId),
              eq(transactions.userId, id),
            ),
          );

        if (!previousTransaction) {
          throw new AppError("TRANSACTION_NOT_FOUND");
        }

        let previusAmount;
        let currency: "USD" | "EUR" | "IRR";

        if (cardCurrency.currency === "USD") {
          previusAmount = previousTransaction.previousUsdAmount;
          currency = "USD";
        } else if (cardCurrency.currency === "EUR") {
          previusAmount = previousTransaction.previousEuroAmount;
          currency = "EUR";
        } else {
          previusAmount = previousTransaction.previousRialAmount;
          currency = "IRR";
        }

        const oldAmount = Number(previusAmount);
        const newAmount = Number(amount);
        const previousType = previousTransaction.previousType;
        const previousCardId = previousTransaction.previousCardId;

        const oldEffect = previousType === "income" ? oldAmount : -oldAmount;
        const newEffect = transactionType === "income" ? newAmount : -newAmount;

        // همه‌ی کارت‌های درگیر (یکی یا دوتا) رو به ترتیب ثابت بر اساس id قفل می‌کنیم
        // تا صرف‌ نظر از جهت جابه‌جایی بین دو کارت، هیچ‌وقت deadlock رخ نده
        const cardIdsToLock = Array.from(
          new Set([cardId, previousCardId]),
        ).sort();

        const lockedCards = await tx
          .select({ id: cards.id, balance: cards.balance })
          .from(cards)
          .where(and(inArray(cards.id, cardIdsToLock), eq(cards.userId, id)))
          .orderBy(asc(cards.id))
          .for("update");

        const newCard = lockedCards.find((c) => c.id === cardId);
        const oldCard = lockedCards.find((c) => c.id === previousCardId);

        if (!newCard) {
          throw new AppError("CARD_NOT_FOUND");
        }
        if (!oldCard) {
          throw new AppError("CARD_NOT_FOUND");
        }

        if (previousCardId === cardId) {
          // کارت عوض نشده: اثر قدیم و جدید رو یک‌جا روی همون کارت اعمال می‌کنیم
          const diffEffect = newEffect - oldEffect;
          const projectedBalance = Number(newCard.balance) + diffEffect;

          if (projectedBalance < 0) {
            throw new AppError("INSUFFICIENT_FUNDS");
          }

          await tx
            .update(cards)
            .set({
              balance: sql`${cards.balance} + ${diffEffect}`,
            })
            .where(and(eq(cards.id, cardId), eq(cards.userId, id)));
        }
        //  else {
        //   // کارت عوض شده: اثر قدیم رو از کارت قدیم برمی‌گردونیم و اثر جدید رو روی کارت جدید اعمال می‌کنیم
        //   const oldCardProjected = Number(oldCard.balance) - oldEffect;
        //   const newCardProjected = Number(newCard.balance) + newEffect;

        //   if (oldCardProjected < 0 || newCardProjected < 0) {
        //     throw new AppError("INSUFFICIENT_FUNDS");
        //   }

        //   await Promise.all([
        //     tx
        //       .update(cards)
        //       .set({
        //         balance: sql`${cards.balance} - ${oldEffect}`,
        //       })
        //       .where(and(eq(cards.id, previousCardId), eq(cards.userId, id))),
        //     tx
        //       .update(cards)
        //       .set({
        //         balance: sql`${cards.balance} + ${newEffect}`,
        //       })
        //       .where(and(eq(cards.id, cardId), eq(cards.userId, id))),
        //   ]);
        // }

        let rialAmount;
        let euroAmount;
        let usdAmount;

        if (currency === "IRR") {
          rialAmount = amount;
          euroAmount = String(+amount / +previousTransaction.euroRatio);
          usdAmount = String(+amount / +previousTransaction.usdRatio);
        } else if (currency === "EUR") {
          rialAmount = String(+amount * +previousTransaction.euroRatio);
          euroAmount = amount;
          usdAmount = String(+amount * +previousTransaction.euroUsdRatio);
        } else {
          rialAmount = String(+amount * +previousTransaction.usdRatio);
          usdAmount = amount;
          euroAmount = String(+amount * +previousTransaction.usdEuroRatio);
        }

        await tx
          .update(transactions)
          .set({
            userId: id,
            cardId,
            rialAmount,
            euroAmount,
            usdAmount,
            categoryId: subCategoryId,
            transactionType,
            note,
            description,
            date,
          })
          .where(
            and(
              eq(transactions.id, transactionId),
              eq(transactions.userId, id),
            ),
          );
        await tx.insert(ActivityLog).values({
          userId: id,
          action: "transaction_updated",
          entityId: transactionId,
          entityType: "transaction",
          metadata: {
            oldAmount,
            newAmount,
            previousType,
            previousCardId,
            cardId,
            transactionType,
          },
        });
      } else {
        // ----- create -----
        const [card, todayCur] = await Promise.all([
          tx
            .select({ balance: cards.balance, cardCurrency: cards.currency })
            .from(cards)
            .where(and(eq(cards.id, cardId), eq(cards.userId, id)))
            .for("update"),

          tx.select().from(todayCurrency),
        ]);

        if (card.length === 0) {
          throw new AppError("CARD_NOT_FOUND");
        }

        if (
          transactionType === "expense" &&
          Number(card[0].balance) < Number(amount)
        ) {
          throw new AppError("INSUFFICIENT_FUNDS");
        }
        let rialAmount;
        let usdAmount;
        let euroAmount;
        const euroRatio = todayCur[0].euroRatio;
        const usdRatio = todayCur[0].usdRatio;
        const euroUsdRatio = todayCur[0].usdRatio;
        const usdEuroRatio = todayCur[0].usdRatio;

        if (card[0].cardCurrency === "EUR") {
          rialAmount = String(+amount * +euroRatio);
          euroAmount = amount;
          usdAmount = String(+amount * +euroUsdRatio);
        } else if (card[0].cardCurrency === "USD") {
          rialAmount = String(+amount * +usdRatio);
          usdAmount = amount;
          euroAmount = String(+amount * +usdEuroRatio);
        } else {
          rialAmount = amount;
          euroAmount = String(+amount / +euroRatio);
          usdAmount = String(+amount / +usdRatio);
        }

        const [transaction] = await tx
          .insert(transactions)
          .values({
            userId: id,
            cardId,
            rialAmount,
            euroAmount,
            usdAmount,
            euroRatio,

            usdRatio,
            euroUsdRatio,
            usdEuroRatio,
            categoryId: subCategoryId,
            transactionType,
            note,
            description,
            date,
          })
          .returning({ id: transactions.id });

        await tx
          .update(cards)
          .set({
            balance:
              transactionType === "income"
                ? sql`${cards.balance} + ${amount}`
                : sql`${cards.balance} - ${amount}`,
          })
          .where(and(eq(cards.id, cardId), eq(cards.userId, id)));

        await tx.insert(ActivityLog).values({
          userId: id,
          action: "transaction_created",
          entityId: transaction.id,
          entityType: "transaction",
          metadata: {
            amount,
            type: transactionType,
          },
        });
      }
    });

    updateTag(`transactions:${id}`);
    updateTag(`cards:${id}`);
    updateTag(`activity-log:${id}`);

    return {
      message:
        type === "update" ? "Transaction updated." : "Transaction created.",
    };
  },
);
