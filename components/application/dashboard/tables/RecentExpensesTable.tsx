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

type Categories = {
  id: string;
  parentId: string | null;
  name: string;
  type: "income" | "expense";
};

async function RecentExpensesTable() {
  let tableData: null[] | TransactionsType[] = [];
  let categories: [] | Categories[];
  const transactions = await getRecentTransactionsData();
  if (transactions.success && transactions.data) {
    tableData = transactions.data.transactionsData;
    categories = transactions.data.categoriesData;
  }
  return (
    <div
      className={"bg-card border pb-2  border-border rounded-lg shadow-xs  "}
    >
      <h6 className="text-md flex gap-4 pl-8 py-4 mt-2">
        <ArrowLeftRight className="text-brand" />
        Recent Transactions
      </h6>
      <ScrollArea className="overflow-y-auto h-50">
        {tableData.length > 0 ? (
          <div className="mx-8">
            <Table className="">
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

              <TableBody className={"h-fit  max-h-36 overflow-y-auto"}>
                {tableData.map((tra, i) => {
                  const isExpense = tra?.transactionType === "expense";

                  const { name: subCategory, parentId } =
                    categories.find((cat) => cat.id === tra?.categoryId) ?? {};

                  const category = categories.find(
                    (cat) => cat.id === parentId,
                  )?.name;
                  return (
                    <TableRow key={tra?.id}>
                      <TableCell>
                        <ExpenseTypeIcon isExpense={isExpense} />
                      </TableCell>
                      <TableCell>$ {tra?.amount}</TableCell>
                      <TableCell>{category}</TableCell>
                      <TableCell>{subCategory}</TableCell>
                      <TableCell>{tra?.date.toDateString()}</TableCell>
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
              For see this chart go make your first tranaction.
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default RecentExpensesTable;
