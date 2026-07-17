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

type Props = {
  data: TransactionItem[];
};

const TransactionsTable = ({ data }: Props) => {
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
              const isExpense = item.type === "expense";
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`${isExpense ? "bg-expense/5" : "bg-income/5"} w-9 h-9 flex justify-center items-center rounded-full border border-border`}
                        >
                          {isExpense ? (
                            <MoveDownLeft className="text-expense" size={18} />
                          ) : (
                            <MoveUpRight className="text-income" size={18} />
                          )}
                        </div>
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
                    {new Intl.NumberFormat("en-US").format(
                      Math.trunc(Number(item.amount)),
                    )}
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
