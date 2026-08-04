"use server";

import { db } from "@/db";
import { userSettings } from "@/db/schema";
import { getSession } from "@/lib/auth-helpers";
import { AppError } from "@/lib/errors/AppError";
import { createAction } from "@/lib/errors/error-handler";
import { eq } from "drizzle-orm";

export const changeCurrency = createAction(
  async (newCurrency: "USD" | "EUR" | "IRR") => {
    const session = await getSession();

    await db
      .update(userSettings)
      .set({ currency: newCurrency })
      .where(eq(userSettings.userId, session.user.id));
  },
);

export const getCurrentCurrency = createAction(async () => {
  const session = await getSession();
  const userCurrency = await db
    .select({ currency: userSettings.currency })
    .from(userSettings)
    .where(eq(userSettings.userId, session.user.id));

  const currency = userCurrency.at(0)?.currency;

  if (!currency) throw new AppError("INTERNAL_ERROR");

  return {
    currency,
  };
});
