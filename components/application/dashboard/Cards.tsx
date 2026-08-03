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
  console.log(formatCurrency(cardsData.balance, cardsData.defaultCurrency));
  return (
    <ul className={"grid 2xl:grid-cols-4 md:grid-cols-2 gap-7 "}>
      <CardsWrapper
        type={"regularCard"}
        footer={"6% more than last month"}
        footerIcon={<TrendingUpIcon />}
        icon={<WalletMinimal />}
        header={"Account Balance"}
        amount={formatCurrency(cardsData.balance, cardsData.defaultCurrency)}
        hasProfit
      />
      <CardsWrapper
        type={"regularCard"}
        footer={"2% less than last month"}
        footerIcon={<TrendingUpIcon />}
        icon={<HandCoins />}
        header={"Monthly Expenses"}
        amount={formatCurrency(
          cardsData.thisMonthExpenses,
          cardsData.defaultCurrency,
        )}
        hasProfit
      />
      <CardsWrapper
        type={"regularCard"}
        footer={"6% more than last month"}
        footerIcon={<TrendingDownIcon />}
        icon={<BanknoteArrowUp />}
        header={"Monthly Incomes"}
        amount={formatCurrency(
          cardsData.thisMonthIncomes,
          cardsData.defaultCurrency,
        )}
        hasProfit={false}
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
