import TransactionsHeader from "@/components/application/transactions/TransactionsHeader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const TransactionsSkeleton = () => {
  return (
    <div className="py-9">
      <div className="flex justify-between mb-9">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-148" />
      </div>
      <Table>
        <TableCaption>
          <Skeleton className="w-64 h-4" />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="h-4 w-12" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-12" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-12" />
            </TableHead>
            <TableHead className="w-[20%]">
              <Skeleton className="h-4 w-12" />
            </TableHead>
            <TableHead className="w-[18%]">
              <Skeleton className="h-4 w-12" />
            </TableHead>
            <TableHead className="w-[10%]">
              <Skeleton className="h-4 w-12" />
            </TableHead>
            <TableHead className="text-right max-w-12">
              <Skeleton className="h-4 w-12" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-8 w-8 rounded-full" />
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-2 w-16" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-2 w-22" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-2 w-22" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </TableCell>
              <TableCell className="text-right max-w-12">
                <Skeleton className="h-6 w-6 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsSkeleton;
