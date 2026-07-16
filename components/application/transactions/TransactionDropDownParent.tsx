import { getSession } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";
import { getNewTransactionDataByUserId } from "@/data/transactions";
import TransactionDropDownAction from "@/components/application/transactions/TransactionDropDownAction";
import { TransactionItem } from "@/components/application/transactions/Transactions";

export type TransactionDropDownActionProps = {
  transaction: TransactionItem;
};
export type TransactionDialogProps = {
  transaction: TransactionItem;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const TransactionDropDownParent = async ({
  transaction,
}: TransactionDropDownActionProps) => {
  const session = await getSession();
  if (!session || !session.user.id) {
    redirect("/auth/login");
  }
  const editTransactionData = await getNewTransactionDataByUserId(
    session.user.id,
  );
  return (
    <TransactionDropDownAction
      transaction={transaction}
      editTransactionData={editTransactionData}
    />
  );
};

export default TransactionDropDownParent;
