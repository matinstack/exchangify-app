"use client";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { RegisterSchema, type RegisterSchemaType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { RegisterAction } from "@/actions/auth/Register";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    const res = await RegisterAction(data);
    console.log(res);
    if (res && res.error) {
      toast.error(res.error, { position: "top-center" });
      return;
    }
    toast.success("Account successfully registered!");
  };

  return (
    <form className={"flex flex-col gap-3"} onSubmit={handleSubmit(onSubmit)}>
      <Field data-invalid={!!errors.name}>
        <FieldLabel htmlFor={"name"}>Name</FieldLabel>
        <Input
          {...register("name")}
          autoFocus
          type={"text"}
          placeholder={"John"}
          id={"name"}
          aria-invalid={!!errors.name}
          disabled={isSubmitting}
        />
        {!!errors.name && (
          <FieldDescription className={"text-xs text-destructive"}>
            {errors.name.message}
          </FieldDescription>
        )}
      </Field>
      <Field data-invalid={!!errors.lastName}>
        <FieldLabel htmlFor={"lastName"}>Last Name</FieldLabel>
        <Input
          {...register("lastName")}
          type={"text"}
          placeholder={"Doe"}
          id={"lastName"}
          aria-invalid={!!errors.lastName}
          disabled={isSubmitting}
        />
        {!!errors.lastName && (
          <FieldDescription className={"text-xs text-destructive"}>
            {errors.lastName.message}
          </FieldDescription>
        )}
      </Field>
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
      <Field data-invalid={!!errors.confirmPassword}>
        <FieldLabel htmlFor={"confirmPassword"}>Confirm Password</FieldLabel>

        <div className="relative w-full">
          <Input
            {...register("confirmPassword")}
            type={showPassword.confirmPassword ? "text" : "password"}
            placeholder={"Re-enter your password"}
            id={"confirmPassword"}
            aria-invalid={!!errors.confirmPassword}
            className="pr-10"
            disabled={isSubmitting}
          />
          <Button
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                confirmPassword: !prev.confirmPassword,
              }))
            }
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent hover:cursor-pointer text-muted-foreground"
            aria-label={
              showPassword.confirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            {showPassword.confirmPassword ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
        </div>
        {!!errors.confirmPassword && (
          <FieldDescription className={"text-xs text-destructive"}>
            {errors.confirmPassword.message}
          </FieldDescription>
        )}
      </Field>
      <Button variant="default" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Register"}
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default RegisterForm;
