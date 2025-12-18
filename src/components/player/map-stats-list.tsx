"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { usePlayerCivAndMapStats } from "@/hooks/query/use-player-civ-and-map-stats";

interface MapStatsListProps {
  profileId: string | null;
}

export const MapStatsList = ({ profileId }: MapStatsListProps) => {
  const { data: civsAndMapStatsResponse, isLoading } =
    usePlayerCivAndMapStats(profileId);

  if (isLoading) {
    return (
      <p className="text-muted-foreground text-center py-8">იტვირთება...</p>
    );
  }

  if (!civsAndMapStatsResponse) {
    return (
      <p className="text-muted-foreground text-center py-8">
        რუკების სტატისტიკა არ მოიძებნა
      </p>
    );
  }

  const rm1v1Stats = civsAndMapStatsResponse?.stats.find(
    ({ leaderboardId }) => leaderboardId === "rm_1v1",
  );

  const playerMapStats = rm1v1Stats?.map ?? [];

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ცივილიზაცია</TableHead>
            <TableHead>ბრძოლა</TableHead>
            <TableHead>გამარჯვება</TableHead>
            <TableHead className="w-40">გამარჯვების %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playerMapStats.map((map, index) => {
            const winRate = Math.floor((map.wins / map.games) * 100);
            return (
              <TableRow key={index}>
                <TableCell className="flex gap-4">
                  <Image
                    src={map.mapImageUrl}
                    alt={map.mapName}
                    width={32}
                    height={32}
                  />
                  <Badge variant="outline">{map.mapName}</Badge>
                </TableCell>
                <TableCell className="font-medium">{map.games}</TableCell>
                <TableCell className="font-medium">{map.wins}</TableCell>
                <TableCell className="font-medium">
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {winRate}%
                      </span>
                    </div>
                    <Progress value={winRate} className="h-2" />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
