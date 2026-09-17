import { PlayerStatCard } from "@/components/player/stat-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const statLabels = [
  "მიმდინარე რეიტინგი",
  "პიკ რეიტინგი",
  "მოგებების სერია",
  "ბრძოლების რაოდენობა",
  "საყვარელი ცივი",
];

export default function Loading() {
  return (
    <>
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl" />
        <Card className="border-0 bg-card/50 backdrop-blur-sm p-0">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-2xl" />
              <div className="flex-1 w-full">
                <Skeleton className="h-10 w-56" />
                <Skeleton className="h-5 w-40 mb-4" />
                <div className="flex flex-wrap gap-4 mb-6">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-[34px] w-32 rounded-lg" />
                  <Skeleton className="h-[34px] w-44 rounded-lg" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-4 gap-4">
        <CardHeader>
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[26px] w-2/3" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {statLabels.map((label) => (
          <PlayerStatCard
            key={label}
            icon={<Skeleton className="w-8 h-8 mx-auto mb-2 rounded-md" />}
            value={<Skeleton className="h-9 w-20 mx-auto" />}
            label={label}
          />
        ))}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 h-10 rounded-md bg-muted p-1 gap-1">
          <Skeleton className="h-full w-full rounded-sm" />
          <Skeleton className="h-full w-full rounded-sm" />
          <Skeleton className="h-full w-full rounded-sm" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-56" />
          </CardHeader>
          <CardContent>
            <div className="py-8">
              <Skeleton className="h-6 w-40 mx-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
