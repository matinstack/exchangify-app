"use server";
import { RegisterSchema, type RegisterSchemaType } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { logActivity } from "@/lib/log-activity";
export const RegisterAction = async (values: RegisterSchemaType) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid credentials",
    };
  }
  const { email, password, name, lastName } = validatedFields.data;

  const existingEmail = await getUserByEmail(email);

  if (existingEmail) {
    return {
      error: "Email is already in use",
    };
  }

  try {
    const res = await auth.api.signUpEmail({
      body: { email, name, lastName, password },
      headers: await headers(),
    });

    await logActivity({
      userId: res.user.id,
      action: "signup",
      entityType: "user",
      metadata: { email },
    });
  } catch (err) {
    console.error("REGISTER_ERROR", err);
    return { error: "There was an error on register your account." };
  }

  redirect("/app/dashboard");
};
