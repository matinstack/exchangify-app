import Transactions from "@/components/application/transactions/Transactions";
import { getTransactions, Query } from "@/lib/queries/transactions.queries";

type Props = {
  searchParams: Promise<Query>;
};

const TransactionComponent = async ({ searchParams }: Props) => {
  const query = await searchParams;
  const transactions = await getTransactions(query);

  return (
    <Transactions
      data={transactions.data}
      pagination={transactions.pagination}
    />
  );
};

export default TransactionComponent;
