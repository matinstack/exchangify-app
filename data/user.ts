import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) =>
  await db.query.user.findFirst({ where: eq(user.email, email) });
