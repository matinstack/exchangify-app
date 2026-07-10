import Transactions from "@/components/application/transactions/Transactions";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-helpers";
import { getTransactions, Query } from "@/actions/transactions/transactions";

type Props = {
  searchParams: Promise<Query>;
};

const TransactionComponent = async ({ searchParams }: Props) => {
  const session = await getSession();
  if (!session || !session.user.id) {
    redirect("/login");
  }
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
