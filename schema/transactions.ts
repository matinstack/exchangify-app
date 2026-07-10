import * as z from "zod";

import { transactionTypeEnum } from "@/db/schema";
export const NewTransactionSchema = z.object({
  cardId: z
    .string()
    .min(1, { error: "Please select a card" })
    .max(72, { error: "Not A Valid Card" })
    .trim(),
  amount: z
    .string()
    .min(1, { error: "Amount can not be empty" })
    .max(11, { error: "Amount exceeds the maximum allowed" })
    .trim(),

  transactionType: z.enum(transactionTypeEnum.enumValues, {
    error: "Please Pick Transaction Type",
  }),

  categoryId: z
    .string()
    .min(1, { error: "Please select a category" })
    .max(72, { error: "Not A Valid Category" })
    .trim(),

  subCategoryId: z
    .string()
    .min(1, { error: "Please select a category" })
    .max(72, { error: "Not A Valid Category" })
    .trim(),

  date: z.date({ error: "Please pick a date" }),
  note: z.string().max(32, { error: "Too many characters" }).trim().optional(),
  description: z
    .string()
    .max(32, { error: "Too many characters" })
    .trim()
    .optional(),
});

export type NewTransactionsType = z.infer<typeof NewTransactionSchema>;
