"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Gamepad2,
  Info,
  LayoutGrid,
  List,
  Swords,
  Target,
  Trophy,
} from "lucide-react";
import { Tables } from "@/lib/supabase/types";
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

type Player = Tables<"players"> & {
  player_stats: Tables<"player_stats"> | null;
};

interface PlayerListProps {
  players: Player[];
}

export const PlayersList = ({ players }: PlayerListProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const sortedPlayers = useMemo(
    () =>
      players?.sort((a, b) => {
        const eloA = a.player_stats?.elo_1v1 ?? 0;
        const eloB = b.player_stats?.elo_1v1 ?? 0;

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
                      ELO: {player.player_stats?.elo_1v1 ?? "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      Wins/Loses:{" "}
                      {player.player_stats?.wins_1v1 &&
                      player.player_stats?.games_played_1v1
                        ? `${player.player_stats?.wins_1v1}/${
                            player.player_stats?.games_played_1v1 -
                            player.player_stats?.wins_1v1
                          }`
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      Win Streak: {player.player_stats?.win_streak_1v1 ?? "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      Battles: {player.player_stats?.games_played_1v1 ?? "N/A"}
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
                <TableHead>Battles</TableHead>
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
                    {player.player_stats?.elo_1v1 ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {player.player_stats?.wins_1v1 &&
                    player.player_stats?.games_played_1v1
                      ? `${player.player_stats?.wins_1v1}/${
                          player.player_stats?.games_played_1v1 -
                          player.player_stats?.wins_1v1
                        }`
                      : "N/A"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {player.player_stats?.win_streak_1v1 ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {player.player_stats?.games_played_1v1 ?? "N/A"}
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
