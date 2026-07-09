import TransactionsFilters from "@/components/application/transactions/TransactionsFilters";

const TransactionsHeader = () => {
  return (
    <div className="flex mb-6 gap-3">
      <h2 className="text-2xl flex-1  font-normal ">Transactions Activity</h2>

      <TransactionsFilters />
    </div>
  );
};

export default TransactionsHeader;
