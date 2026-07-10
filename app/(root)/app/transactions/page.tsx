import Transactions from "@/components/application/transactions/Transactions";
import { getSession } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";
import { getTransactions } from "@/actions/dashboard/dashboard";
import { type Query } from "@/actions/dashboard/dashboard";

type Props = {
  searchParams: Promise<Query>;
};

const transactionsPage = async ({ searchParams }: Props) => {
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

export default transactionsPage;
