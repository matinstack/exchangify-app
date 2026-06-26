"use client";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { LoginSchema, type LoginSchemaType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LoginAction } from "@/actions/auth/Login";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    formState: { errors, isSubmitting, isSubmitted },
    register,
    reset,
    handleSubmit,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    const res = await LoginAction(data);

    if (res.error) {
      toast.error(res.error, { position: "top-center" });
      return;
    }
    toast.success("Successfully Logged in!", { position: "top-center" });
  };

  return (
    <form className={"flex flex-col gap-3"} onSubmit={handleSubmit(onSubmit)}>
      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor={"email"}>Email</FieldLabel>
        <Input
          {...register("email")}
          type={"text"}
          placeholder={"john.doe@example.com"}
          id={"email"}
          aria-invalid={!!errors.email}
          disabled={isSubmitting}
        />
        {!!errors.email && (
          <FieldDescription className={"text-xs text-destructive"}>
            {errors.email.message}
          </FieldDescription>
        )}
      </Field>
      <Field data-invalid={!!errors.password}>
        <FieldLabel htmlFor={"password"}>Password</FieldLabel>

        <div className="relative w-full">
          <Input
            {...register("password")}
            type={showPassword.password ? "text" : "password"}
            placeholder={"•••••••••••"}
            id={"password"}
            aria-invalid={!!errors.password}
            className="pr-10"
            disabled={isSubmitting}
          />
          <Button
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent hover:cursor-pointer text-muted-foreground"
            aria-label={
              showPassword.password ? "Hide password" : "Show password"
            }
          >
            {showPassword.password ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
        </div>

        {!!errors.password && (
          <FieldDescription className={"text-xs text-destructive"}>
            {errors.password.message}
          </FieldDescription>
        )}
      </Field>
      <Button variant="default" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default RegisterForm;
