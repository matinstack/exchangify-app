import ActivityLog from "@/components/application/activity-log/ActivityLog";
import { Suspense } from "react";
import { ActivityQuery } from "@/lib/queries/activity-log.queries";

type Props = {
  searchParams: Promise<ActivityQuery>;
};

const activityLogPage = async ({ searchParams }: Props) => {
  return (
    <Suspense fallback={"Loading..."}>
      <ActivityLog searchParams={searchParams} />
    </Suspense>
  );
};

export default activityLogPage;
