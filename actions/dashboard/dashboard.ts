"use server";

import { getSession } from "@/lib/auth-helpers";
import { db } from "@/db";
import { cards, categories, transactions } from "@/db/schema";
import { and, eq, sum, sql, asc, or } from "drizzle-orm";
import { createAction } from "@/lib/errors/error-handler";

export const getDashboardCardsData = createAction(async () => {
  const session = await getSession();
  const id = session.user.id;

  const [expenses, cardBalance] = await Promise.all([
    db
      .select({
        thisMonthExpenses: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now()) AND ${transactions.transactionType} = 'expense' THEN ${transactions.amount} ELSE 0 END), 0)`,
        thisMonthIncomes: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now()) AND ${transactions.transactionType} = 'income' THEN ${transactions.amount} ELSE 0 END), 0)`,
        lastMonthExpenses: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now() - interval '1 month') AND ${transactions.transactionType} = 'expense' THEN ${transactions.amount} ELSE 0 END), 0)`,
        lastMonthIncomes: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now() - interval '1 month') AND ${transactions.transactionType} = 'income' THEN ${transactions.amount} ELSE 0 END), 0)`,
      })
      .from(transactions)
      .where(and(eq(transactions.userId, id))),

    db
      .select({ accountBalance: sum(cards.balance) })
      .from(cards)
      .where(and(eq(cards.userId, id))),
  ]);

  return {
    expenses,
    cardBalance,
  };
});

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

export const getTopCategoryChartData = async () => {
  const session = await getSession();
  if (!session || !session.user.id) {
    throw new Error("Unauthorized");
  }
  const { id } = session.user;

  try {
    return await db
      .select({
        category: categories.name,
        totalAmount: sum(transactions.amount),
      })
      .from(transactions)
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .where(
        and(
          eq(transactions.userId, id),
          eq(transactions.transactionType, "expense"),
        ),
      )
      .groupBy(categories.id, categories.name);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRecentTransactionsData = createAction(async () => {
  const session = await getSession();
  const id = session.user.id;

  const [transactionsData, categoriesData] = await Promise.all([
    db
      .select()
      .from(transactions)
      .where(and(eq(transactions.userId, id)))
      .orderBy(asc(transactions.date))
      .limit(5),

    db
      .select({
        id: categories.id,
        parentId: categories.parentId,
        name: categories.name,
        type: categories.type,
      })
      .from(categories)
      .where(or(eq(categories.userId, id), eq(categories.isDefault, true))),
  ]);

  return {
    transactionsData,
    categoriesData,
  };
});
