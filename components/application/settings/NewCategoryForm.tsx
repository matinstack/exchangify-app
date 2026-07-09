"use client";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory } from "@/actions/categories/categories";
import {
  createCategorySchema,
  type CreateCategoryType,
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
const NewCategoryForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategoryType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      icon: undefined,
      categoryType: "" as unknown as CreateCategoryType["categoryType"],
      parentId: undefined,
    },
  });

  const onSubmit = async (values: CreateCategoryType) => {
    const res = await createCategory(values);

    if (res.error) {
      toast.error(res.error, { position: "top-center" });
      return;
    }
    toast.success(res.success, { position: "top-center" });
    reset();

    console.log(values);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ New Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Category Form</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new category card.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...register("name")}
                  autoFocus
                  type="text"
                  id="name"
                  placeholder="e.g. Shopping, Salary"
                />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>
              <Field data-invalid={!!errors.categoryType}>
                <FieldLabel htmlFor="icon">Category Type</FieldLabel>
                <Controller
                  render={({ field }) => (
                    <Select
                      disabled={isSubmitting}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select A Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category Type</SelectLabel>
                          <SelectItem value={"expense"}>
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-3 h-3 rounded-full bg-expense`}
                              />
                              <span>Expense</span>
                            </div>
                          </SelectItem>
                          <SelectItem value={"income"}>
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-3 h-3 rounded-full bg-income`}
                              />
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
              <Field data-invalid={!!errors.icon}>
                <FieldLabel htmlFor="icon">
                  Image <span className="text-[9px] pl-2">Optional</span>
                </FieldLabel>
                <Input
                  {...register("icon")}
                  accept="image/*"
                  type="file"
                  id="icon"
                />
                {/* TODO AFTER Better Schema and Error Handling*/}
                {/*{errors.icon && <FieldError>{errors.icon.message}</FieldError>}*/}
              </Field>

              <Field className="pb-4">
                <FormSubmitButton
                  disabled={isSubmitting}
                  text={"Add New Category"}
                  loadingText={"Adding New Category..."}
                />
              </Field>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewCategoryForm;
