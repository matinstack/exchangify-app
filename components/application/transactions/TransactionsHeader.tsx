import TransactionsFilters from "@/components/application/transactions/TransactionsFilters";
import NewTransaction from "@/components/application/transactions/NewTransaction";

const TransactionsHeader = () => {
  return (
    <div className="mb-6 flex flex-col xl:flex-row gap-4">
      <div className="flex md:flex-1 ">
        <h2 className="text-2xl font-normal md:flex-1">
          Transactions Activity
        </h2>

        <NewTransaction />
      </div>
      <div className="flex gap-3 xl:ml-0 ml-auto">
        <TransactionsFilters />
      </div>
    </div>
  );
};

export default TransactionsHeader;
