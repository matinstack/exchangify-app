import { getSession } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";
import { getActivities } from "@/actions/activity-log/activity-log";
import { Query } from "@/actions/transactions/transactions";
import ActivityLogTable from "@/components/application/activity-log/ActivityLogTable";

type Props = {
  searchParams: Promise<Query>;
};

const ActivityLog = async ({ searchParams }: Props) => {
  const session = await getSession();
  if (!session || !session.user.id) redirect("/auth/login");

  const query = await searchParams;
  const data = await getActivities(query);

  return (
    <>
      <ActivityLogTable activities={data.data} pagination={data.pagination} />
    </>
  );
};

export default ActivityLog;
