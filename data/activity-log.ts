import { db } from "@/db";
import { ActivityLog } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAllActivitiesByUserId = async (userId: string) =>
  await db.select().from(ActivityLog).where(eq(ActivityLog.userId, userId));
