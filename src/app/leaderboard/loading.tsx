import { LeaderboardSkeleton } from "@/components/leaderboard/leaderboard-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="flex-1 max-w-md">
            <Skeleton className="h-12 w-full sm:w-[300px]" />
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
          <LeaderboardSkeleton />
        </div>
      </div>
    </section>
  );
}
