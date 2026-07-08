import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CARD_THEMES_ARRAY } from "@/constants/card-themes";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NewCardSchema, NewCardSchemaType } from "@/schema/cards";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { addNewCard } from "@/actions/cards/addNewCard";
import { Spinner } from "@/components/ui/spinner";
import FormSubmitButton from "@/components/shared/FormSubmitButton";
const AddNewCardForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewCardSchemaType>({
    resolver: zodResolver(NewCardSchema),
    defaultValues: {
      cardNumber: "",
      bankName: "",
      balance: "",
      currency: "" as unknown as NewCardSchemaType["currency"],
      optionalName: "",
      cardColor: "",
    },
  });
  const bankTypeItems = [
    { label: "Iranian Bank", value: "iranianBank" },
    { label: "Visa", value: "visa" },
    { label: "Master Card", value: "masterCard" },
  ];

  const onSubmit = async (values: NewCardSchemaType) => {
    const res = await addNewCard(values);

    if (res.error) {
      toast.error(res.error, { position: "top-center" });
      return;
    }

    toast.success(res.success, { position: "top-center" });
    setIsOpen(false);
    reset();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Card</Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>New Card Form</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new bank card.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form
            className="max-h-[95vh] overflow-y-auto  px-2 space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Field data-invalid={!!errors.bankName}>
                <FieldLabel htmlFor="bank-name">Bank Name</FieldLabel>
                <Input
                  {...register("bankName")}
                  autoFocus
                  disabled={isSubmitting}
                  type="text"
                  id="bank-name"
                  placeholder="Visa, Master Card, Melli, Tejarat"
                />
                {!!errors.bankName && (
                  <FieldDescription className={"text-xs text-destructive"}>
                    {errors.bankName.message}
                  </FieldDescription>
                )}
              </Field>

              <Field data-invalid={!!errors.optionalName}>
                <FieldLabel htmlFor="card-label">Card Label</FieldLabel>
                <Input
                  {...register("optionalName")}
                  disabled={isSubmitting}
                  type="text"
                  id="card-label"
                  placeholder="e.g. Personal Card, Travel Card"
                />
                {!!errors.optionalName && (
                  <FieldDescription className={"text-xs text-destructive"}>
                    {errors.optionalName.message}
                  </FieldDescription>
                )}
              </Field>
              <Field data-invalid={!!errors.cardNumber}>
                <FieldLabel htmlFor="card-number">Card Number</FieldLabel>
                <Input
                  {...register("cardNumber")}
                  disabled={isSubmitting}
                  type="text"
                  id="card-number"
                  placeholder="6037 •••• •••• 3356"
                />
                {!!errors.cardNumber && (
                  <FieldDescription className={"text-xs text-destructive"}>
                    {errors.cardNumber.message}
                  </FieldDescription>
                )}
              </Field>
              <Field data-invalid={!!errors.balance}>
                <FieldLabel htmlFor="card-balance">Balance</FieldLabel>
                <Input
                  {...register("balance")}
                  disabled={isSubmitting}
                  type="text"
                  id="card-balance"
                  placeholder="125000000"
                />
                {!!errors.balance && (
                  <FieldDescription className={"text-xs text-destructive"}>
                    {errors.balance.message}
                  </FieldDescription>
                )}
              </Field>

              <Field data-invalid={!!errors.currency}>
                <FieldLabel>Bank Type</FieldLabel>
                <Controller
                  control={control}
                  name="currency"
                  render={({ field }) => (
                    <Select
                      disabled={isSubmitting}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Bank Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Bank Type</SelectLabel>
                          {bankTypeItems.map((type) => (
                            <SelectItem
                              key={type.label}
                              value={type.value as string}
                            >
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                ></Controller>
                <FieldError>{errors.currency?.message}</FieldError>
              </Field>
              <Field data-invalid={!!errors.cardColor}>
                <FieldLabel>A Color For Your Card</FieldLabel>
                <Controller
                  control={control}
                  name="cardColor"
                  render={({ field }) => (
                    <Select
                      disabled={isSubmitting}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select A Card Color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Color</SelectLabel>
                          {CARD_THEMES_ARRAY.map((theme) => {
                            const dotColor =
                              theme.value === "purple-indigo"
                                ? "bg-purple-600"
                                : theme.value === "emerald-crypto"
                                  ? "bg-emerald-600"
                                  : theme.value === "sunset-rose"
                                    ? "bg-rose-500"
                                    : theme.value === "ocean-cyber"
                                      ? "bg-blue-600"
                                      : theme.value === "carbon-vip"
                                        ? "bg-zinc-800"
                                        : "bg-amber-600";
                            return (
                              <SelectItem key={theme.value} value={theme.value}>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`w-3 h-3 rounded-full ${dotColor}`}
                                  />
                                  <span>{theme.label}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                ></Controller>
                <FieldError>{errors.cardColor?.message}</FieldError>
              </Field>

              <Field className="pb-4">
                <FormSubmitButton
                  disabled={isSubmitting}
                  text={"Add New Card"}
                  loadingText={"Adding New Card..."}
                />
              </Field>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCardForm;
