import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AppError } from "./errors/AppError";
import { connection } from "next/server";
export const getSession = async () => {
  await connection();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user.id) throw new AppError("UNAUTHORIZED");

  return session;
};
