"use server";
import { RegisterSchema, type RegisterSchemaType } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { logActivity } from "@/lib/log-activity";
import { createAction } from "@/lib/errors/error-handler";
import { db } from "@/db";
import { userSettings } from "@/db/schema";
import { AppError } from "@/lib/errors/AppError";
export const RegisterAction = createAction(
  async (values: RegisterSchemaType) => {
    const { email, password, name, lastName } = RegisterSchema.parse(values);

    const existingEmail = await getUserByEmail(email);

    if (existingEmail) {
      throw new AppError("EMAIL_IN_USE");
    }

    const res = await auth.api.signUpEmail({
      body: { email, name, lastName, password },
      headers: await headers(),
    });

    await db.insert(userSettings).values({
      userId: res.user.id,
      currency: "USD",
      language: "en",
      timezone: "Asia/Tehran",
    });

    await logActivity({
      userId: res.user.id,
      action: "signup",
      entityType: "user",
      metadata: { email },
    });

    return {
      messagee: "Account registered successfully.",
    };
  },
);
