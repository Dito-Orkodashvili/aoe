import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-1">
      <main className="flex-1 overflow-y-auto">
        <section className="relative overflow-hidden pt-12 pb-8 px-4 flex items-center bg-hero bg-[url(/aoe/aoe_page_hero_bg.jpeg)] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex flex-col items-center gap-4 py-4">
              <Skeleton className="h-10 w-80 max-w-full bg-white/10" />
              <Skeleton className="h-5 w-64 max-w-full bg-white/10" />
              <div className="flex gap-3">
                <Skeleton className="h-8 w-28 bg-white/10" />
                <Skeleton className="h-8 w-28 bg-white/10" />
              </div>
              <Skeleton className="h-10 w-40 bg-white/10" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        <div className="space-y-4 max-w-6xl mx-auto mb-8 container px-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-56" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        </div>
      </main>
    </section>
  );
}
