import { getSession } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";
import { getAllActivitiesByUserId } from "@/data/activity-log";
import ActivityLogTable from "@/components/application/activity-log/ActivityLogTable";

const ActivityLog = async () => {
  const session = await getSession();
  if (!session || !session.user.id) redirect("/auth/login");
  const { id } = session.user;
  const activities = await getAllActivitiesByUserId(id);

  return (
    <>
      <ActivityLogTable activities={activities} />
    </>
  );
};

export default ActivityLog;
