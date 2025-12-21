"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, TicketX } from "lucide-react";
import Link from "next/link";
import { useGlobalLeaderboard } from "@/hooks/query/use-global-leaderboard";
import { LeaderboardSkeleton } from "@/components/leaderboard/leaderboard-skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import ReactCountryFlag from "react-country-flag";
import { CountriesFilter } from "@/components/leaderboard/countries-filter";
import Image from "next/image";

const getStreakBadge = (streak: number) => {
  if (streak > 0)
    return (
      <Badge
        variant="outline"
        className="bg-green-500/10 text-green-500 border-green-500/30"
      >
        +{streak}W
      </Badge>
    );
  if (streak < 0)
    return (
      <Badge
        variant="outline"
        className="bg-red-500/10 text-red-500 border-red-500/30"
      >
        {streak}L
      </Badge>
    );
  return (
    <Badge variant="outline" className="bg-muted text-muted-foreground">
      0
    </Badge>
  );
};

export const LeaderboardTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState<string>("all");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const {
    data: leaderboard,
    isLoading,
    isError,
  } = useGlobalLeaderboard({ searchTerm: debouncedSearchTerm, country });

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="მოძებნე მებრძოლი..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border/50 focus:border-amber-500/50 h-12"
            />
          </div>
          <div className="flex-1 max-w-sm">
            <CountriesFilter value={country} onValueChange={setCountry} />
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
          {isLoading ? (
            <LeaderboardSkeleton />
          ) : isError || !leaderboard ? (
            "Error"
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="w-20 text-center">რენკი</TableHead>
                    <TableHead>სახელი</TableHead>
                    <TableHead className="text-right">რეიტინგი</TableHead>
                    <TableHead className="text-right">მოგება</TableHead>
                    <TableHead className="text-right">ბრძოლა</TableHead>
                    <TableHead className="text-center">ქვეყანა</TableHead>
                    <TableHead className="text-center">Streak</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard!.players.map((player) => {
                    const winRate = Math.ceil(
                      (player.wins / player.games) * 100,
                    );
                    return (
                      <TableRow
                        key={player.rank}
                        className="hover:bg-amber-500/5 border-border/30 transition-colors"
                      >
                        <TableCell className="text-center font-medium">
                          <div className="flex items-center justify-center">
                            #{player.rank}
                          </div>
                        </TableCell>
                        <TableCell className="flex gap-3 items-center">
                          <Image
                            src={player.avatarSmallUrl}
                            alt={player.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <a
                            href={`https://www.aoe2insights.com/user/relic/${player.profileId}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-foreground hover:text-amber-400 transition-colors"
                          >
                            {player.name}
                          </a>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-mono font-bold text-amber-400">
                            {player.rating}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-muted-foreground">
                            {winRate}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-muted-foreground">
                            {player.games.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell className="text-center flex items-center justify-center">
                          {player.country === "ru" ? (
                            <span title="ოკუპანტი">
                              <TicketX className="text-xl text-red-600" />
                            </span>
                          ) : (
                            <ReactCountryFlag
                              className="text-xl"
                              countryCode={player.country}
                              aria-label={player.country}
                              title={player.country}
                              svg
                            />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {getStreakBadge(player.streak)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {leaderboard!.players.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    მოთამაშე &#34;{searchTerm}&#34; არ მოიძებნა
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
