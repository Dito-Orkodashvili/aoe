import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-0">
            <CardContent className="px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0 space-y-6">
                  <Skeleton className="h-6 w-56 max-w-full" />
                  <div className="flex items-center gap-3 flex-wrap">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                </div>
                <Skeleton className="h-4 w-4 rounded-sm" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
