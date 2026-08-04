import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, MoreVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getRecentTransactionsData } from "@/actions/dashboard/dashboard";
import { type TransactionsType } from "@/db/schema";
import ExpenseTypeIcon from "@/components/shared/expense-type-icon";
import { formatCurrency } from "@/lib/format-currency";

type Categories = {
  id: string;
  parentId: string | null;
  name: string;
  type: "income" | "expense";
};

async function RecentExpensesTable() {
  const transactions = await getRecentTransactionsData();

  if (!transactions || !transactions.success || !transactions.data) return null;

  const tableData: TransactionsType[] = transactions.data.transactionsData;
  const categories: Categories[] = transactions.data.categoriesData;

  return (
    <div className="bg-card border pb-2 border-border rounded-lg shadow-xs">
      <h6 className="text-md flex gap-4 pl-8 py-4 mt-2">
        <ArrowLeftRight className="text-brand" />
        Recent Transactions
      </h6>
      <ScrollArea className="overflow-y-auto h-50">
        {tableData.length > 0 ? (
          <div className="mx-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[10%]">Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Sub Category</TableHead>
                  <TableHead className="w-[5%]">Date</TableHead>
                  <TableHead className="text-right max-w-12">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="h-fit max-h-36 overflow-y-auto">
                {tableData.map((tra) => {
                  const amountType =
                    tra.cardCurrency === "EUR"
                      ? tra.euroAmount
                      : tra.cardCurrency === "USD"
                        ? tra.usdAmount
                        : tra.rialAmount;

                  const safeAmount = Number(amountType) || 0;

                  const isExpense = tra.transactionType === "expense";

                  const { name: subCategory, parentId } = categories.find(
                    (cat) => cat.id === tra.categoryId,
                  ) ?? { name: "N/A", parentId: null };

                  const category = categories.find(
                    (cat) => cat.id === parentId,
                  )?.name;

                  return (
                    <TableRow key={tra.id}>
                      <TableCell>
                        <ExpenseTypeIcon isExpense={isExpense} />
                      </TableCell>
                      <TableCell>
                        {formatCurrency(safeAmount, tra.cardCurrency)}
                      </TableCell>
                      <TableCell>{category}</TableCell>
                      <TableCell>{subCategory}</TableCell>
                      <TableCell>{tra.date.toDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size={"icon"}>
                              <MoreVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center text-xl font-semibold">
            <div>You have no recent transactions</div>
            <div className="text-sm text-foreground/50 font-normal">
              For see this chart go make your first transaction.
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default RecentExpensesTable;
