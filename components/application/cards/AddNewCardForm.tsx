import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldDescription } from "@/components/ui/field";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { NewCardSchema, NewCardSchemaType } from "@/schema/cards";
const AddNewCardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewCardSchemaType>({
    resolver: zodResolver(NewCardSchema),
    defaultValues: {
      cardNumber: "",
      bankName: "",
      balance: "",
      currency: "iranianBank",
      optionalName: "",
    },
  });
  const onSubmit = async (values: NewCardSchemaType) => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="bank-name">Bank Name</Label>
            <Input type="text" id="bank-name" />
            <FieldDescription></FieldDescription>
          </Field>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCardForm;
