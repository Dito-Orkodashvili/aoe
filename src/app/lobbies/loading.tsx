import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-1 mb-8 h-10 rounded-md bg-muted p-1">
        <Skeleton className="h-full w-full rounded-sm" />
        <Skeleton className="h-full w-full rounded-sm" />
      </div>

      <Card className="p-2 mb-4">
        <CardContent className="flex flex-wrap gap-4 w-full px-0 items-center">
          {[36, 24, 20].map((width, i) => (
            <div key={width} className="flex items-center gap-4">
              {i > 0 && <div className="bg-border w-[1px] h-[1rem]" />}
              <div className="flex gap-2 items-center">
                <Skeleton className="size-4 rounded-[4px]" />
                <Skeleton className="h-3" style={{ width: `${width * 4}px` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="rounded-lg border bg-card overflow-hidden w-full h-[600px]">
        <div className="bg-muted/50 border-b h-12 flex items-center gap-4 px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 border-b border-border/30"
            style={{ height: "56.8px" }}
          >
            {Array.from({ length: 6 }).map((_, col) => (
              <Skeleton key={col} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
