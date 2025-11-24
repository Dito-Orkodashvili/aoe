"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Info,
  LayoutGrid,
  List,
  Mountain,
  Swords,
  Target,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlayerWithStats } from "@/lib/types";

interface PlayerListProps {
  players: PlayerWithStats[];
}

export const PlayersList = ({ players }: PlayerListProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const sortedPlayers = useMemo(
    () =>
      players?.sort((a, b) => {
        const eloA = a.one_v_one_stats?.rating ?? 0;
        const eloB = b.one_v_one_stats?.rating ?? 0;

        return eloB - eloA;
      }),
    [players],
  );

  return (
    <div>
      <div className="flex justify-between mb-6 items-center gap-4">
        <p className="text-md md:text-xl text-muted-foreground flex gap-3 items-center">
          <span>
            <Info className="text-primary" />
          </span>{" "}
          Player rankings are based on official ratings
        </p>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedPlayers.map((player, index) => (
            <Card
              key={player.id}
              className="overflow-hidden hover:shadow-lg transition-shadow pt-0 pb-0 gap-2"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Avatar className="w-full h-full rounded-none">
                    <AvatarImage
                      src={player.picture_url ?? ""}
                      alt={player.nickname}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-none text-4xl">
                      {player.nickname
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Rank #{index + 1}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-4 pt-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{player.nickname}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      ELO: {player.one_v_one_stats?.rating ?? "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      Wins/Loses:{" "}
                      {player.one_v_one_stats?.wins &&
                      player.one_v_one_stats?.losses
                        ? `${player.one_v_one_stats?.wins}/${
                            player.one_v_one_stats?.losses
                          }`
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      Win Streak: {player.one_v_one_stats?.streak ?? "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mountain className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      Highest ELO:{" "}
                      {player.one_v_one_stats?.highestrating ?? "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Swords className="w-5 h-5 text-primary" />
                    <span>League: {player.league}</span>
                  </div>

                  <div className="pt-2 border-t border-border flex gap-3">
                    <p className="text-sm text-muted-foreground mb-1">
                      Favorite Civilization:
                    </p>
                    <Badge variant="secondary">{player.fav_civ}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Elo</TableHead>
                <TableHead>Wins/Loses</TableHead>
                <TableHead>Win Streak</TableHead>
                <TableHead>Highest Elo</TableHead>
                <TableHead>League</TableHead>
                <TableHead>Favorite Civ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player, index) => (
                <TableRow key={player.id}>
                  <TableCell>
                    <Badge variant="outline">#{index + 1}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {player.nickname}
                  </TableCell>
                  <TableCell className="font-medium">
                    {player.one_v_one_stats?.rating ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {player.one_v_one_stats?.wins &&
                    player.one_v_one_stats?.losses
                      ? `${player.one_v_one_stats?.wins}/${
                          player.one_v_one_stats?.losses
                        }`
                      : "N/A"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {player.one_v_one_stats?.streak ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {player.one_v_one_stats?.highestrating ?? "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{player.league}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{player.fav_civ}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
