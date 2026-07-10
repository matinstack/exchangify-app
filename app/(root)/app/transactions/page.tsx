import { type Query } from "@/actions/dashboard/dashboard";
import TransactionComponent from "@/components/application/transactions/TransactionComponent";
import { Suspense } from "react";
type Props = {
  searchParams: Promise<Query>;
};

const transactionsPage = async ({ searchParams }: Props) => {
  return (
    <Suspense fallback={"Loading"}>
      <TransactionComponent searchParams={searchParams} />
    </Suspense>
  );
};

export default transactionsPage;
