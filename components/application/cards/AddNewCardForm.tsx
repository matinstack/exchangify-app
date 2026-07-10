import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CARD_THEMES_ARRAY } from "@/constants/card-themes";
import { Button } from "@/components/ui/button";
import { PatternFormat, NumericFormat } from "react-number-format";
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
import FormSubmitButton from "@/components/shared/FormSubmitButton";
const bankTypeItems = [
  { label: "Iranian Bank", value: "iranianBank" },
  { label: "Visa", value: "visa" },
  { label: "Master Card", value: "masterCard" },
];

const currencyItems = [
  {
    label: "Euro",
    value: "EUR",
    symbol: "€",
  },
  {
    label: "US Dollar",
    value: "USD",
    symbol: "$",
  },
  {
    label: "British Pound",
    value: "GBP",
    symbol: "£",
  },
  {
    label: "Iranian Rial",
    value: "IRR",
    symbol: "﷼",
  },
  {
    label: "UAE Dirham",
    value: "AED",
    symbol: "د.إ",
  },
  {
    label: "Turkish Lira",
    value: "TRY",
    symbol: "₺",
  },
];
const AddNewCardForm = () => {
  const [open, setOpen] = useState(false);
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
      cardType: "" as unknown as NewCardSchemaType["cardType"],
      optionalName: "",
      cardColor: "",
    },
  });

  const onSubmit = async (values: NewCardSchemaType) => {
    const res = await addNewCard(values);

    if (res.error) {
      toast.error(res.error, { position: "top-center" });
      return;
    }

    toast.success(res.success, { position: "top-center" });
    setOpen(false);
    reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Add New Card</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-3xl max-h-[90vh] overflow-y-auto"
        aria-describedby={undefined}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>New Card Form</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new bank card.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="grid grid-cols-1  md:grid-cols-2 ">
            <Field data-invalid={!!errors.bankName}>
              <FieldLabel htmlFor="bank-name">Bank Name</FieldLabel>
              <Input
                {...register("bankName")}
                autoFocus
                disabled={isSubmitting}
                type="text"
                id="bank-name"
                placeholder="e.g. Visa, Master Card, Melli, Tejarat"
              />
              {errors.bankName && (
                <FieldError>{errors.bankName.message}</FieldError>
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
              <Controller
                render={({ field }) => (
                  <PatternFormat
                    format={"#### #### #### ####"}
                    mask="_"
                    value={field.value ?? ""}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
                    customInput={Input}
                    placeholder="6037 1234 5678 9012"
                    disabled={isSubmitting}
                  />
                )}
                control={control}
                name={"cardNumber"}
              ></Controller>
              {!!errors.cardNumber && (
                <FieldDescription className={"text-xs text-destructive"}>
                  {errors.cardNumber.message}
                </FieldDescription>
              )}
            </Field>

            <Field data-invalid={!!errors.cardType}>
              <FieldLabel>Bank Type</FieldLabel>
              <Controller
                control={control}
                name="cardType"
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
                          <SelectItem key={type.label} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              ></Controller>
              <FieldError>{errors.cardType?.message}</FieldError>
            </Field>

            <Field data-invalid={!!errors.currency}>
              <FieldLabel>Currency</FieldLabel>
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
                      <SelectValue placeholder="Select A Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Bank Type</SelectLabel>
                        {currencyItems.map((currency) => (
                          <SelectItem
                            key={currency.value}
                            value={currency.value}
                          >
                            <div className="flex items-center gap-2">
                              <span>{currency.symbol}</span>
                              <span>{currency.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              ></Controller>
              <FieldError>{errors.currency?.message}</FieldError>
            </Field>
            <Field data-invalid={!!errors.balance}>
              <FieldLabel htmlFor="card-balance">Current Balance</FieldLabel>
              <Controller
                control={control}
                name="balance"
                render={({ field }) => (
                  <NumericFormat
                    thousandSeparator=","
                    allowNegative={false}
                    value={field.value ?? ""}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
                    customInput={Input}
                    placeholder="125,000,000"
                    disabled={isSubmitting}
                  />
                )}
              />
              {!!errors.balance && (
                <FieldDescription className={"text-xs text-destructive"}>
                  {errors.balance.message}
                </FieldDescription>
              )}
            </Field>
            <Field className="md:col-span-2" data-invalid={!!errors.cardColor}>
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
            <Field className="pb-4 md:col-span-2">
              <FormSubmitButton
                disabled={isSubmitting}
                text={"Add New Card"}
                loadingText={"Adding New Card..."}
              />
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCardForm;
