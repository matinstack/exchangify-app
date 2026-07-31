"use server";
import {
  createCategorySchema,
  type CreateCategoryType,
} from "@/schema/categories";
import { getSession } from "@/lib/auth-helpers";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { and, eq, ilike, or } from "drizzle-orm";
import { createAction } from "@/lib/errors/error-handler";
import { AppError } from "@/lib/errors/AppError";

export const createCategory = createAction(
  async (values: CreateCategoryType) => {
    const session = await getSession();

    const { id } = session.user;

    const { name, parentId, categoryType, iconKey } =
      createCategorySchema.parse(values);
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
      throw new AppError("CATEGORY_ALREADY_EXISTS");
    }

    await db.insert(categories).values({
      userId: id,
      name,
      parentId: parentId ?? null,
      isDefault: true,
      icon: iconKey ?? null,
      type: categoryType,
    });

    return {
      message: "Category successfully added",
    };
  },
);
