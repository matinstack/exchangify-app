import { transactionTypeEnum } from "@/db/schema";
import * as z from "zod";
import { patterns } from "./patterns";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export const imageMetaSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  fileType: z.enum(ACCEPTED_IMAGE_TYPES),
  fileSize: z
    .number()
    .positive()
    .max(MAX_FILE_SIZE, { error: "Max size allowed is 5MB" }),
});

export const createCategorySchema = z.object({
  categoryType: z.enum(transactionTypeEnum.enumValues, {
    error: "Select A Category",
  }),
  parentId: z.uuid().nullable().optional(),
  name: z
    .string()
    .trim()
    .min(1, "Please enter a name")
    .max(32, { error: "Too many characters" })
    .regex(patterns.categoryName),

  iconKey: z.string().trim().optional(), //Only key/url not a File
});

export const createSubCategorySchema = z.object({
  categoryType: z.enum(transactionTypeEnum.enumValues, {
    error: "Select A Category",
  }),
  parentId: z.uuid({ error: "Select A Parent Category" }).trim(),
  name: z
    .string()
    .trim()
    .min(1, "Please enter a name")
    .max(32, { error: "Too many characters" })
    .regex(patterns.categoryName),

  icon: z.any().optional(),
});

export type CreateCategoryType = z.input<typeof createCategorySchema>;
export type CreateSubCategoryType = z.input<typeof createSubCategorySchema>;
// TODO Figure out what todo with dept id
