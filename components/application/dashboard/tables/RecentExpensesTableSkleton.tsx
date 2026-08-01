import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export function RecentExpensesTableSkeleton({
  rowsCount = 4,
}: {
  rowsCount?: number;
}) {
  return (
    <div className="bg-card border pb-2 border-border rounded-lg shadow-xs">
      <div className="flex items-center gap-4 pl-8 py-4 mt-2">
        <Skeleton className="h-6 w-6 rounded-md" />
        <Skeleton className="h-5 w-40" />
      </div>

      <ScrollArea className="overflow-y-auto h-50">
        <div className="mx-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%]">
                  <Skeleton className="h-4 w-8" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead className="w-[5%]">
                  <Skeleton className="h-4 w-12" />
                </TableHead>
                <TableHead className="text-right max-w-12">
                  <Skeleton className="h-4 w-10 ml-auto" />
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="h-fit max-h-36 overflow-y-auto">
              {Array.from({ length: rowsCount }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}

export default RecentExpensesTableSkeleton;
