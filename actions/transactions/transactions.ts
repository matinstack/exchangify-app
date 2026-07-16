"use server";
import { db } from "@/db";
import { cards, categories, transactions } from "@/db/schema";
import {
  and,
  eq,
  or,
  asc,
  desc,
  between,
  count,
  sql,
  inArray,
} from "drizzle-orm";
import { getSession } from "@/lib/auth-helpers";
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from "date-fns";
import { alias } from "drizzle-orm/pg-core";

const parentCategory = alias(categories, "parentCategory");

export type DateFilter =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "lastWeek"
  | "thisMonth"
  | "lastMonth"
  | "thisYear";

export type Query = {
  search?: string;
  sortBy?: "date" | "amount";
  order?: "asc" | "desc";
  page?: string;
  limit?: string;
  type?: "expense" | "income";
  dateFilter?: DateFilter;
};

import {
  NewTransactionSchema,
  type NewTransactionsType,
} from "@/schema/transactions";
import { cacheLife, cacheTag, updateTag } from "next/cache";

async function getTransactionsCached(userId: string, query: Query) {
  "use cache";

  cacheLife("minutes");
  cacheTag(`transactions:${userId}`);

  const { sortBy, page, limit, type, order, dateFilter } = query;
  const sortableColumns = {
    date: transactions.date,
    amount: transactions.amount,
  };

  //  Dynamic Query Building

  const currentPage = page ? Number(page) : 1;
  const pageSize = limit ? Number(limit) : 10;

  const offset = (currentPage - 1) * pageSize;
  const sortColumn = sortableColumns[sortBy ?? "date"];

  const orderFn = order === "asc" ? asc : desc;

  const conditions = [eq(transactions.userId, userId)];

  if (type) {
    conditions.push(eq(transactions.transactionType, type));
  }
  const now = new Date();

  if (dateFilter === "today") {
    const start = startOfDay(now);
    const end = endOfDay(now);

    conditions.push(between(transactions.date, start, end));
  } else if (dateFilter === "thisWeek") {
    const start = startOfWeek(now);
    const end = endOfWeek(now);

    conditions.push(between(transactions.date, start, end));
  }

  try {
    const [data, totalResult] = await Promise.all([
      db
        .select({
          id: transactions.id,
          cardId: transactions.cardId,
          amount: transactions.amount,
          type: transactions.transactionType,
          note: transactions.note,
          description: transactions.description,
          bankName: cards.bankName,
          cardNumber: cards.cardNumber,
          category: parentCategory.name,
          categoryId: parentCategory.id,
          subCategory: categories.name,
          subCategoryId: categories.id,
          date: transactions.date,
        })
        .from(transactions)
        .where(and(...conditions))
        .orderBy(orderFn(sortColumn))
        .leftJoin(categories, eq(transactions.categoryId, categories.id))
        .leftJoin(parentCategory, eq(categories.parentId, parentCategory.id))
        .leftJoin(cards, eq(transactions.cardId, cards.id))
        .limit(pageSize)
        .offset(offset),

      db
        .select({ count: count() })
        .from(transactions)
        .where(and(...conditions)),
    ]);
    const total = Number(totalResult[0].count);
    const totalPages = Math.ceil(total / pageSize);

    return {
      data,

      pagination: {
        total,
        page: currentPage,
        limit: pageSize,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const getTransactions = async (query: Query) => {
  const session = await getSession();
  if (!session || !session.user.id) {
    throw new Error("Unauthorized! Please login again.");
  }

  return getTransactionsCached(session.user.id, query);
};

export const handleTransaction = async (
  values: NewTransactionsType,
  type: "create" | "update",
  transactionId?: string,
) => {
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
    subCategoryId,
    amount,
    date,
    transactionType,
    description,
    note,
  } = validatedFields.data;

  try {
    await db.transaction(async (tx) => {
      const category = await tx
        .select()
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
        throw new Error("Category not found");
      }

      if (type === "update") {
        if (!transactionId) {
          throw new Error("Something went wrong");
        }

        const [previousTransaction] = await tx
          .select({
            previousAmount: transactions.amount,
            previousType: transactions.transactionType,
            previousCardId: transactions.cardId,
          })
          .from(transactions)
          .where(
            and(
              eq(transactions.id, transactionId),
              eq(transactions.userId, id),
            ),
          );

        if (!previousTransaction) {
          throw new Error("Transaction not found");
        }

        const oldAmount = Number(previousTransaction.previousAmount);
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
          throw new Error("Card not found");
        }
        if (!oldCard) {
          throw new Error("Previous card not found");
        }

        if (previousCardId === cardId) {
          // کارت عوض نشده: اثر قدیم و جدید رو یک‌جا روی همون کارت اعمال می‌کنیم
          const diffEffect = newEffect - oldEffect;
          const projectedBalance = Number(newCard.balance) + diffEffect;

          if (projectedBalance < 0) {
            throw new Error("INSUFFICIENT_BALANCE");
          }

          await tx
            .update(cards)
            .set({
              balance: sql`${cards.balance} + ${diffEffect}`,
            })
            .where(and(eq(cards.id, cardId), eq(cards.userId, id)));
        } else {
          // کارت عوض شده: اثر قدیم رو از کارت قدیم برمی‌گردونیم و اثر جدید رو روی کارت جدید اعمال می‌کنیم
          const oldCardProjected = Number(oldCard.balance) - oldEffect;
          const newCardProjected = Number(newCard.balance) + newEffect;

          if (oldCardProjected < 0 || newCardProjected < 0) {
            throw new Error("INSUFFICIENT_BALANCE");
          }

          await Promise.all([
            tx
              .update(cards)
              .set({
                balance: sql`${cards.balance} - ${oldEffect}`,
              })
              .where(and(eq(cards.id, previousCardId), eq(cards.userId, id))),
            tx
              .update(cards)
              .set({
                balance: sql`${cards.balance} + ${newEffect}`,
              })
              .where(and(eq(cards.id, cardId), eq(cards.userId, id))),
          ]);
        }

        await tx
          .update(transactions)
          .set({
            userId: id,
            cardId,
            amount,
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

        return;
      }

      // ----- create -----
      const [card] = await tx
        .select({ balance: cards.balance })
        .from(cards)
        .where(and(eq(cards.id, cardId), eq(cards.userId, id)))
        .for("update");

      if (!card) {
        throw new Error("Card not found");
      }

      if (
        transactionType === "expense" &&
        Number(card.balance) < Number(amount)
      ) {
        throw new Error("INSUFFICIENT_BALANCE");
      }

      await tx.insert(transactions).values({
        userId: id,
        cardId,
        amount,
        categoryId: subCategoryId,
        transactionType,
        note,
        description,
        date,
      });

      await tx
        .update(cards)
        .set({
          balance:
            transactionType === "income"
              ? sql`${cards.balance} + ${amount}`
              : sql`${cards.balance} - ${amount}`,
        })
        .where(and(eq(cards.id, cardId), eq(cards.userId, id)));
    });

    updateTag(`transactions:${id}`);
    updateTag(`cards:${id}`);

    return {
      success:
        type === "update" ? "Transaction updated." : "Transaction created.",
    };
  } catch (err) {
    console.error(err);
    if (err instanceof Error && err.message === "INSUFFICIENT_BALANCE") {
      return {
        error: "Not enough balance",
      };
    }
    return {
      error:
        err instanceof Error
          ? `Database Error ${err.message}`
          : "An Unexpected database error occurred.",
    };
  }
};

export const deleteTransactionById = async (transactionId: string) => {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized!");
  }

  const userId = session.user.id;

  try {
    const res = await db.transaction(async (tx) => {
      const transaction = await tx
        .select({
          id: transactions.id,
          amount: transactions.amount,
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
        return {
          error: "Transaction not found",
        };
      }

      const { amount, transactionType, cardId } = transaction[0];

      const card = await tx
        .select({
          balance: cards.balance,
        })
        .from(cards)
        .where(and(eq(cards.id, cardId), eq(cards.userId, userId)))
        .for("update")
        .limit(1);

      if (card.length === 0) {
        return {
          error: "Card not found",
        };
      }

      // برگردوندن اثر تراکنش: اگه income بود، حذفش یعنی بالانس کم می‌شه؛
      // اگه بالانس بعد از کم‌کردن منفی می‌شه، اجازه‌ی حذف نده
      if (
        transactionType === "income" &&
        Number(card[0].balance) < Number(amount)
      ) {
        return {
          error: "Not enough balance",
        };
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

      return {
        success: "Transaction deleted",
      };
    });

    if ("error" in res) {
      return res;
    }

    updateTag(`transactions:${userId}`);
    updateTag(`cards:${userId}`);

    return res;
  } catch (err) {
    console.error(err);

    return {
      error:
        err instanceof Error
          ? `Database Error: ${err.message}`
          : "Unexpected database error occurred",
    };
  }
};
