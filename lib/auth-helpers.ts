import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AppError } from "./errors/AppError";
export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user.id) throw new AppError("UNAUTHORIZED");

  return session;
};
