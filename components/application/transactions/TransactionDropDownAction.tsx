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

type TransactionDropDownActionProps = {
  transaction: TransactionItem;
  editTransactionData: NewTransactionData;
};

export default function TransactionDropDownAction({
  transaction,
  editTransactionData,
}: TransactionDropDownActionProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditFormDialogOpen, setIsEditFormDialogOpen] = useState(false);

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
              setIsEditFormDialogOpen(true);
            }}
          >
            <SquarePen />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsDeleteDialogOpen(true);
            }}
            variant="destructive"
          >
            <Trash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TransactionEditFormDialog
        transaction={transaction}
        isOpen={isEditFormDialogOpen}
        setIsOpen={setIsEditFormDialogOpen}
        editTransactionData={editTransactionData}
      />
      <DeleteTransactionAction
        transaction={transaction}
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
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
  isOpen,
  setIsOpen,
}: Props) {
  const { cards, success, subCategories, categories } = editTransactionData;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Edit the transaction information below.
          </DialogDescription>
        </DialogHeader>
        <NewTransactionForm
          cards={cards}
          categories={categories}
          subCategories={subCategories}
          defaultValues={transaction}
        />
      </DialogContent>
    </Dialog>
  );
}
