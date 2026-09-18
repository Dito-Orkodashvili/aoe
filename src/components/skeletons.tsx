import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function PlayerCardsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card
          key={i}
          className={cn(
            "overflow-hidden pt-0 pb-0 gap-2",
            // the first slot is always the top ranked player
            i === 0 && "ring-2 ring-secondary/40",
          )}
        >
          <CardHeader className="p-0">
            <Skeleton className="aspect-square w-full rounded-none" />
          </CardHeader>
          <CardContent className="px-6 pb-4 pt-0 space-y-3">
            <Skeleton className="h-6 w-32" />
            <div className="bg-border w-full h-[1px]" />
            {Array.from({ length: 6 }).map((_, row) => (
              <div key={row} className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 rounded-sm" />
                <Skeleton className="h-4 w-36" />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
