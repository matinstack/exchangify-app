"use server";

import { getSession } from "@/lib/auth-helpers";
import { db } from "@/db";
import { categories, transactions } from "@/db/schema";
import { and, eq, sum, sql } from "drizzle-orm";

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
