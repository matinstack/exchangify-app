import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session === undefined) return null;

  return session;
};
