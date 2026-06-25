import Cards from "@/components/application/dashboard/Cards";
import ExpenseChart from "@/components/application/dashboard/charts/ExpenseChart";
import TopCategoryChart from "@/components/application/dashboard/charts/TopCategoryChart";
import RecentExpensesTable from "@/components/application/dashboard/tables/RecentExpensesTable";
import BillsTable from "@/components/application/dashboard/tables/BIllsTable";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-7 my-7">
      <Cards />
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

export default Dashboard;
