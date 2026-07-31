import * as z from "zod";

import { transactionTypeEnum } from "@/db/schema";
import { patterns } from "./patterns";
export const NewTransactionSchema = z.object({
  cardId: z
    .string()
    .trim()
    .min(1, { error: "Please select a card" })
    .max(72, { error: "Not A Valid Card" }),
  amount: z
    .string()
    .trim()
    .min(1, { error: "Amount can not be empty" })
    .max(11, { error: "Amount exceeds the maximum allowed" })
    .regex(patterns.onlyNumber),

  transactionType: z.enum(transactionTypeEnum.enumValues, {
    error: "Please Pick Transaction Type",
  }),

  categoryId: z
    .string()
    .trim()
    .min(1, { error: "Please select a category" })
    .max(72, { error: "Not A Valid Category" }),

  subCategoryId: z
    .string()
    .trim()
    .min(1, { error: "Please select a category" })
    .max(72, { error: "Not A Valid Category" }),

  date: z.date({ error: "Please pick a date" }),

  note: z.string().trim().max(32, { error: "Too many characters" }).optional(),

  description: z
    .string()
    .trim()
    .max(128, { error: "Too many characters" })
    .optional(),
});

export type NewTransactionsType = z.infer<typeof NewTransactionSchema>;
