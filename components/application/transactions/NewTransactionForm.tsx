"use client";
import { type NewTransactionDataProps } from "@/components/application/transactions/NewTransactionDialog";
import { useForm, Controller, useWatch } from "react-hook-form";
import {
  NewTransactionSchema,
  type NewTransactionsType,
} from "@/schema/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import FormSubmitButton from "@/components/shared/FormSubmitButton";
import { Textarea } from "@/components/ui/textarea";

const NewTransactionForm = ({
  categories,
  subCategories,
  cards,
}: NewTransactionDataProps) => {
  const {
    reset,
    register,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewTransactionsType>({
    resolver: zodResolver(NewTransactionSchema),
    defaultValues: {
      cardId: "",
      amount: "",
      transactionType: "" as unknown as NewTransactionsType["transactionType"],
      categoryId: "",
      subCategoryId: "",
      note: "",
      description: "",
      date: new Date(),
    },
  });
  const selectedCard = useWatch({
    control,
    name: "cardId",
  });

  const selectedTransactionType = useWatch({
    control,
    name: "transactionType",
  });
  const selectedCategory = useWatch({
    control,
    name: "categoryId",
  });
  const filteredCategory = categories.filter(
    (category) => category.type === selectedTransactionType,
  );

  const filteredSubCategory = subCategories.filter(
    (category) => category.parentId === selectedCategory,
  );

  const onSubmit = async (values: NewTransactionsType) => {
    console.log(values);
  };

  console.log(categories, subCategories, cards);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field data-invalid={!!errors.cardId}>
          <FieldLabel>Select A Card</FieldLabel>
          <Controller
            render={({ field }) => (
              <Select
                disabled={isSubmitting}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder={"Select A Card"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {cards.map((card) => (
                      <SelectItem key={card.id} value={card.id}>
                        {card.name}
                        <span className="text-xs pl-2">
                          {`${card.number.slice(0, 4)} **** **** ${card.number.slice(-4)}`}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            name={"cardId"}
            control={control}
          ></Controller>
          {!!errors.cardId && <FieldError>{errors.cardId.message}</FieldError>}
        </Field>
        <Field data-invalid={!!errors.transactionType}>
          <FieldLabel>Transaction Type</FieldLabel>
          <Controller
            render={({ field }) => (
              <Select
                disabled={selectedCard === "" || isSubmitting}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);

                  setValue("categoryId", "");
                  setValue("subCategoryId", "");
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={`${selectedCard === "" ? "Select A Card First" : "Select A Type"}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Transaction Type</SelectLabel>
                    <SelectItem value={"expense"}>
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full bg-expense`} />
                        <span>Expense</span>
                      </div>
                    </SelectItem>
                    <SelectItem value={"income"}>
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full bg-income`} />
                        <span>Income</span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            name={"transactionType"}
            control={control}
          ></Controller>
          {!!errors.transactionType && (
            <FieldError>{errors.transactionType.message}</FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors.categoryId}>
          <FieldLabel>Select A Category</FieldLabel>
          <Controller
            render={({ field }) => (
              <Select
                disabled={
                  selectedCard === "" ||
                  filteredCategory.length === 0 ||
                  isSubmitting
                }
                value={field.value ?? ""}
                onValueChange={(value) => {
                  field.onChange(value);

                  setValue("subCategoryId", "");
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={`${selectedCard === "" || filteredCategory.length === 0 ? "Select A Transaction Type First" : "Select A Category"}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {filteredCategory.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            name={"categoryId"}
            control={control}
          ></Controller>
          {!!errors.categoryId && (
            <FieldError>{errors.categoryId.message}</FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors.subCategoryId}>
          <FieldLabel>Select A Sub Category</FieldLabel>
          <Controller
            render={({ field }) => (
              <Select
                disabled={
                  selectedCard === "" ||
                  filteredSubCategory.length === 0 ||
                  isSubmitting
                }
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={`${selectedCard === "" || filteredSubCategory.length === 0 ? "Select A Category Type First" : "Select A Sub Category"}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sub Category</SelectLabel>
                    {filteredSubCategory.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            name={"subCategoryId"}
            control={control}
          ></Controller>
          {!!errors.subCategoryId && (
            <FieldError>{errors.subCategoryId.message}</FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors.amount} className="md:col-span-1">
          <FieldLabel>Amount</FieldLabel>

          <Input
            type="number"
            placeholder="e.g. 250000"
            {...register("amount")}
            disabled={isSubmitting}
          />

          {errors.amount && <FieldError>{errors.amount.message}</FieldError>}
        </Field>
        <Field data-invalid={!!errors.date} className="md:col-span-1">
          <FieldLabel>Date</FieldLabel>

          <Input type="date" disabled={isSubmitting} />

          {errors.date && <FieldError>{errors.date.message}</FieldError>}
        </Field>
        <Field data-invalid={!!errors.description} className="md:col-span-2">
          <FieldLabel>Description</FieldLabel>

          <Input
            placeholder="e.g. Grocery shopping"
            {...register("description")}
            disabled={isSubmitting}
          />

          {errors.description && (
            <FieldError>{errors.description.message}</FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors.note} className="md:col-span-2">
          <FieldLabel>Note</FieldLabel>

          <Textarea rows={4} placeholder="Optional" {...register("note")} />

          {errors.note && <FieldError>{errors.note.message}</FieldError>}
        </Field>
        <FormSubmitButton
          className="md:col-span-2"
          disabled={isSubmitting}
          text={"Add"}
          loadingText={"Adding Transaction..."}
        />
      </FieldGroup>
    </form>
  );
};

export default NewTransactionForm;
