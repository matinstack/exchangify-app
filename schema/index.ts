import { z } from "zod";

export const LoginSchema = z
  .object({
    email: z.email("Please enter a valid email address").trim(),

    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters long" }),

    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Please confirm your password" }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const nameRegex = /^[A-Za-z\s'-]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters" })
      .regex(nameRegex, {
        message: "First name must contain only English letters",
      }),

    lastName: z
      .string()
      .trim()
      .min(1, { message: "Last name is required" })
      .min(2, { message: "Last name must be at least 2 characters" })
      .regex(nameRegex, {
        message: "Last name must contain only English letters",
      }),

    email: z.email("Please enter a valid email address").trim(),

    password: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(passwordRegex, {
        message: "Password must contain both letters and numbers",
      }),

    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
