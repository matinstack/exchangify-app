import { EllipsisVertical, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type Card = {
  type: "regularCard";
  hasProfit: boolean;
  icon: React.ReactNode;
  header: string;
  amount: number;
  footer: string;
  footerIcon: React.ReactNode;
};

type GoalCard = {
  type: "goalCard";
  footer: string;
};

function CardsWrapper(props: Card | GoalCard) {
  switch (props.type) {
    case "regularCard":
      console.log(props.icon);

      return (
        <li
          className={`p-5 md:h-45.5 rounded-sm ${props.header === "Monthly Expenses" ? "from-expense-accent" : "from-brand-accent"} bg-linear-to-t  to-white shadow-sm flex flex-col justify-between`}
        >
          <div className={"flex justify-between"}>
            <h5 className={"flex gap-4"}>
              <span
                className={`${props.header === "Monthly Expenses" ? "text-expense" : "text-brand"}`}
              >
                {props.icon}
              </span>
              <span>{props.header}</span>
            </h5>
            <DropDownMenuCard />
          </div>
          <p className={"pl-4 text-3xl font-normal"}>$ {props.amount}</p>
          <p
            className={`flex ${props.hasProfit ? "text-income" : "text-expense"} gap-2 text-xs font-normal items-center`}
          >
            <span>{props.footerIcon}</span>
            <span>{props.footer}</span>
          </p>
        </li>
      );
    case "goalCard":
      return <div>test</div>;
  }
}

function DropDownMenuCard() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`cursor-pointer hover:text-brand transition`}>
          <EllipsisVertical size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"center"} className={"mx-1"}>
        <DropdownMenuItem>Test</DropdownMenuItem>
        <DropdownMenuItem>
          <UserIcon />
          Test
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CardsWrapper;
