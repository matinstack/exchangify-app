"use server";
import { LoginSchema, type LoginSchemaType } from "@/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { logActivity } from "@/lib/log-activity";
import { createAction } from "@/lib/errors/error-handler";
export const LoginAction = createAction(async (values: LoginSchemaType) => {
  const { email, password } = LoginSchema.parse(values);

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
});
