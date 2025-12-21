import {
  ExtractedMatchInfo,
  ExtractedPlayerInfo,
  MatchHistoryProfile,
  MatchHistoryStat,
} from "@/lib/types/match-history.types";
import { formatDistanceToNow } from "date-fns";
import {
  AoeMatch,
  MatchPlayer,
  MatchTeam,
} from "@/lib/aoe2companion/stats.types";

export function extractMatchInfo(
  matches: MatchHistoryStat[],
  profiles: MatchHistoryProfile[],
): ExtractedMatchInfo[] {
  return matches
    .map((match) => {
      const {
        id,
        mapname,
        completiontime,
        startgametime,
        matchhistorymember,
        matchtype_id,
      } = match;

      const durationSec = completiontime - startgametime;
      const durationMin = Math.floor(durationSec / 60);
      const durationStr = `${durationMin} min`;

      const players: ExtractedPlayerInfo[] = matchhistorymember.map((m) => {
        const additionalPlayerInfo = profiles.find(
          (p) => p.profile_id === m.profile_id,
        );

        return {
          profileId: m.profile_id,
          civilizationId: m.civilization_id,
          oldRating: m.oldrating,
          newRating: m.newrating,
          ratingChange: m.newrating - m.oldrating,
          outcome: m.outcome === 1 ? "win" : "loss",
          teamId: m.teamid,
          name: additionalPlayerInfo?.name ?? "Unknown",
          alias: additionalPlayerInfo?.alias ?? "Unknown",
          country: additionalPlayerInfo?.country ?? "Unknown",
        };
      });

      return {
        id,
        mapName: mapname,
        completionTime: completiontime,
        duration: durationStr,
        players,
        matchTypeId: matchtype_id,
      };
    })
    .filter((m) => m.matchTypeId === 6)
    .sort((a, b) => b.completionTime - a.completionTime);
}

export function didPlayerWin(
  match: AoeMatch,
  profileId: string | number | null,
): boolean {
  if (!profileId) return false;

  return match.teams
    .flatMap((t) => t.players)
    .some((p) => p.profileId === Number(profileId) && p.won);
}

export function timeAgo(unixSeconds: number): string {
  return formatDistanceToNow(unixSeconds * 1000, {
    addSuffix: true,
  });
}

export const groupPlayersByTeam = (players: MatchTeam[]) => {
  const teams: Record<number, MatchPlayer[]> = {};

  for (const p of players) {
    if (!teams[p.teamId]) teams[p.teamId] = [];
    teams[p.teamId] = [...teams[p.teamId], ...p.players];
  }

  return Object.values(teams);
};
