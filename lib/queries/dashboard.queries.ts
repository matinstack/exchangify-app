import { getSession } from "@/lib/auth-helpers";
import { db } from "@/db";
import { cards, categories, transactions, userSettings } from "@/db/schema";
import { and, asc, eq, or, sql } from "drizzle-orm";
import { createAction } from "@/lib/errors/error-handler";
import { AppError } from "@/lib/errors/AppError";
import { todayCurrency } from "@/db/schema/todayCurrency";

export const getDashboardCardsData = createAction(async () => {
  const session = await getSession();
  const id = session.user.id;

  const defaultCurrency = await db
    .select({ currency: userSettings.currency })
    .from(userSettings)
    .where(eq(userSettings.userId, id));

  if (defaultCurrency.length === 0) throw new AppError("INTERNAL_ERROR");

  const [expensesAndIncomes, cardsBalance, todayCur] = await Promise.all([
    db
      .select({
        thisMonthUsdExpenses: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now()) AND ${transactions.transactionType} = 'expense' THEN ${transactions.usdAmount} ELSE 0 END), 0)`,
        thisMonthUsdIncomes: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now()) AND ${transactions.transactionType} = 'income' THEN ${transactions.usdAmount} ELSE 0 END), 0)`,
        lastMonthUsdExpenses: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now() - interval '1 month') AND ${transactions.transactionType} = 'expense' THEN ${transactions.usdAmount} ELSE 0 END), 0)`,
        lastMonthUsdIncomes: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now() - interval '1 month') AND ${transactions.transactionType} = 'income' THEN ${transactions.usdAmount} ELSE 0 END), 0)`,

        thisMonthEuroExpenses: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now()) AND ${transactions.transactionType} = 'expense' THEN ${transactions.euroAmount} ELSE 0 END), 0)`,
        thisMonthEuroIncomes: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now()) AND ${transactions.transactionType} = 'income' THEN ${transactions.euroAmount} ELSE 0 END), 0)`,
        lastMonthEuroExpenses: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now() - interval '1 month') AND ${transactions.transactionType} = 'expense' THEN ${transactions.euroAmount} ELSE 0 END), 0)`,
        lastMonthEuroIncomes: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now() - interval '1 month') AND ${transactions.transactionType} = 'income' THEN ${transactions.euroAmount} ELSE 0 END), 0)`,

        thisMonthRialExpenses: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now()) AND ${transactions.transactionType} = 'expense' THEN ${transactions.rialAmount} ELSE 0 END), 0)`,
        thisMonthRialIncomes: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now()) AND ${transactions.transactionType} = 'income' THEN ${transactions.rialAmount} ELSE 0 END), 0)`,
        lastMonthRialExpenses: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now() - interval '1 month') AND ${transactions.transactionType} = 'expense' THEN ${transactions.rialAmount} ELSE 0 END), 0)`,
        lastMonthRialIncomes: sql<number>`COALESCE(SUM(CASE WHEN date_trunc('month', ${transactions.createdAt}) = date_trunc('month', now() - interval '1 month') AND ${transactions.transactionType} = 'income' THEN ${transactions.rialAmount} ELSE 0 END), 0)`,
      })
      .from(transactions)
      .where(and(eq(transactions.userId, id))),

    db
      .select({
        usdBalance: sql<number>`COALESCE(SUM(CASE WHEN ${cards.currency} = 'USD' THEN ${cards.balance} ELSE 0 END), 0)`,
        euroBalance: sql<number>`COALESCE(SUM(CASE WHEN ${cards.currency} = 'EUR' THEN ${cards.balance} ELSE 0 END), 0)`,
        rialBalance: sql<number>`COALESCE(SUM(CASE WHEN ${cards.currency} = 'IRR' THEN ${cards.balance} ELSE 0 END), 0)`,
      })
      .from(cards)
      .where(and(eq(cards.userId, id))),

    db.select().from(todayCurrency),
  ]);

  const N = (val: any) => Number(val) || 0;

  const cur = todayCur[0];
  const exp = expensesAndIncomes[0];
  const bal = cardsBalance[0];

  let accountBalance = 0;
  let expenses = {
    thisMonthExpenses: 0,
    thisMonthIncomes: 0,
    lastMonthExpenses: 0,
    lastMonthIncomes: 0,
  };

  const currentCurrency = defaultCurrency[0].currency;

  // ۱. محاسبه موجودی کارت‌ها (کارت‌ها ارزهای متفاوت دارند پس باید به ارز پیش‌فرض تبدیل شوند)
  if (currentCurrency === "USD") {
    accountBalance =
      N(bal.rialBalance) / N(cur.usdRatio) +
      N(bal.usdBalance) +
      N(bal.euroBalance) * N(cur.euroUsdRatio);
  } else if (currentCurrency === "EUR") {
    accountBalance =
      N(bal.rialBalance) / N(cur.euroRatio) +
      N(bal.usdBalance) * N(cur.usdEuroRatio) +
      N(bal.euroBalance);
  } else {
    // IRR
    accountBalance =
      N(bal.rialBalance) +
      N(bal.usdBalance) * N(cur.usdRatio) +
      N(bal.euroBalance) * N(cur.euroRatio);
  }

  // ۲. محاسبه هزینه‌ها و درآمدها (مستقیماً ستون ارز مربوطه خوانده می‌شود)
  if (currentCurrency === "USD") {
    expenses = {
      thisMonthExpenses: N(exp.thisMonthUsdExpenses),
      thisMonthIncomes: N(exp.thisMonthUsdIncomes),
      lastMonthExpenses: N(exp.lastMonthUsdExpenses),
      lastMonthIncomes: N(exp.lastMonthUsdIncomes),
    };
  } else if (currentCurrency === "EUR") {
    expenses = {
      thisMonthExpenses: N(exp.thisMonthEuroExpenses),
      thisMonthIncomes: N(exp.thisMonthEuroIncomes),
      lastMonthExpenses: N(exp.lastMonthEuroExpenses),
      lastMonthIncomes: N(exp.lastMonthEuroIncomes),
    };
  } else {
    // IRR
    expenses = {
      thisMonthExpenses: N(exp.thisMonthRialExpenses),
      thisMonthIncomes: N(exp.thisMonthRialIncomes),
      lastMonthExpenses: N(exp.lastMonthRialExpenses),
      lastMonthIncomes: N(exp.lastMonthRialIncomes),
    };
  }

  return {
    expenses,
    cardBalance: accountBalance,
    defaultCurrency: currentCurrency,
  };
});
export const getMonthlyReportDataChart = async () => {
  // const session = await getSession();
  //   if (!session || !session.user.id) {
  //     throw new Error("Unauthorized");
  //   }
  //   const { id } = session.user;
  //   const month = sql<string>`to_char(${transactions.date}, 'YYYY-MM')`;
  //   const income = sql<number>`
  //     sum(
  //       case
  //         when ${transactions.transactionType} = 'income'
  //         then ${transactions.amount}
  //         else 0
  //       end
  //     )
  // `;
  //   const expense = sql<number>`
  //     sum(
  //       case
  //         when ${transactions.transactionType} = 'expense'
  //         then ${transactions.amount}
  //         else 0
  //       end
  //     )
  // `;
  //   try {
  //     return await db
  //       .select({
  //         month,
  //         income,
  //         expense,
  //         balance: sql<number>`${income} - ${expense}`,
  //       })
  //       .from(transactions)
  //       .where(eq(transactions.userId, id))
  //       .groupBy(month)
  //       .orderBy(month);
  //   } catch (err) {
  //     console.error(err);
  //     throw err;
  //   }
};

export const getTopCategoryChartData = async () => {
  // const session = await getSession();
  // if (!session || !session.user.id) {
  //   throw new Error("Unauthorized");
  // }
  // const { id } = session.user;
  // try {
  //   return await db
  //     .select({
  //       category: categories.name,
  //       totalAmount: sum(transactions.amount),
  //     })
  //     .from(transactions)
  //     .leftJoin(categories, eq(transactions.categoryId, categories.id))
  //     .where(
  //       and(
  //         eq(transactions.userId, id),
  //         eq(transactions.transactionType, "expense"),
  //       ),
  //     )
  //     .groupBy(categories.id, categories.name);
  // } catch (err) {
  //   console.error(err);
  //   throw err;
  // }
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

  if (!transactionsData || !categoriesData)
    throw new AppError("INTERNAL_ERROR");
  return {
    transactionsData,
    categoriesData,
  };
});
