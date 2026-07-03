"use server";
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from "date-fns";
import { getSession } from "@/lib/auth-helpers";
import { db } from "@/db";
import { cards, categories, transactions } from "@/db/schema";
import { and, asc, desc, eq, count, between, sum, sql } from "drizzle-orm";

type DateFilter =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "lastWeek"
  | "thisMonth"
  | "lastMonth"
  | "thisYear";

type Query = {
  search?: string;
  sortBy?: "date" | "amount";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  type?: "expense" | "income";
  dateFilter?: DateFilter;
};

export const getTransactions = async (query: Query) => {
  const session = await getSession();
  if (!session || !session.user.id) {
    throw new Error("Unauthorized");
  }
  const { id } = session.user;
  const { sortBy, page, limit, type, order, dateFilter } = query;

  const sortableColumns = {
    date: transactions.date,
    amount: transactions.amount,
  };

  //  Dynamic Query Building

  const currentPage = page ?? 1;
  const pageSize = limit ?? 10;

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
          category: categories.name,
          subCategory: categories.parentId,
          date: transactions.date,
        })
        .from(transactions)
        .where(and(...conditions))
        .orderBy(orderFn(sortColumn))
        .leftJoin(categories, eq(transactions.categoryId, categories.id))
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

export const getMonthlyReportDataChart = async () => {
  const session = await getSession();
  if (!session || !session.user.id) {
    throw new Error("Unauthorized");
  }
  const { id } = session.user;
  const month = sql<string>`to_char(${transactions.date}, 'YYYY-MM')`;

  const income = sql<number>`
    sum(
      case
        when ${transactions.transactionType} = 'income'
        then ${transactions.amount}
        else 0
      end
    )
`;
  const expense = sql<number>`
    sum(
      case
        when ${transactions.transactionType} = 'expense'
        then ${transactions.amount}
        else 0
      end
    )
`;

  try {
    return await db
      .select({
        month,
        income,
        expense,
        balance: sql<number>`${income} - ${expense}`,
      })
      .from(transactions)
      .where(eq(transactions.userId, id))
      .groupBy(month)
      .orderBy(month);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
