import { getDashboardCardsData } from "@/actions/dashboard/dashboard";
import CardsWrapper from "@/components/application/dashboard/cards/CardsWrapper";
import {
  WalletMinimal,
  TrendingUpIcon,
  TrendingDownIcon,
  BanknoteArrowUp,
  HandCoins,
} from "lucide-react";

export type CardsData = {
  balance: string;
  income: {
    thisMonth: string;
    lastMonth: string;
  };
  expense: {
    thisMonth: string;
    lastMonth: string;
  };
};

async function Cards() {
  const data = await getDashboardCardsData();
  if (!data.success) return;
  const cardsData = {
    balance: data.data.cardBalance?.at(0)?.accountBalance,
    income: {
      thisMonth: data.data.expenses.at(0)?.thisMonthIncomes,
      lastMonth: data.data.expenses.at(0)?.lastMonthIncomes,
    },
    expense: {
      thisMonth: data.data.expenses.at(0)?.thisMonthExpenses,
      lastMonth: data.data.expenses.at(0)?.lastMonthExpenses,
    },
  };
  return (
    <ul className={"grid 2xl:grid-cols-4 md:grid-cols-2 gap-7 "}>
      <CardsWrapper
        type={"regularCard"}
        footer={"6% more than last month"}
        footerIcon={<TrendingUpIcon />}
        icon={<WalletMinimal />}
        header={"Account Balance"}
        amount={Number(cardsData.balance)}
        hasProfit
      />
      <CardsWrapper
        type={"regularCard"}
        footer={"2% less than last month"}
        footerIcon={<TrendingUpIcon />}
        icon={<HandCoins />}
        header={"Monthly Expenses"}
        amount={Number(cardsData.expense.thisMonth)}
        hasProfit
      />
      <CardsWrapper
        type={"regularCard"}
        footer={"6% more than last month"}
        footerIcon={<TrendingDownIcon />}
        icon={<BanknoteArrowUp />}
        header={"Monthly Incomes"}
        amount={Number(cardsData.income.thisMonth)}
        hasProfit={false}
      />
      <CardsWrapper
        type={"regularCard"}
        footer={"6% more than last month"}
        footerIcon={<TrendingUpIcon />}
        icon={<WalletMinimal />}
        header={"Account Balance"}
        amount={973652.23}
        hasProfit
      />
    </ul>
  );
}

export default Cards;
