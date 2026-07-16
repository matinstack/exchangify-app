"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { EllipsisVertical, SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import DeleteTransactionAction from "@/components/application/transactions/DeleteTransactionAction";
import {
  TransactionDialogProps,
  TransactionDropDownActionProps,
} from "@/components/application/transactions/TransactionDropDownParent";

export default function TransactionDropDownAction({
  transaction,
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
      />
      <DeleteTransactionAction
        transaction={transaction}
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
    </>
  );
}

function TransactionEditFormDialog({
  transaction,
  isOpen,
  setIsOpen,
}: TransactionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>Hello</DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
