"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory } from "@/actions/categories/categories";
import {
  createSubCategorySchema,
  type createSubCategoryType,
} from "@/schema/categories";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import FormSubmitButton from "@/components/shared/FormSubmitButton";
import { toast } from "sonner";
import { MainCategories } from "@/data/categories";

type Props = {
  categories: MainCategories;
};

const NewSubCategoryForm = ({ categories }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<createSubCategoryType>({
    resolver: zodResolver(createSubCategorySchema),
    defaultValues: {
      name: "",
      icon: undefined,
      categoryType: "" as unknown as createSubCategoryType["categoryType"],
      parentId: undefined,
    },
  });
  // TODO Change porebtId Optional schema for Sub Category Forms
  const categoryType = useWatch({
    control,
    name: "categoryType",
  });
  const filteredCategories = categories.filter(
    (category) => category.type === categoryType,
  );

  const onSubmit = async (values: createSubCategoryType) => {
    console.log(values);
    const res = await createCategory(values);

    if (res.error) {
      toast.error(res.error, { position: "top-center" });
      return;
    }
    toast.success(res.success, { position: "top-center" });
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!errors.categoryType}>
          <FieldLabel htmlFor="category-type">Category Type</FieldLabel>
          <Controller
            render={({ field }) => (
              <Select
                disabled={isSubmitting}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);

                  setValue("parentId", "");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select A Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category Type</SelectLabel>
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
            control={control}
            name={"categoryType"}
          ></Controller>
          {errors.categoryType && (
            <FieldError>{errors.categoryType.message}</FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors.parentId}>
          <FieldLabel htmlFor="categoryType">Parent Category</FieldLabel>
          <Controller
            render={({ field }) => (
              <Select
                disabled={filteredCategories.length === 0 || isSubmitting}
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={`${filteredCategories.length === 0 ? "Select Category type first" : "Select A Category"}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Main Category</SelectLabel>
                    {filteredCategories.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            control={control}
            name={"parentId"}
          ></Controller>
          {errors.parentId && (
            <FieldError>{errors.parentId.message}</FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            {...register("name")}
            type="text"
            id="name"
            placeholder="e.g. Shopping, Salary"
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>
        <Field data-invalid={!!errors.icon}>
          <FieldLabel htmlFor="icon">
            Image <span className="text-[9px] pl-2">Optional</span>
          </FieldLabel>
          <Input {...register("icon")} accept="image/*" type="file" id="icon" />
          {/* TODO AFTER Better Schema and Error Handling*/}
          {/*{errors.icon && <FieldError>{errors.icon.message}</FieldError>}*/}
        </Field>

        <Field className="pb-4">
          <FormSubmitButton
            disabled={isSubmitting}
            text={"Add New Sub Category"}
            loadingText={"Adding New Sub Category..."}
          />
        </Field>
      </FieldGroup>
    </form>
  );
};

export default NewSubCategoryForm;
