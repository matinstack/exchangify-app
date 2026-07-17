import { db } from "@/db";
import { activityActionEnum, ActivityLog, entityTypeEnum } from "@/db/schema";
export type ActivityAction = (typeof activityActionEnum.enumValues)[number];
type EntityType = (typeof entityTypeEnum.enumValues)[number];

type LogActivityType = {
  userId: string;
  action: ActivityAction;
  entityType: EntityType;
  entityId?: string;
  metadata?: Record<string, unknown>;
};

export const logActivity = async ({
  userId,
  action,
  entityType,
  entityId,
  metadata,
}: LogActivityType) => {
  await db
    .insert(ActivityLog)
    .values({ userId, action, entityType, entityId, metadata });
};
