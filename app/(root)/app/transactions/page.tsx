import Transactions from "@/components/application/transactions/Transactions";
import { getSession } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";
import { getTransactions } from "@/actions/dashboard/dashboard";

const transactionsPage = async () => {
  const session = await getSession();
  if (!session || !session.user.id) {
    redirect("/login");
  }
  const transactions = await getTransactions({});

  return (
    <Transactions
      data={transactions.data}
      pagination={transactions.pagination}
    />
  );
};

export default transactionsPage;
