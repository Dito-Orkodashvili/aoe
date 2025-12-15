"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ChartNoAxesCombined,
  Flag,
  Flame,
  Gamepad2,
  Info,
  LayoutGrid,
  List,
  Mountain,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactElement, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlayerWithStats } from "@/lib/types";
import { clsx } from "clsx";
import { PlayerType } from "@/lib/types/player.types";
import Link from "next/link";
import Image from "next/image";
import { getCivById } from "@/lib/utils/civilization.utils";

interface PlayerListProps {
  players: PlayerWithStats[];
}

const leagueIcons: Record<PlayerType["league"], ReactElement> = {
  bronze: <Trophy size={28} className="text-amber-700" />,
  silver: <Trophy size={28} className="text-zinc-300" />,
  gold: <Trophy size={28} className="text-amber-400" />,
};

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
      <div className="flex justify-between mb-2 items-center gap-4">
        <p className="text-sm md:text-md text-muted-foreground flex gap-3 items-center">
          <span>
            <Info className="text-secondary" />
          </span>{" "}
          რენკირება ხდება ოფიციალური რეიტინგის მიხედვით!
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
          {sortedPlayers.map((player, index) => {
            const favCiv = getCivById(player.fav_civ);

            return (
              <Card
                key={player.id}
                className="overflow-hidden hover:shadow-lg transition-shadow pt-0 pb-0 gap-2"
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage
                        src={
                          player.picture_url ??
                          `/aoe/anonymous_player_${player.gender}.webp`
                        }
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
                      #{index + 1}
                    </Badge>
                    <span
                      className="absolute top-4 right-4 rounded-full bg-muted p-2 border border-border"
                      title={`${player.league} league`}
                    >
                      {leagueIcons[player.league]}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-4 pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3 font-medieval">
                      <Link
                        className="hover:underline hover:text-secondary font-semibold transition-all"
                        href={`/players/${player.id}`}
                      >
                        <h3 className="text-xl font-bold">{player.nickname}</h3>
                      </Link>
                    </div>
                    <div className="bg-border w-full h-[1px]" />
                    <div className="flex items-center gap-2">
                      <ChartNoAxesCombined className="w-5 h-5 text-primary" />
                      <span className="font-semibold">
                        რეიტინგი:{" "}
                        <span className="text-secondary font-bold">
                          {player.one_v_one_stats?.rating ?? "N/A"}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-primary" />
                      <span className="font-semibold">
                        მოგებათა სერია:{" "}
                        {player.one_v_one_stats?.streak ? (
                          <span
                            className={clsx(
                              player.one_v_one_stats?.streak > 0
                                ? "text-green-500"
                                : "text-primary",
                            )}
                          >
                            {player.one_v_one_stats?.streak}
                          </span>
                        ) : (
                          "N/A"
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-primary" />
                      <p className="font-semibold">
                        სულ ბრძოლა:{" "}
                        {player.one_v_one_stats?.wins &&
                        player.one_v_one_stats?.losses
                          ? player.one_v_one_stats?.wins +
                            player.one_v_one_stats?.losses
                          : "N/A"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mountain className="w-5 h-5 text-primary" />
                      <span className="font-semibold">
                        პიკ რეიტინგი:{" "}
                        {player.one_v_one_stats?.highestrating ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flag className="w-5 h-5 text-primary" />
                      <span className="font-semibold">საყვარელი ცივი: </span>
                      {favCiv ? (
                        <a
                          href={`https://ageofempires.fandom.com/wiki/${favCiv.name}`}
                          target="_blank"
                        >
                          <Image
                            src={`/aoe/civs/${favCiv.icon}`}
                            alt={favCiv.name}
                            width={28}
                            height={28}
                            title={favCiv.name}
                          />
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
