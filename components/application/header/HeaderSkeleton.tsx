import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
  return (
    <header className="flex justify-between items-center md:py-7 py-3 px-8 border-b border-border/40">
      <div>
        <div className="block md:hidden">
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
        <div className="hidden md:block md:space-y-2">
          <Skeleton className="h-7 w-56 rounded-md" />
          <Skeleton className="h-4 w-96 rounded-md" />
        </div>
      </div>
      <div className="gap-18 flex items-center">
        <div className="flex items-center gap- md:mr-4 sm:gap-5">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="ml-2 sm:ml-0 md:hidden">
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderSkeleton;
