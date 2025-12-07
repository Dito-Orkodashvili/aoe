import {
  ExtractedMatchInfo,
  MatchHistoryResponse,
} from "@/lib/types/match-history.types";
import { extractMatchInfo } from "@/lib/supabase/match-history/extract-match-info";

const API_URL =
  "https://aoe-api.worldsedgelink.com/community/leaderboard/getRecentMatchHistory";

export async function getPlayerMatchHistory(
  profileId: string,
): Promise<ExtractedMatchInfo[]> {
  const encodedId = encodeURIComponent(JSON.stringify([profileId]));

  const url = `${API_URL}?title=age2&profile_ids=${encodedId}`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch match history");

  const json: MatchHistoryResponse = await res.json();

  return extractMatchInfo(json.matchHistoryStats, json.profiles);
}
