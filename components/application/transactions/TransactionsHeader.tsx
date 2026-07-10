import TransactionsFilters from "@/components/application/transactions/TransactionsFilters";
import NewTransaction from "@/components/application/transactions/NewTransaction";

const TransactionsHeader = () => {
  return (
    <div className="flex mb-6 gap-3">
      <h2 className="text-2xl flex-1  font-normal ">Transactions Activity</h2>

      <NewTransaction />
      <TransactionsFilters />
    </div>
  );
};

export default TransactionsHeader;
