import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { MoveDownLeft, MoveUpRight } from "lucide-react";
import TransactionsHeader from "@/components/application/transactions/TransactionsHeader";

import CardNumber from "@/components/application/transactions/CardNumber";
import TransactionsPagination from "@/components/application/transactions/TransactionsPagination";
import TransactionDropDownAction from "@/components/application/transactions/TransactionDropDownAction";
import TransactionDropDownParent from "@/components/application/transactions/TransactionDropDownParent";

export type TransactionItem = {
  id: string;
  amount: string;
  note: string | null;
  type: "expense" | "income";
  bankName: string | null;
  cardNumber: string | null;
  category: string | null;
  subCategory: string | null;
  date: Date;
};

export type GetTransactionsResponse = {
  data: TransactionItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

const Transactions = ({ data, pagination }: GetTransactionsResponse) => {
  return (
    <div className="py-9">
      <TransactionsHeader />
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
                              <MoveDownLeft
                                className="text-expense"
                                size={18}
                              />
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
      {pagination.totalPages > 1 && (
        <TransactionsPagination pagination={pagination} />
      )}
    </div>
  );
};

export default Transactions;
