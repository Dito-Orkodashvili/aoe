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

interface CivsStatsListProps {
  profileId: string | null;
}

export const CivStatsList = ({ profileId }: CivsStatsListProps) => {
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
        ცივილიზაციების სტატისტიკა არ მოიძებნა
      </p>
    );
  }

  const rm1v1Stats = civsAndMapStatsResponse?.stats.find(
    ({ leaderboardId }) => leaderboardId === "rm_1v1",
  );

  const playerCivStats = rm1v1Stats?.civ ?? [];

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
          {playerCivStats.map((civ, index) => {
            const winRate = Math.floor((civ.wins / civ.games) * 100);
            return (
              <TableRow key={index}>
                <TableCell className="flex gap-4">
                  <Image
                    src={civ.civImageUrl}
                    alt={civ.civName}
                    width={32}
                    height={32}
                  />
                  <Badge variant="outline">{civ.civName}</Badge>
                </TableCell>
                <TableCell className="font-medium">{civ.games}</TableCell>
                <TableCell className="font-medium">{civ.wins}</TableCell>
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
