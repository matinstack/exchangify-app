import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TransactionDialogProps } from "@/components/application/transactions/TransactionDropDownParent";
import { toast } from "sonner";
import { deleteTransactionById } from "@/actions/transactions/transactions";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

function DeleteTransactionAction({
  transaction,
  isOpen,
  setIsOpen,
}: TransactionDialogProps) {
  const handleDelete = async () => {
    const res = await deleteTransactionById(transaction.id);
    if (res.error) {
      toast.error(res.error, { position: "top-center" });
      setIsOpen(false);
      return;
    }
    toast.success(res.success, { position: "top-center" });
    setIsOpen(false);
    return;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="flex flex-col gap-1 text-left">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle className="text-xl font-semibold">
              Delete Transaction
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground pt-1">
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 my-2 border-y border-border flex flex-col gap-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Type & Category</span>
            <span className="font-medium capitalize">
              {transaction.type} • {transaction.category}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-semibold text-base text-foreground">
              $
              {new Intl.NumberFormat("en-US").format(
                Number(transaction.amount),
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Bank</span>
            <span className="font-medium text-muted-foreground">
              {transaction.bankName}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Card Number</span>
            <span className="font-medium text-muted-foreground">
              {transaction.cardNumber}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium text-muted-foreground">
              {transaction.date.toDateString()}{" "}
              {format(transaction.date, "HH:MM")}
            </span>
          </div>
          {transaction.note && (
            <div className="flex justify-between items-start gap-4 pt-1">
              <span className="text-muted-foreground shrink-0">Note</span>
              <span className="text-right text-muted-foreground italic truncate max-w-[240px]">
                `&quot;`{transaction.note}`&quot;`
              </span>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="w-full sm:w-auto"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteTransactionAction;
