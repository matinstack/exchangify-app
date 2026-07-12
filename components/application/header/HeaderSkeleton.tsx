import { Skeleton } from "@/components/ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <header className={"flex justify-between h-16"}>
      <div className="space-y-4">
        <Skeleton className="h-6 w-82 bg-muted" />
        <Skeleton className="h-4 w-96 bg-muted" />
      </div>
      <div className={"flex gap-24"}>
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-18" />
      </div>
    </header>
  );
};

export default HeaderSkeleton;
