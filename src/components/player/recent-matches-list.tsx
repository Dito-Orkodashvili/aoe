"use client";

import {
  didPlayerWin,
  groupPlayersByTeam,
} from "@/lib/supabase/match-history/extract-match-info";
import { usePlayerRecentMatches } from "@/hooks/query/use-player-recent-matches";
import {
  capitalize,
  formatDuration,
  getDurationSeconds,
  timeAgoFromISO,
} from "@/lib/utils";
import { clsx } from "clsx";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { Calendar, Clock, Crown, Download, Skull } from "lucide-react";
import Image from "next/image";

interface RecentMatchesListProps {
  profileId: string | null;
}

export const RecentMatchesList = ({ profileId }: RecentMatchesListProps) => {
  const { data: recentMatchesResponse, isLoading } =
    usePlayerRecentMatches(profileId);

  if (isLoading) {
    return (
      <p className="text-muted-foreground text-center py-8">იტვირთება...</p>
    );
  }

  if (!recentMatchesResponse) {
    return (
      <p className="text-muted-foreground text-center py-8">
        უახლესი ბრძლები არ მოიძებნა
      </p>
    );
  }

  const recentMatches = recentMatchesResponse.matches;

  return (
    <div>
      <div className="space-y-4">
        {recentMatches.map((match, index) => {
          const didWin = didPlayerWin(match, profileId);

          const teams = groupPlayersByTeam(match.teams);
          const team1Players = teams[0];
          const team2Players = teams[1];
          const matchDurationSeconds = getDurationSeconds(
            match.started,
            match.finished,
          );

          return (
            <div
              key={index}
              className={clsx(
                `rounded-xl border-2 overflow-hidden`,
                didWin ? "border-green-800" : "border-red-900",
              )}
            >
              <div className="flex items-center gap-4 p-4 border-b border-border/50">
                <ImageWithFallback
                  src={match.mapImageUrl}
                  fallbackSrc={`/aoe/maps/unknown.png`}
                  alt={match.mapName}
                  title={match.mapName}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover w-12 h-12 md:w-16 md:h-16"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">
                      {match.mapName}
                    </span>

                    {didWin ? (
                      <Crown className="text-green-600 w-6 h-6" />
                    ) : (
                      <Skull className="text-red-500 w-6 h-6" />
                    )}
                  </div>
                  <div className="flex justify-center text-sm text-muted-foreground flex-col">
                    {match.finished ? (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 shrink-0 hidden md:block" />
                        {timeAgoFromISO(match.finished)}
                      </span>
                    ) : (
                      <span>არ დამთავრებულა/დაიქრაშა</span>
                    )}
                    {matchDurationSeconds && (
                      <span className="hidden items-center gap-1 md:flex">
                        <Clock className="w-3 h-3" />
                        ხანგრძლივობა: {formatDuration(matchDurationSeconds)} წთ.
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={`https://aoe.ms/replay/?gameId=${match.matchId}&profileId=${profileId}`}
                  className="hidden md:flex self-start gap-2 items-center text-sm text-blue-400 underline"
                >
                  <Download className="text-green-600" width={16} /> ჩანაწერი
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-2 md:gap-4 p-4">
                <div className="space-y-2">
                  <p className="hidden md:block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    გუნდი 1
                  </p>
                  {team1Players?.map((p, pIndex) => {
                    const didWin = didPlayerWin(match, p.profileId);

                    return (
                      <div
                        key={pIndex}
                        className={clsx(
                          "flex items-center justify-between bg-background/50 rounded-lg px-3 py-2",
                          didWin
                            ? "border border-green-800/50"
                            : "border border-red-900/50",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {didWin ? (
                            <Crown className="text-green-600 w-4 h-4" />
                          ) : (
                            <Skull className="text-red-500 w-4 h-4" />
                          )}
                          <div className="flex gap-2">
                            <div className="flex gap-2 items-center">
                              <a
                                href={`https://www.ageofempires.com/stats/?profileId=${p.profileId}&game=age2&matchType=3`}
                                className="font-medium text-foreground hover:text-primary transition-colors text-sm"
                              >
                                {p.name}
                              </a>
                              <Image
                                width={32}
                                height={32}
                                src={p.civImageUrl}
                                title={p.civName}
                                alt={p.civName}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {p.rating}
                          </p>
                          {p.ratingDiff && (
                            <p
                              className={`text-xs font-medium ${p.ratingDiff >= 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              {p.ratingDiff >= 0 && "+"}
                              {p.ratingDiff}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center md:hidden">
                  <span className="text-lg font-bold text-muted-foreground">
                    VS
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="hidden md:block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    გუნდი 2
                  </p>
                  {team2Players?.map((p, pIndex) => {
                    const didWin = didPlayerWin(match, p.profileId);

                    return (
                      <div
                        key={pIndex}
                        className={clsx(
                          "flex items-center justify-between bg-background/50 rounded-lg px-3 py-2",
                          didWin
                            ? "border border-green-800/50"
                            : "border border-red-900/50",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {didWin ? (
                            <Crown className="text-green-600 w-4 h-4" />
                          ) : (
                            <Skull className="text-red-500 w-4 h-4" />
                          )}
                          <div className="flex gap-2">
                            <div className="flex gap-2 items-center">
                              <a
                                href={`https://www.ageofempires.com/stats/?profileId=${p.profileId}&game=age2&matchType=3`}
                                className="font-medium text-foreground hover:text-primary transition-colors text-sm"
                              >
                                {p.name}
                              </a>
                              <Image
                                width={32}
                                height={32}
                                src={p.civImageUrl}
                                title={p.civName}
                                alt={p.civName}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {p.rating}
                          </p>
                          {p.ratingDiff && (
                            <p
                              className={`text-xs font-medium ${p.ratingDiff >= 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              {p.ratingDiff >= 0 && "+"}
                              {p.ratingDiff}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
