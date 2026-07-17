"use server";
import { DateFilter } from "@/actions/transactions/transactions";
import { getSession } from "@/lib/auth-helpers";
import { and, between, count, eq } from "drizzle-orm";
import { ActivityLog, transactions } from "@/db/schema";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { db } from "@/db";
import { cacheLife, cacheTag } from "next/cache";

export type ActivityQuery = {
  page?: string;
  limit?: string;
  dateFilter?: DateFilter;
};

async function getActivitiesCached(userId: string, query: ActivityQuery) {
  "use cache";

  cacheLife("days");
  cacheTag(`activity-log:${userId}`);

  const { page, limit, dateFilter } = query;

  const currentPage = Number(page) ?? 1;
  const pageSize = Number(limit) ?? 10;

  const offset = (currentPage - 1) * pageSize;
  const conditions = [eq(ActivityLog.userId, userId)];

  const now = new Date();

  if (dateFilter === "today") {
    const start = startOfDay(now);
    const end = endOfDay(now);

    conditions.push(between(ActivityLog.createdAt, start, end));
  }

  if (dateFilter === "thisWeek") {
    const start = startOfWeek(now);
    const end = endOfWeek(now);

    conditions.push(between(ActivityLog.createdAt, start, end));
  }

  if (dateFilter === "thisMonth") {
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    conditions.push(between(ActivityLog.createdAt, start, end));
  }

  try {
    const [data, totalResult] = await Promise.all([
      db
        .select()
        .from(ActivityLog)
        .where(and(...conditions))
        .limit(pageSize)
        .offset(offset),

      db
        .select({ count: count() })
        .from(ActivityLog)
        .where(and(...conditions)),
    ]);

    const total = Number(totalResult[0].count);
    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      pagination: {
        total,
        page: currentPage,
        limit: pageSize,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const getActivities = async (query: ActivityQuery) => {
  const session = await getSession();
  if (!session || !session.user.id) {
    throw new Error("Unauthorized! Please login again.");
  }

  return getActivitiesCached(session.user.id, query);
};
