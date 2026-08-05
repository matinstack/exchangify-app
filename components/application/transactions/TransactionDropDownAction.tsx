"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { EllipsisVertical, SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import DeleteTransactionAction from "@/components/application/transactions/DeleteTransactionAction";
import { TransactionDialogProps } from "@/components/application/transactions/TransactionDropDownParent";
import { NewTransactionData } from "@/data/transactions";
import NewTransactionForm from "@/components/application/transactions/NewTransactionForm";
import { TransactionItem } from "@/components/application/transactions/Transactions";
import { useDialogState } from "@/hooks/use-dialog-state";

type TransactionDropDownActionProps = {
  transaction: TransactionItem;
  editTransactionData: NewTransactionData;
};

export default function TransactionDropDownAction({
  transaction,
  editTransactionData,
}: TransactionDropDownActionProps) {
  const editDialog = useDialogState();
  const deleteDialog = useDialogState();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-2">
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              editDialog.show();
            }}
          >
            <SquarePen />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              deleteDialog.show();
            }}
            variant="destructive"
          >
            <Trash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TransactionEditFormDialog
        transaction={transaction}
        dialog={editDialog}
        editTransactionData={editTransactionData}
      />
      <DeleteTransactionAction
        transaction={transaction}
        dialog={deleteDialog}
      />
    </>
  );
}

type Props = TransactionDialogProps & {
  editTransactionData: NewTransactionData;
};

function TransactionEditFormDialog({
  editTransactionData,
  transaction,
  dialog,
}: Props) {
  const { cards, subCategories, categories } = editTransactionData;
  return (
    <Dialog {...dialog}>
      <DialogContent
        className="md:max-w-xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Edit the transaction information below.
          </DialogDescription>
        </DialogHeader>
        <NewTransactionForm
          onSuccess={dialog.close}
          cards={cards}
          categories={categories}
          subCategories={subCategories}
          defaultValues={transaction}
        />
      </DialogContent>
    </Dialog>
  );
}
