"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartNoAxesCombined,
  Flag,
  Flame,
  Gamepad2,
  LayoutGrid,
  List,
  Mountain,
  Trophy,
  Users,
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
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { getCivById } from "@/lib/utils/civilization.utils";
import { anonymousPicture } from "@/lib/utils/player.utils";
import { PlayersListInfo } from "@/components/players-list-info";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlayerListProps {
  players: PlayerWithStats[];
}

type SortBy = "one_v_one" | "team_game";
type ViewMode = "grid" | "list";

const sortOptions: Record<SortBy, string> = {
  one_v_one: "1v1 რეიტინგი",
  team_game: "გუნდური რეიტინგი",
};

const SORT_PARAM = "sort";
const VIEW_PARAM = "view";

const parseSort = (value: string | null): SortBy =>
  value === "team" ? "team_game" : "one_v_one";

const parseView = (value: string | null): ViewMode =>
  value === "list" ? "list" : "grid";

const leagueIcons: Record<PlayerType["league"], ReactElement> = {
  bronze: <Trophy size={28} className="text-amber-700" />,
  silver: <Trophy size={28} className="text-zinc-300" />,
  gold: <Trophy size={28} className="text-amber-400" />,
};

export const PlayersList = ({ players }: PlayerListProps) => {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>(() =>
    parseView(searchParams.get(VIEW_PARAM)),
  );
  const [sortBy, setSortBy] = useState<SortBy>(() =>
    parseSort(searchParams.get(SORT_PARAM)),
  );

  const syncUrl = (next: { sort?: SortBy; view?: ViewMode }) => {
    const params = new URLSearchParams(searchParams.toString());
    const sort = next.sort ?? sortBy;
    const view = next.view ?? viewMode;

    if (sort === "team_game") params.set(SORT_PARAM, "team");
    else params.delete(SORT_PARAM);

    if (view === "list") params.set(VIEW_PARAM, "list");
    else params.delete(VIEW_PARAM);

    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? `${window.location.pathname}?${query}` : window.location.pathname,
    );
  };

  const changeSort = (value: SortBy) => {
    setSortBy(value);
    syncUrl({ sort: value });
  };

  const changeView = (value: ViewMode) => {
    setViewMode(value);
    syncUrl({ view: value });
  };

  const activeStatsKey =
    sortBy === "team_game" ? "team_game_stats" : "one_v_one_stats";
  const activeModeLabel = sortBy === "team_game" ? "Team" : "1v1";

  const sortedPlayers = useMemo(
    () =>
      [...(players ?? [])].sort((a, b) => {
        const eloA = a[activeStatsKey]?.rating ?? 0;
        const eloB = b[activeStatsKey]?.rating ?? 0;

        return eloB - eloA;
      }),
    [players, activeStatsKey],
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <PlayersListInfo />
        <div className="flex gap-2 w-full sm:w-auto">
          <Select
            value={sortBy}
            onValueChange={(value) => changeSort(value as SortBy)}
          >
            <SelectTrigger className="flex-1 sm:flex-none sm:w-[190px] bg-card border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {Object.entries(sortOptions).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => changeView("grid")}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => changeView("list")}
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
                    <Image
                      src={
                        player.picture_url ?? anonymousPicture(player.gender)
                      }
                      alt={player.nickname}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                      priority={index < 4}
                    />
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
                        1v1 რეიტინგი:{" "}
                        <span className="text-secondary font-bold">
                          {player.one_v_one_stats?.rating ?? "N/A"}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-semibold">
                        გუნდური რეიტინგი:{" "}
                        <span className="text-secondary font-bold">
                          {player.team_game_stats?.rating ?? "N/A"}
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
                <TableHead>1v1 Elo</TableHead>
                <TableHead>Team Elo</TableHead>
                <TableHead>Wins/Loses ({activeModeLabel})</TableHead>
                <TableHead>Win Streak ({activeModeLabel})</TableHead>
                <TableHead>Highest Elo ({activeModeLabel})</TableHead>
                <TableHead>League</TableHead>
                <TableHead>Favorite Civ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPlayers.map((player, index) => {
                const favCiv = getCivById(player.fav_civ);
                const activeStats = player[activeStatsKey];

                return (
                  <TableRow key={player.id}>
                    <TableCell>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link
                        href={`/players/${player.id}`}
                        className="hover:underline hover:text-secondary transition-all"
                      >
                        {player.nickname}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">
                      {player.one_v_one_stats?.rating ?? "N/A"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {player.team_game_stats?.rating ?? "N/A"}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {activeStats
                        ? `${activeStats.wins}/${activeStats.losses}`
                        : "N/A"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {activeStats?.streak ?? "N/A"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {activeStats?.highestrating ?? "N/A"}
                    </TableCell>
                    <TableCell>
                      <span
                        className="flex items-center gap-2"
                        title={`${player.league} league`}
                      >
                        {leagueIcons[player.league]}
                        <Badge variant="outline">{player.league}</Badge>
                      </span>
                    </TableCell>
                    <TableCell>
                      {favCiv ? (
                        <span className="flex items-center gap-2">
                          <Image
                            src={`/aoe/civs/${favCiv.icon}`}
                            alt={favCiv.name}
                            width={20}
                            height={20}
                          />
                          {favCiv.name}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
