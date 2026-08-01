import * as z from "zod";
import { cardTypeEnum, currencyEnum } from "@/db/schema";
import { patterns } from "./patterns";

export const NewCardSchema = z.object({
  bankName: z
    .string()
    .trim()
    .min(3, { message: "Bank name is required" })
    .max(24, { message: "Bank name is too long!" })
    .regex(patterns.username),

  optionalName: z
    .string()
    .trim()
    .min(3, { message: "Bank name is required" })
    .max(24, { message: "Bank name is too long!" })
    .optional(),

  balance: z
    .string()
    .trim()
    .min(1, { error: "Bank balance is empty!" })
    .max(14, { error: "Too much for balance!" }),

  cardNumber: z
    .string()
    .trim()
    .min(12, { error: "Not a valid card number" })
    .max(19, { error: "Not a valid card number" })
    .regex(patterns.onlyNumber, {
      error: "Card Number must be only numbers",
    }),

  cardType: z.enum(cardTypeEnum.enumValues, {
    error: "please Select Your Card Type",
  }),

  currency: z.enum(currencyEnum.enumValues, {
    error: "please Select Your Currency Type",
  }),

  cardColor: z
    .string({ error: "Please pick a color" })
    .trim()
    .min(1, { error: "Please pick a color" })
    .max(24, { error: "Invalid Input" })
    .regex(patterns.noHtmlTags),
});

export type NewCardSchemaType = z.infer<typeof NewCardSchema>;
