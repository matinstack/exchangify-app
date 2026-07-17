import { transactionTypeEnum } from "@/db/schema";
import * as z from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createCategorySchema = z.object({
  categoryType: z.enum(transactionTypeEnum.enumValues, {
    error: "Select A Category",
  }),
  // icon: z.string().max(128, { error: "Too Many Characters" }).trim().optional(),
  parentId: z.uuid().nullable().optional(),
  name: z
    .string()
    .min(1, "Please enter a name")
    .max(32, { error: "Too many characters" })
    .trim(),

  icon: z.any().optional(),
  // icon: z
  //   .preprocess(
  //     (val) => (val instanceof FileList ? val[0] : val),
  //     z.instanceof(File).optional(),
  //   )
  //   .refine(
  //     (file) => !file || file.size <= MAX_FILE_SIZE,
  //     "Max file size is 2MB.",
  //   )
  //   .refine(
  //     (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported.",
  //   ),
});

export const createSubCategorySchema = z.object({
  categoryType: z.enum(transactionTypeEnum.enumValues, {
    error: "Select A Category",
  }),
  parentId: z.uuid({ error: "Select A Parent Category" }).trim(),
  name: z
    .string()
    .min(1, "Please enter a name")
    .max(32, { error: "Too many characters" })
    .trim(),

  icon: z.any().optional(),
});

export type CreateCategoryType = z.input<typeof createCategorySchema>;
export type createSubCategoryType = z.input<typeof createSubCategorySchema>;
// TODO Figure out what todo with dept id
