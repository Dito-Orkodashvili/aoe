import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <Skeleton className="h-8 w-40 mb-6" />

      <Card className="mb-4">
        <CardContent className="space-y-6 text-center">
          <Skeleton className="h-6 w-72 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
          <div className="flex items-center gap-2 justify-center flex-wrap">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="size-8 rounded-md" />
            ))}
          </div>
          <Skeleton className="h-48 w-full max-w-2xl mx-auto" />
        </CardContent>
      </Card>

      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="bg-muted/50 border-b h-12 flex items-center gap-4 px-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 h-14 border-b border-border/30"
          >
            {Array.from({ length: 4 }).map((_, col) => (
              <Skeleton key={col} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
