import { PlayerCardsSkeleton } from "@/components/skeletons";
import { PlayersListInfo } from "@/components/players-list-info";
import { Skeleton } from "@/components/ui/skeleton";

export function PlayersListSkeleton() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <PlayersListInfo />
        <div className="flex gap-2 w-full sm:w-auto">
          <Skeleton className="h-10 flex-1 sm:flex-none sm:w-[190px]" />
          <Skeleton className="size-9" />
          <Skeleton className="size-9" />
        </div>
      </div>
      <PlayerCardsSkeleton />
    </>
  );
}
