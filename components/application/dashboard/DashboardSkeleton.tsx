import Cards from "@/components/application/dashboard/Cards";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ExpenseChart from "@/components/application/dashboard/charts/ExpenseChart";
import TopCategoryChart from "@/components/application/dashboard/charts/TopCategoryChart";
import RecentExpensesTable from "@/components/application/dashboard/tables/RecentExpensesTable";
import BillsTable from "@/components/application/dashboard/tables/BIllsTable";

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-7 my-7">
      <div className={"grid 2xl:grid-cols-4 md:grid-cols-2 gap-7"}>
        <Card className={"h-45.5"}>
          <CardHeader>
            <div className={"flex justify-between "}>
              <div className={"flex gap-2  "}>
                <Skeleton className=" h-8 w-8 " />
                <Skeleton className="h-5 w-48 mt-2" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className=" h-20 w-full" />
          </CardContent>
        </Card>
        <Card className={"h-45.5"}>
          <CardHeader>
            <div className={"flex justify-between "}>
              <div className={"flex gap-2  "}>
                <Skeleton className=" h-8 w-8 " />
                <Skeleton className="h-5 w-48 mt-2" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className=" h-20 w-full" />
          </CardContent>
        </Card>
        <Card className={"h-45.5"}>
          <CardHeader>
            <div className={"flex justify-between "}>
              <div className={"flex gap-2  "}>
                <Skeleton className=" h-8 w-8 " />
                <Skeleton className="h-5 w-48 mt-2" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className=" h-20 w-full" />
          </CardContent>
        </Card>
        <Card className={"h-45.5"}>
          <CardHeader>
            <div className={"flex justify-between "}>
              <div className={"flex gap-2  "}>
                <Skeleton className=" h-8 w-8 " />
                <Skeleton className="h-5 w-48 mt-2" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className=" h-20 w-full" />
          </CardContent>
        </Card>
      </div>

      <div className={"grid xl:grid-cols-2 md:grid-cols-1 gap-7"}>
        <ExpenseChart />
        <TopCategoryChart />
      </div>
      <div className={"grid xl:grid-cols-6 w-full gap-7"}>
        <div className={"xl:col-span-4"}>
          <RecentExpensesTable />
        </div>
        <div className={"xl:col-span-2"}>
          <BillsTable />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
