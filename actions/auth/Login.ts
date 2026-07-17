"use server";
import { LoginSchema, type LoginSchemaType } from "@/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { logActivity } from "@/lib/log-activity";
export const LoginAction = async (values: LoginSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid login credentials",
    };
  }
  const { email, password } = validatedFields.data;

  try {
    const res = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    await logActivity({
      userId: res.user.id,
      action: "login",
      entityType: "user",
      entityId: res.user.id,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    console.log(err);

    return {
      error: "Invalid credentials",
    };
  }

  redirect("/app/dashboard");
};
