import Dashboard from "@/components/application/dashboard/Dashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const dashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session);
  return <Dashboard />;
};

export default dashboardPage;
