import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CARD_THEMES_ARRAY } from "@/constants/card-themes";
import { PatternFormat, NumericFormat } from "react-number-format";
import {
  Field,
  FieldGroup,
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
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
import { toast } from "sonner";
import { handleNewCard } from "@/actions/cards/handleNewCard";
import FormSubmitButton from "@/components/shared/FormSubmitButton";
import { handleAction } from "@/lib/errors/runAction";
import { CardsType } from "@/db/schema";
import { useEffect } from "react";
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
    label: "Iranian Rial",
    value: "IRR",
    symbol: "﷼",
  },
];

type Props = {
  card?: CardsType;
};
const formatInitialBalance = (balance?: string | null, currency?: string) => {
  if (!balance) return "";

  if (currency === "IRR" || balance.endsWith(".00")) {
    return Math.floor(parseFloat(balance)).toString();
  }

  return balance;
};

const AddNewCardForm = ({ card }: Props) => {
  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewCardSchemaType>({
    resolver: zodResolver(NewCardSchema),
    defaultValues: {
      cardNumber: card?.cardNumber ?? "",
      bankName: card?.bankName ?? "",
      balance: formatInitialBalance(card?.balance, card?.currency),
      currency:
        card?.currency ?? ("" as unknown as NewCardSchemaType["currency"]),
      cardType: card?.type ?? ("" as unknown as NewCardSchemaType["cardType"]),
      optionalName: card?.customName ?? "",
      cardColor: card?.cardColor ?? "",
    },
  });

  const selectedCurrency = useWatch({ control, name: "currency" });
  const selectedCardType = useWatch({ control, name: "cardType" });

  const filteredCurrencies = currencyItems.filter((item) => {
    if (selectedCardType === "iranianBank") {
      return item.value === "IRR";
    }
    if (selectedCardType === "visa" || selectedCardType === "masterCard") {
      return item.value === "USD" || item.value === "EUR";
    }
    return true;
  });
  const isCurrencyDisabled =
    !!card?.currency || isSubmitting || selectedCardType === "iranianBank";
  useEffect(() => {
    if (!selectedCardType) return;

    if (selectedCardType === "iranianBank") {
      setValue("currency", "IRR", { shouldValidate: true });
    } else if (
      selectedCardType === "visa" ||
      selectedCardType === "masterCard"
    ) {
      // اگر روی ویزا یا مسترکارت رفت و مقدار قبلی IRR بود، مقدار را ریست کن
      if (selectedCurrency === "IRR") {
        setValue("currency", "" as any, { shouldValidate: true });
      }
    }
  }, [selectedCardType, setValue]); // selectedCurrency را از dependency حذف کردیم تا اثر جانبی نداشته باشد

  const decimalScale = selectedCurrency === "IRR" ? 0 : 2;
  const onSubmit = async (values: NewCardSchemaType) => {
    const initialBalance = formatInitialBalance(card?.balance, card?.currency);
    const isSame =
      values.cardNumber === card?.cardNumber &&
      values.bankName === card?.bankName &&
      values.balance === initialBalance &&
      values.currency === card?.currency &&
      values.cardType === card?.type &&
      values.optionalName === card?.customName &&
      values.cardColor === card!.cardColor;

    if (isSame) {
      return toast.info("No changes detected.", { position: "top-center" });
    }

    if (
      card?.balance &&
      formatInitialBalance(card.balance) !== values.balance
    ) {
      toast.info("Balance cannot be updated.", { position: "top-center" });
      return;
    }
    const type = card ? "update" : "create";
    let res;

    if (card) {
      res = await handleAction(() => handleNewCard(values, type, card.id));
    } else {
      res = await handleAction(() => handleNewCard(values, type));
    }
    if (!res.success) return;

    toast.success(res.data.message, { position: "top-center" });
    if (!card) reset();
    else reset(values);
  };

  return (
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
                disabled={!!card?.type || isSubmitting}
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
                        disabled={!!card?.type || isSubmitting}
                        key={type.label}
                        value={type.value}
                      >
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
                disabled={
                  !!card?.currency || isCurrencyDisabled || isSubmitting
                }
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select A Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Bank Type</SelectLabel>
                    {filteredCurrencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
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
                decimalScale={decimalScale} // اگر IRR باشد اعشار را قفل می‌کند (0) وگرنه 2 اعشار می‌دهد
                fixedDecimalScale={false}
                allowNegative={false}
                value={field.value ?? ""}
                onValueChange={(values) => {
                  field.onChange(values.value);
                }}
                customInput={Input}
                placeholder={
                  selectedCurrency === "IRR" ? "125,000,000" : "1,250.50"
                }
                readOnly={!!card?.balance}
                disabled={isSubmitting}
                className={
                  !!card?.balance
                    ? "opacity-60 cursor-not-allowed bg-muted"
                    : ""
                }
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
  );
};

export default AddNewCardForm;
