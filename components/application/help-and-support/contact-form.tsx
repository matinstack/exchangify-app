"use client";

import FormSubmitButton from "@/components/shared/FormSubmitButton";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

type Props = {
  type: "bug" | "contact";
};
export const ContactForm = ({ type }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm();
  return (
    <form>
      <Field data-invalid={errors}>
        <FieldLabel htmlFor="title">
          {type === "contact" ? "Subject" : "Bug title"}
        </FieldLabel>
        <Input
          {...register("title")}
          id="title"
          placeholder={`${type === "contact" ? "Unable to sync my transactions" : "Dashboard chart is not loading"}`}
          disabled={isLoading}
        />
        <FieldError></FieldError>
      </Field>
      <Field data-invalid={errors}>
        <FieldLabel htmlFor="sub-title">
          {type === "contact" ? "Message" : "Description"}
        </FieldLabel>
        <Textarea
          {...register("sub-title")}
          id="sub-title"
          placeholder={`${type === "contact" ? "Please describe your issue in as much detail as possible" : "Describe what happened and what you expected to happen..."}`}
          disabled={isLoading}
        />
        <FieldError></FieldError>
      </Field>
      <FormSubmitButton
        disabled={isLoading}
        text="Send"
        loadingText="Sending ...."
      />
    </form>
  );
};
