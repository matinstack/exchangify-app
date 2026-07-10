"use server";
import { db } from "@/db";
import { cards, categories, transactions } from "@/db/schema";
import { and, eq, or, asc, desc, between, count } from "drizzle-orm";
import { getSession } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";
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

export const getTransactions = async (query: Query) => {
  const session = await getSession();
  if (!session || !session.user.id) {
    throw new Error("Unauthorized! Please login again.");
  }
  const { id } = session.user;
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

  const conditions = [eq(transactions.userId, id)];

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
          amount: transactions.amount,
          type: transactions.transactionType,
          bankName: cards.bankName,
          cardNumber: cards.cardNumber,
          category: parentCategory.name,
          subCategory: categories.name,
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
};

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
    subCategoryId,
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
        .where(
          or(
            and(eq(categories.id, subCategoryId), eq(categories.userId, id)),
            and(
              eq(categories.id, subCategoryId),
              eq(categories.isDefault, true),
            ),
          ),
        ),
    ]);
    console.log(validCategory);
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
      categoryId: subCategoryId,
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
