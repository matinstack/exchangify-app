"use server";
import { RegisterSchema, type RegisterSchemaType } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export const RegisterAction = async (values: RegisterSchemaType) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid login credentials",
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
      body: { email, name, lastName, password, callbackURL: "/app/dashboard" },
      headers: await headers(),
    });
    console.log(res);
  } catch (err) {
    console.error("REGISTER_ERROR", err);
    return { error: "There was an error on register your account." };
  }
};
