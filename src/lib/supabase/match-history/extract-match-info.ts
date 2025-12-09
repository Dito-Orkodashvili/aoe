import {
  ExtractedMatchInfo,
  ExtractedPlayerInfo,
  MatchHistoryProfile,
  MatchHistoryStat,
} from "@/lib/types/match-history.types";
import { formatDistanceToNow } from "date-fns";

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

export const didPlayerWin = (
  profileId: string | null,
  players: ExtractedPlayerInfo[],
) => {
  const player = players.find((p) => p.profileId.toString() === profileId);
  if (!player) return false;

  return player.outcome === "win";
};

export function timeAgo(unixSeconds: number): string {
  return formatDistanceToNow(unixSeconds * 1000, {
    addSuffix: true,
  });
}

export const groupPlayersByTeam = (players: ExtractedPlayerInfo[]) => {
  const teams: Record<number, typeof players> = {};

  for (const p of players) {
    if (!teams[p.teamId]) teams[p.teamId] = [];
    teams[p.teamId].push(p);
  }

  return Object.values(teams);
};
