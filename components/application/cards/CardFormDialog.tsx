import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CardFormDialog = {
  isOpen: boolean;
  type: "create" | "edit";
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CardFormDialog = ({
  children,
  isOpen,
  setIsOpen,
  type,
}: CardFormDialog) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-3xl max-h-[90vh] overflow-y-auto"
        aria-describedby={undefined}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "New Card Form" : "Edit Card From"}
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "Fill out the form below to add a new bank card."
              : "Fill out the form for editing your card."}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CardFormDialog;
