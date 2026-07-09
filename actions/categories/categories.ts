"use server";
import {
  createCategorySchema,
  type CreateCategoryType,
} from "@/schema/categories";
import { getSession } from "@/lib/auth-helpers";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { and, eq, ilike, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export const createCategory = async (values: CreateCategoryType) => {
  const session = await getSession();
  if (!session || !session.user.id) {
    throw new Error("Unathorized");
  }
  const { id } = session.user;

  const validatedFields = createCategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, parentId, categoryType, icon } = validatedFields.data;

  try {
    const [category] = await db
      .select()
      .from(categories)
      .where(
        and(
          ilike(categories.name, name),
          or(eq(categories.userId, id), eq(categories.isDefault, true)),
        ),
      )
      .limit(1);

    if (category) {
      return {
        error: "You have a category with same name",
      };
    }

    let imageUrl = "";
    if (icon) {
      // ُTODO upload image to bucket
      imageUrl = "https://example.com/path-to-image.png";
    }

    // TODO FIx userID after adding default Categories
    await db.insert(categories).values({
      userId: null,
      name,
      parentId: parentId ?? null,
      isDefault: true,
      icon: imageUrl ?? null,
      type: categoryType,
    });

    revalidatePath("/app");
    return {
      success: "Category successfully added",
    };
  } catch (err) {
    console.error(err);

    return {
      error:
        err instanceof Error
          ? `Database Error ${err.message}`
          : "An Unexpected database error occurred.",
    };
  }
};
