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
import { MoreVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getRecentTransactionsData } from "@/actions/dashboard/dashboard";
import { type TransactionsType } from "@/db/schema";

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
  console.log(transactions);
  return (
    <div className={"bg-card border px-8 border-border rounded-lg shadow-xs  "}>
      <h6 className="text-lg font-semibold py-4">Recent Expenses</h6>
      <ScrollArea className="overflow-y-auto h-50">
        {tableData.length > 0 ? (
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%]">S.N</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Sub Category</TableHead>
                <TableHead className="w-[5%]">Date</TableHead>
                <TableHead className="text-right max-w-12">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className={" h-36 overflow-y-auto"}>
              {tableData.map((tra, i) => {
                const subCategory = categories.find(
                  (cat) => cat.id === tra?.categoryId,
                )?.name;
                const parentCategoryId = categories.find(
                  (cat) => cat.id === tra?.categoryId,
                )?.parentId;
                const category = categories.find(
                  (cat) => cat.id === parentCategoryId,
                )?.name;
                return (
                  <TableRow key={tra?.id}>
                    <TableCell>{i}.</TableCell>
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
        ) : (
          <div>There was an error to load data!</div>
        )}
      </ScrollArea>
    </div>
  );
}

export default RecentExpensesTable;
