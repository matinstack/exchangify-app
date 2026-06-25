import Cards from "@/components/application/dashboard/Cards";
import ExpenseChart from "@/components/application/dashboard/charts/ExpenseChart";
import TopCategoryChart from "@/components/application/dashboard/charts/TopCategoryChart";

const Dashboard = () => {
  return (
    <div>
      <Cards />
      <div className={"grid xl:grid-cols-2 md:grid-cols-1  gap-11 sm:pt-9 "}>
        <ExpenseChart />
        <TopCategoryChart />
      </div>
    </div>
  );
};

export default Dashboard;
