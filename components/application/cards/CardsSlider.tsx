"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CARD_THEMES, type CardThemes } from "@/constants/card-themes";
import AddNewCardForm from "@/components/application/cards/AddNewCardForm";
import { type CardsType } from "@/db/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  MoreVertical,
  SquarePen,
  StarPlus,
  Trash,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { handleAction } from "@/lib/errors/runAction";
import { deleteCardAction } from "@/actions/cards/deleteCard";
import { setDefaultCard } from "@/actions/cards/setDefaultCard";
import CardFormDialog from "./CardFormDialog";

interface CardsSliderProps {
  cardsArray: CardsType[];
}

export default function CardsSlider({ cardsArray }: CardsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const handleNext = () => {
    setActiveIndex((prev) => (prev === cardsArray.length - 1 ? 0 : prev + 1));
  };

  const orderedCards = [
    ...cardsArray.slice(activeIndex),
    ...cardsArray.slice(0, activeIndex),
  ];

  return (
    <div className="flex flex-col items-center justify-center w-fit min-h-fit gap-8 bg-card px-9 py-5 rounded-xl text-foreground shadow-xs border border-border">
      <h3 className="font-normal">My Cards</h3>
      <Button variant="outline" onClick={() => setIsCreateFormOpen(true)}>
        Add New Card
      </Button>
      <CardFormDialog
        isOpen={isCreateFormOpen}
        setIsOpen={setIsCreateFormOpen}
        type="create"
      >
        <AddNewCardForm />
      </CardFormDialog>

      <div className="relative w-76 h-44.5 md:w-95 md:h-57.5 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {orderedCards.map((card, index) => {
            const isFront = index === 0;
            console.log(card);
            const positionY = index * -16;
            const scale = 1 - index * 0.05;
            const opacity = 1 - index * 0.25;

            const currentTheme =
              CARD_THEMES[card.cardColor as CardThemes] ||
              CARD_THEMES["purple-indigo"];

            return (
              <motion.div
                key={card.id}
                animate={{
                  y: positionY,
                  scale,
                  opacity,
                  zIndex: orderedCards.length - index,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 26,
                }}
                className={`
                  absolute
                  w-full
                  h-full
                  ${currentTheme.bg}
                  rounded-2xl
                  p-6
                  shadow-xl
                  border
                  flex
                  flex-col
                  justify-between
                  cursor-pointer
                  select-none
                `}
                onClick={() => {
                  if (isFront) {
                    handleNext();
                  }
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none rounded-2xl" />

                <div
                  className="flex justify-between items-start z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <p
                      className={`
                        text-[10px]
                        ${currentTheme.subText}
                        uppercase
                        tracking-wider
                        font-semibold
                      `}
                    >
                      {card.bankName}
                    </p>

                    <h4
                      className={`
                        font-bold
                        text-base
                        ${currentTheme.text}
                      `}
                    >
                      {card.customName || card.bankName}
                    </h4>
                  </div>

                  <DropDownOptions
                    card={card}
                    className={currentTheme.button}
                  />
                </div>

                <div
                  className={`
                    font-mono
                    text-xl
                    tracking-[0.15em]
                    text-center
                    z-10
                    ${currentTheme.text}
                  `}
                >
                  {card.cardNumber}
                </div>

                <div className="flex justify-between items-end z-10">
                  <div>
                    <p
                      className={`
                        text-xs
                        ${currentTheme.subText}
                      `}
                    >
                      balance
                    </p>

                    <p
                      className={`
                        font-bold
                        text-sm
                        ${currentTheme.text}
                      `}
                    >
                      {/*{card.balance}*/}
                      {card.currency === "IRR" &&
                        new Intl.NumberFormat("en-US").format(
                          Math.trunc(Number(card.balance)),
                        )}
                    </p>
                  </div>

                  <div className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-black italic">
                    {card.type === "iranianBank"
                      ? "SHETAB"
                      : card.type.toUpperCase()}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

type Card = {
  card: CardsType;
};

type EditAndDeleteProps = {
  cardId: string;
  bankName?: string;
  cardNumber: string;
};

type DropDownOptionsProps = {
  className: string;
} & Card;

const DropDownOptions = ({ className, card }: DropDownOptionsProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleSetDefault = async () => {
    toast.promise(
      handleAction(() => setDefaultCard(card.id)),
      {
        loading: "Setting card as default...",
        success: "Card set as default successfully!",
        error: "Failed to set default card",
        position: "top-center",
      },
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={cn("rounded-sm w-8", className)} variant="ghost">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-fit"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsEditOpen(true);
            }}
          >
            <SquarePen />
            Edit
          </DropdownMenuItem>
          {!card.isDefault && (
            <DropdownMenuItem onSelect={handleSetDefault}>
              <StarPlus />
              Set default card
            </DropdownMenuItem>
          )}
          <Separator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => {
              e.preventDefault();
              setIsDeleteOpen(true);
            }}
          >
            <Trash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CardDeleteDialog
        cardId={card.id}
        bankName={card.bankName}
        cardNumber={card.cardNumber}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />
      <CardFormDialog type="edit" isOpen={isEditOpen} setIsOpen={setIsEditOpen}>
        <AddNewCardForm card={card} />
      </CardFormDialog>
    </>
  );
};

type DeleteCardProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & EditAndDeleteProps;

const CardDeleteDialog = ({
  cardId,
  isOpen,
  setIsOpen,
  bankName,
  cardNumber,
}: DeleteCardProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className=" sm:max-w-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader className="flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <DialogTitle className="text-lg font-semibold">
                Delete Card
              </DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground pt-1">
              You are about to delete the card :<br />{" "}
              <span className="flex  gap-2 mt-2 font-semibold text-lg">
                <span>{bankName}</span>
                <span>{cardNumber}</span>
              </span>
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <DialogTitle className="text-center text-warning font-semibold border border-warning/50 py-6 rounded-lg flex items-center justify-center gap-2">
            <TriangleAlert className="h-5 w-5" />
            Unexpected bad things will happen if you don't read this!
          </DialogTitle>
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <div className="rounded-lg border border-warning/50 p-5">
              <div className="mb-3 flex items-center gap-2 text-warning">
                <TriangleAlert className="h-5 w-5" />
                <h4 className="font-semibold">This action cannot be undone</h4>
              </div>

              <div className="space-y-4 text-sm leading-6 text-muted-foreground">
                <p>
                  Deleting this card will permanently remove it from your
                  account.
                </p>

                <ul className="ml-5 list-disc space-y-2">
                  <li>
                    The card and its settings will be permanently deleted.
                  </li>
                  <li>
                    Your custom card name and current balance will be removed.
                  </li>
                  <li>
                    You will need to create the card again if you want to use it
                    later.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              setIsOpen(false);
              setIsConfirmOpen(true);
            }}
            variant="outline"
            className=" focus-visible:ring-destructive"
          >
            I know the consequences, delete anyway
          </Button>
        </DialogContent>
      </Dialog>
      <CardDeleteConfirm
        isOpen={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        cardId={cardId}
      />
    </>
  );
};

const CardDeleteConfirm = ({
  isOpen,
  setIsOpen,
  cardId,
}: {
  isOpen: boolean;
  cardId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [confirmWord, setConfirmWord] = useState("");
  const handleSubmit = async () => {
    if (confirmWord === "Delete Card") {
      const res = await handleAction(() => deleteCardAction(cardId));
      !res.success
        ? toast.error(res.error.message, { position: "top-center" })
        : toast.success(res.data.message);
      setIsOpen(false);
      return;
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogTitle className="text-lg">Confirm Deletion</DialogTitle>
        <Separator />
        <DialogDescription>
          To confirm, type "Delete Card" in the below
        </DialogDescription>
        <Input
          onChange={(e) => setConfirmWord(e.target.value)}
          className="focus-visible:ring-destructive"
          type="text"
        />
        <Button
          disabled={confirmWord !== "Delete Card"}
          className=""
          variant="destructive"
          onClick={handleSubmit}
        >
          Delete Card
        </Button>
      </DialogContent>
    </Dialog>
  );
};

type EditCardProps = {
  isOpen: boolean;

  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & Card;

const CardEditDialog = ({ card, isOpen, setIsOpen }: EditCardProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogTitle>Edit Card</DialogTitle>
        <DialogDescription>Edit the card details.</DialogDescription>
        <Button>Save</Button>
      </DialogContent>
    </Dialog>
  );
};
