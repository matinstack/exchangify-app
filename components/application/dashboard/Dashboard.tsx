import Cards from "@/components/application/dashboard/Cards";
import ExpenseChart from "@/components/application/dashboard/charts/ExpenseChart";

const Dashboard = () => {
  return (
    <div>
      <Cards />
      <div className={"grid xl:grid-cols-2 md:grid-cols-1  gap-11 sm:pt-9 "}>
        <ExpenseChart />
        <ExpenseChart />
      </div>
    </div>
  );
};

export default Dashboard;
