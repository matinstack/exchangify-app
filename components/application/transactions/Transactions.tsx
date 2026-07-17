import TransactionsHeader from "@/components/application/transactions/TransactionsHeader";
import PagePagination from "@/components/shared/PagePagination";
import TransactionsTable from "@/components/application/transactions/TransactionsTable";

export type TransactionItem = {
  id: string;
  cardId: string;
  amount: string;
  note: string | null;
  type: "expense" | "income";
  bankName: string | null;
  cardNumber: string | null;
  description: string | null;
  category: string | null;
  categoryId: string | null;
  subCategory: string | null;
  subCategoryId: string | null;
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
      <TransactionsTable data={data} />
      {pagination.totalPages > 1 && <PagePagination pagination={pagination} />}
    </div>
  );
};

export default Transactions;
