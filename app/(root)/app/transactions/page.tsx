import { type Query } from "@/actions/transactions/transactions";
import TransactionComponent from "@/components/application/transactions/TransactionComponent";
import { Suspense } from "react";
import TransactionsSkeleton from "@/components/application/transactions/TransactionsSkeleton";
type Props = {
  searchParams: Promise<Query>;
};

const transactionsPage = async ({ searchParams }: Props) => {
  return (
    <Suspense fallback={<TransactionsSkeleton />}>
      <TransactionComponent searchParams={searchParams} />
    </Suspense>
  );
};

export default transactionsPage;
