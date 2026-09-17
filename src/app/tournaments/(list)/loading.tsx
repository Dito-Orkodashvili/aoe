import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

export default function Loading() {
  return (
    <section className="py-4 md:py-8 px-4 mt-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="w-8 h-8 text-primary" />
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground">
            მიმდინარე და მომავალი ტურნირები
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border-2 pt-4 h-[450px]">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-8 w-20" />
                </div>
                <div className="border-t border-border" />
                <div className="space-y-1">
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-center justify-center my-2">
                  <Skeleton className="w-22 h-22 md:w-26 md:h-26 rounded-full" />
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="w-22 h-22 md:w-26 md:h-26 rounded-full" />
                </div>
                <Skeleton className="h-5 w-32 mx-auto" />
                <Skeleton className="h-9 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
