import ActivityLog from "@/components/application/activity-log/ActivityLog";
import { Suspense } from "react";

const activityLogPage = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <ActivityLog />
    </Suspense>
  );
};

export default activityLogPage;
