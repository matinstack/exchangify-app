import { categoryEnum, priorityEnum } from "@/db/schema/reports";
import * as z from "zod";

export const contactSupportSchema = z.object({
  category: z.enum(categoryEnum.enumValues, {
    error: "Select a valid category",
  }),
  priority: z.enum(priorityEnum.enumValues, {
    error: "Select a valid priority",
  }),
  subject: z
    .string()
    .min(3, { error: "Subject must be at least 3 characters long" })
    .max(110, { error: "Subject must be at most 110 characters long" }),
  description: z
    .string()
    .min(10, { error: "Description must be at least 10 characters long" })
    .max(2000, { error: "Description must be at most 2000 characters long" }),
});

export type contactSupportSchema = z.infer<typeof contactSupportSchema>;
