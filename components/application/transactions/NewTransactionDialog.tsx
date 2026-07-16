"use client";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NewTransactionForm from "@/components/application/transactions/NewTransactionForm";
import { TransactionItem } from "@/components/application/transactions/Transactions";

type Card = {
  id: string;
  name: string;
  number: string;
};

type Category = {
  id: string;
  name: string;
  type: "expense" | "income";
};

type SubCategory = {
  id: string;
  name: string;
  parentId: string | null;
  type: "expense" | "income";
};

export type NewTransactionDataProps = {
  cards: Card[];
  categories: Category[];
  subCategories: SubCategory[];
  defaultValues?: TransactionItem;
};

type NewTransactionDialog = NewTransactionDataProps & {
  success?: boolean;
};

const NewTransactionDialog = ({
  cards,
  categories,
  subCategories,
  success,
}: NewTransactionDialog) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> <span>New Transaction</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="md:max-w-xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new transaction.
          </DialogDescription>
        </DialogHeader>
        {!success ? (
          "There was a problem getting your data. Please try again later."
        ) : cards.length === 0 ? (
          <p>Please add a card before creating your first transaction.</p>
        ) : (
          <NewTransactionForm
            cards={cards}
            categories={categories}
            subCategories={subCategories}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewTransactionDialog;
