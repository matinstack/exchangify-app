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
import { uploadWithProgress } from "@/lib/upload-with-progress";
import {
  createCategorySchema,
  imageMetaSchema,
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
import { useState } from "react";
import { getCategoryIconUploudUrl } from "@/actions/categories/upload";
const NewCategoryForm = () => {
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconError, setIconError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
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
      iconKey: undefined,
      categoryType: "" as unknown as CreateCategoryType["categoryType"],
      parentId: undefined,
    },
  });
  const handleFileChange = (file: File | undefined) => {
    setIconError(null);
    if (!file) {
      setIconFile(null);
      return;
    }
    const res = imageMetaSchema.safeParse({
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    });
    if (!res.success) {
      setIconError(res.error.issues[0].message);
      setIconFile(null);
      return;
    }
    setIconFile(file);
  };

  const onSubmit = async (values: CreateCategoryType) => {
    let iconKey: string | undefined;

    if (iconFile) {
      setUploading(true);

      try {
        const { url, key } = await getCategoryIconUploudUrl({
          fileName: iconFile.name,
          fileType: iconFile.type,
          fileSize: iconFile.size,
        });
        await uploadWithProgress(url, iconFile, setProgress);
        iconKey = key;
      } catch (err) {
        toast.error("Image uploading failed.", { position: "top-center" });
        setUploading(false);
        return;
      }
      setUploading(false);
    }
    const res = await createCategory({ ...values, iconKey });

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
              <Field data-invalid={!!iconError}>
                <FieldLabel htmlFor="iconKey">
                  Image <span className="text-[9px] pl-2">Optional</span>
                </FieldLabel>
                <Controller
                  name="iconKey"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Input
                      accept="image/*"
                      type="file"
                      id="icon"
                      onChange={(e) =>
                        onChange(handleFileChange(e.target.files?.[0]))
                      }
                    />
                  )}
                />

                {iconError && <FieldError>{iconError}</FieldError>}
                {uploading && (
                  <p className="text-xs">Uploading... {progress}%</p>
                )}
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
