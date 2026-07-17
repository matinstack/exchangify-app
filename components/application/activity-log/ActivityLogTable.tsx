import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";

import { format } from "date-fns";
import { activityConfig } from "@/lib/activity-config";
import { Badge } from "@/components/ui/badge";
import { ActivityLogSchemaType } from "@/db/schema";
import ActivityFilters from "@/components/application/activity-log/ActivityFilters";
import PagePagination from "@/components/shared/PagePagination";

type Props = {
  activities: ActivityLogSchemaType[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

const ActivityLogTable = ({ activities, pagination }: Props) => {
  return (
    <>
      <ActivityFilters />

      <Table>
        <TableCaption>test</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((act) => {
            const config = activityConfig[act.action];
            const Icon = config.icon;

            return (
              <TableRow key={act.id}>
                <TableCell>
                  <p>{format(act.createdAt, "MMM dd, yyyy")}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(act.createdAt, "HH:mm")}
                  </p>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      config.status === "success"
                        ? "default"
                        : config.status === "warning"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {config.status}
                  </Badge>
                </TableCell>

                <TableCell className="capitalize">{act.entityType}</TableCell>

                <TableCell className="text-muted-foreground">
                  {config.description}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Icon className="size-4" />
                    {config.label}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {pagination.totalPages > 1 && <PagePagination pagination={pagination} />}
    </>
  );
};

export default ActivityLogTable;
