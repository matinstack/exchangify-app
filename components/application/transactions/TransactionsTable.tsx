import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoveDownLeft, MoveUpRight } from "lucide-react";
import CardNumber from "@/components/application/transactions/CardNumber";
import { format } from "date-fns";
import TransactionDropDownParent from "@/components/application/transactions/TransactionDropDownParent";
import { TransactionItem } from "@/components/application/transactions/Transactions";
import ExpenseTypeIcon from "@/components/shared/expense-type-icon";
import { formatCurrency } from "@/lib/format-currency";

type Props = {
  data: TransactionItem[];
};

const TransactionsTable = ({ data }: Props) => {
  console.log(data);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="w-[20%]">Card</TableHead>
          <TableHead className="w-[18%]">Note</TableHead>
          <TableHead className="w-[10%]">Date</TableHead>
          <TableHead className="text-right max-w-12">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0
          ? data.map((item) => {
              console.log(item.cardCurrency);
              const amount =
                item.cardCurrency === "USD"
                  ? item.usdAmount
                  : item.cardCurrency === "EUR"
                    ? item.euroAmount
                    : item.rialAmount;
              const isExpense = item.type === "expense";
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ExpenseTypeIcon isExpense={isExpense} />
                      </TooltipTrigger>
                      <TooltipContent>
                        {item.type &&
                          item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>

                  <TableCell>
                    <p>{item.subCategory}</p>
                    <p className={"text-xs text-foreground/40"}>
                      {item.category}
                    </p>
                  </TableCell>
                  <TableCell
                    className={`font-semibold ${!isExpense && "text-income"}`}
                  >
                    {isExpense ? "-" : "+"}{" "}
                    {formatCurrency(Number(amount), item.cardCurrency!)}
                  </TableCell>
                  <TableCell>
                    <p>{item.bankName}</p>
                    <p>
                      <CardNumber card={item.cardNumber!} />
                    </p>
                  </TableCell>
                  <TableCell>{item.note || "-"}</TableCell>

                  <TableCell className="whitespace-nowrap">
                    <p>{item.date.toDateString()}</p>
                    <p className="text-xs text-foreground/40">
                      {format(item.date, "HH:mm")}
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <TransactionDropDownParent transaction={item} />
                  </TableCell>
                </TableRow>
              );
            })
          : ""}
        <TableRow></TableRow>
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
