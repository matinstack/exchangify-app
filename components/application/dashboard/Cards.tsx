import { getDashboardCardsData } from "@/actions/dashboard/dashboard";
import CardsWrapper from "@/components/application/dashboard/cards/CardsWrapper";
import { formatCurrency } from "@/lib/format-currency";
import {
  WalletMinimal,
  TrendingUpIcon,
  TrendingDownIcon,
  BanknoteArrowUp,
  HandCoins,
} from "lucide-react";
import { late } from "zod/v3";
import { th } from "zod/v4/locales";

export type CardsData = {
  balance: string;
  thisMonthIncomes: string;
  lastMonthIncomes: string;
  thisMonthExpenses: string;
  lastMonthExpenses: string;
  defaultCurrency: string;
};

async function Cards() {
  const data = await getDashboardCardsData();
  if (!data.success) return;
  const cardsData = {
    balance: data.data.cardBalance,
    thisMonthIncomes: data.data.expenses.thisMonthIncomes,
    lastMonthIncomes: data.data.expenses.lastMonthIncomes,
    thisMonthExpenses: data.data.expenses.thisMonthExpenses,
    lastMonthExpenses: data.data.expenses.lastMonthExpenses,
    defaultCurrency: data.data.defaultCurrency,
  };
  console.log(cardsData.thisMonthIncomes);
  console.log(cardsData.lastMonthIncomes);
  function getPercentageChange(lastMonth: number, thisMonth: number) {
    if (lastMonth === 0) {
      return {
        percent: 0,
        increased: thisMonth > 0,
        comparable: false,
      };
    }

    const percent = ((thisMonth - lastMonth) / lastMonth) * 100;

    return {
      percent: Math.abs(percent),
      increased: percent >= 0,
      comparable: true,
    };
  }

  const expenseComparison = getPercentageChange(
    Number(cardsData.lastMonthExpenses),
    Number(cardsData.thisMonthExpenses),
  );

  const incomeComparison = getPercentageChange(
    Number(cardsData.lastMonthIncomes),
    Number(cardsData.thisMonthIncomes),
  );

  const expenseHasProfit = expenseComparison.increased;
  const incomeHasProfit = incomeComparison.increased;

  return (
    <ul className={"grid 2xl:grid-cols-4 md:grid-cols-2 gap-7 "}>
      <CardsWrapper
        type={"regularCard"}
        footer={""}
        footerIcon={""}
        icon={<WalletMinimal />}
        header={"Account Balance"}
        amount={formatCurrency(cardsData.balance, cardsData.defaultCurrency)}
        hasProfit
      />
      <CardsWrapper
        type={"regularCard"}
        footer={
          expenseComparison.comparable
            ? `${expenseComparison.percent.toFixed(1)}% ${
                expenseComparison.increased ? "more" : "less"
              } than last month`
            : "No data from last month"
        }
        footerIcon={<TrendingUpIcon />}
        icon={<HandCoins />}
        header={"Monthly Expenses"}
        amount={formatCurrency(
          cardsData.thisMonthExpenses,
          cardsData.defaultCurrency,
        )}
        hasProfit={expenseHasProfit}
      />
      <CardsWrapper
        type={"regularCard"}
        footer={
          incomeComparison.comparable
            ? `${incomeComparison.percent.toFixed(1)}% ${
                incomeComparison.increased ? "more" : "less"
              } than last month`
            : "No data from last month"
        }
        footerIcon={
          incomeComparison.increased ? <TrendingUpIcon /> : <TrendingDownIcon />
        }
        icon={<BanknoteArrowUp className="text-income!" />}
        header={"Monthly Incomes"}
        amount={formatCurrency(
          cardsData.thisMonthIncomes,
          cardsData.defaultCurrency,
        )}
        hasProfit={incomeHasProfit}
      />
      <CardsWrapper
        type={"regularCard"}
        footer={"6% more than last month"}
        footerIcon={<TrendingUpIcon />}
        icon={<WalletMinimal />}
        header={"Account Balance"}
        amount={"2"}
        hasProfit
      />
    </ul>
  );
}

export default Cards;
