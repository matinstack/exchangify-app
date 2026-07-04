import * as z from "zod";
import { cardTypeEnum } from "@/db/schema";
import { LoginSchema, RegisterSchema } from "@/schema/index";

const cardNumberRegax = /^[0-9]+$/;
export const NewCardSchema = z.object({
  bankName: z
    .string()
    .min(3, { message: "Bank name is required" })
    .max(24, { message: "Bank name is too long!" })
    .trim(),

  optionalName: z
    .string()
    .min(3, { message: "Bank name is required" })
    .max(24, { message: "Bank name is too long!" })
    .trim()
    .optional(),

  balance: z
    .string()
    .min(1, { error: "Bank balance is empty!" })
    .max(14, { error: "Too much for balance!" })
    .trim(),

  cardNumber: z
    .string()
    .min(12, { error: "Not a valid card number" })
    .max(19, { error: "Not a valid card number" })
    .regex(cardNumberRegax, {
      error: "Card Number must be only numbers",
    })
    .trim(),

  currency: z.enum(cardTypeEnum.enumValues),

  cardColor: z
    .string({ error: "Please pick a color" })
    .max(24, { error: "Invalid Input" })
    .trim(),
});

export type NewCardSchemaType = z.infer<typeof NewCardSchema>;
