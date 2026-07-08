"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CalendarDays,
  Funnel,
  MoreVertical,
  Search,
} from "lucide-react";
import { useState } from "react";

export type TransactionItem = {
  id: string;
  amount: string;
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
  const [transactions, setTransactions] = useState<GetTransactionsResponse>({
    data,
    pagination,
  });
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  return (
    <div className="py-9">
      <div className="flex mb-6 gap-3">
        <h2 className="text-2xl flex-1  font-normal ">Transactions Activity</h2>

        <InputGroup className="max-w-72 min-w-60">
          <InputGroupInput placeholder="Search ..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              {filter === "all" && (
                <>
                  <Funnel />
                  Filter
                </>
              )}
              {filter === "expense" && (
                <>
                  <Funnel className="fill-background" />
                  Expenses
                </>
              )}
              {filter === "income" && (
                <>
                  <Funnel className="fill-background" />
                  Incomes
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Select A Filter</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>

                <DropdownMenuRadioItem value="expense">
                  Expenses
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="income">
                  Incomes
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <CalendarDays />
              {dateFilter === "all" && "All Time"}
              {dateFilter === "ytd" && "YTD"}
              {dateFilter === "3m" && "3M"}
              {dateFilter === "1m" && "1M"}
              {dateFilter === "7d" && "7D"}
              {dateFilter === "1d" && "1D"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            <Tabs defaultValue="all" onValueChange={(e) => setDateFilter(e)}>
              <TabsList>
                <TabsTrigger value="1d">1D</TabsTrigger>
                <TabsTrigger value="7d">7D</TabsTrigger>
                <TabsTrigger value="1m">1M</TabsTrigger>
                <TabsTrigger value="3m">3M</TabsTrigger>
                <TabsTrigger value="ytd">YTD</TabsTrigger>
                <TabsTrigger value="all">
                  <Calendar />
                  All Time
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Card</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0
            ? data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>test</TableCell>
                </TableRow>
              ))
            : ""}
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Transactions;
