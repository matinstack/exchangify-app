import { getSession } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";
import { getNewTransactionDataByUserId } from "@/data/transactions";
import TransactionDropDownAction from "@/components/application/transactions/TransactionDropDownAction";
import { TransactionItem } from "@/components/application/transactions/Transactions";
import { UseDialogState } from "@/hooks/use-dialog-state";

export type TransactionDropDownActionProps = {
  transaction: TransactionItem;
};
export type TransactionDialogProps = {
  transaction: TransactionItem;
  dialog: UseDialogState;
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
