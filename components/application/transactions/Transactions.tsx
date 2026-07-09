import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

import TransactionsHeader from "@/components/application/transactions/TransactionsHeader";

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
  return (
    <div className="py-9">
      <TransactionsHeader />
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
