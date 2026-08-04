"use client";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { contactSupportSchema } from "@/schema/help-and-support";
import { contactSupportAction } from "@/actions/help-and-support";
import FormSubmitButton from "@/components/shared/FormSubmitButton";
import { handleAction } from "@/lib/errors/runAction";

const ReportABugForm = () => {
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<contactSupportSchema>({
    resolver: zodResolver(contactSupportSchema),
    defaultValues: {
      category: "" as unknown as undefined,
      priority: "" as unknown as undefined,
      subject: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<contactSupportSchema> = (data) => {
    startTransition(async () => {
      const res = await handleAction(() => contactSupportAction(data));

      res.success
        ? toast.success("Form submitted successfully!")
        : toast.error(res.error.message, { position: "top-center" });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">Issue Category</Label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select
              aria-invalid={!!errors.category}
              disabled={isPending}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BUG">Bug Report</SelectItem>
                <SelectItem value="FEATURE">Feature Request</SelectItem>
                <SelectItem value="BILLING">Billing</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <p className="text-sm text-destructive">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Priority Level</Label>
        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <RadioGroup
              aria-invalid={!!errors.category}
              disabled={isPending}
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="LOW" id="priority-low" />
                <Label
                  htmlFor="priority-low"
                  className="font-normal cursor-pointer"
                >
                  Low
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MEDIUM" id="priority-medium" />
                <Label
                  htmlFor="priority-medium"
                  className="font-normal cursor-pointer"
                >
                  Medium
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="HIGH" id="priority-high" />
                <Label
                  htmlFor="priority-high"
                  className="font-normal cursor-pointer"
                >
                  High
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="URGENT" id="priority-urgent" />
                <Label
                  htmlFor="priority-urgent"
                  className="font-normal cursor-pointer"
                >
                  Urgent
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.priority && (
          <p className="text-sm text-destructive">{errors.priority.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          {...register("subject")}
          id="subject"
          type="text"
          disabled={isPending}
          placeholder="Brief summary of the issue"
        />
        {errors.subject && (
          <p className="text-sm text-destructive">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          {...register("description")}
          id="description"
          disabled={isPending}
          placeholder="Please describe the issue in detail..."
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          Include steps to reproduce if applicable
        </p>
      </div>

      <FormSubmitButton
        text="Submit"
        loadingText="Submitting..."
        disabled={isPending}
      />
    </form>
  );
};
export default ReportABugForm;
