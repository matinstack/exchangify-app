import CardsWrapper from "@/components/application/dashboard/cards/CardsWrapper";
import {
  WalletMinimal,
  TrendingUpIcon,
  TrendingDownIcon,
  BanknoteArrowDown,
  BanknoteArrowUp,
} from "lucide-react";

function Cards() {
  return (
    <ul className={"grid 2xl:grid-cols-4 md:grid-cols-2  gap-11 mt-8"}>
      <CardsWrapper
        type={"regularCard"}
        footer={"6% more than last month"}
        footerIcon={<TrendingUpIcon />}
        icon={<WalletMinimal />}
        header={"Account Balance"}
        amount={973652.23}
        hasProfit
      />
      <CardsWrapper
        type={"regularCard"}
        footer={"2% less than last month"}
        footerIcon={<TrendingUpIcon />}
        icon={<BanknoteArrowDown />}
        header={"Monthly Expenses"}
        amount={473652.23}
        hasProfit
      />
      <CardsWrapper
        type={"regularCard"}
        footer={"6% more less last month"}
        footerIcon={<TrendingDownIcon />}
        icon={<BanknoteArrowUp />}
        header={"Monthly Incomes"}
        amount={973652.23}
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
