import { PersonalStatResponse, PlayerWithStats } from "@/lib/types";
import { PlayerType } from "@/lib/types/player.types";
import {
  LobbyPlayerWithStats,
  TransformedLobbySlot,
} from "@/lib/types/lobby.types";

const EMPTY_STATS: PersonalStatResponse = {
  result: { code: 0, message: "no stats requested" },
  statGroups: [],
  leaderboardStats: [],
};

export async function getPlayersOfficialStats(
  players: PlayerType[],
): Promise<PersonalStatResponse> {
  const profileIds = players
    .map((p) => p.aoe_profile_id)
    .filter((id): id is string => Boolean(id));

  // the upstream rejects an empty list with a 400
  if (!profileIds.length) return EMPTY_STATS;

  const encoded = encodeURIComponent(JSON.stringify(profileIds));
  const url = `https://aoe-api.worldsedgelink.com/community/leaderboard/GetPersonalStat?title=age2&profile_ids=${encoded}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });

    // on errors the upstream answers with an HTML body, so json() would throw
    if (!res.ok) {
      console.error(`GetPersonalStat failed: ${res.status} ${res.statusText}`);
      return EMPTY_STATS;
    }

    return await res.json();
  } catch (error) {
    console.error("GetPersonalStat request failed", error);
    return EMPTY_STATS;
  }
}

export function mergePlayersWithStats(
  players: PlayerType[],
  stats: PersonalStatResponse,
): PlayerWithStats[] {
  if (!stats?.statGroups?.length) return players;

  return players.map((player) => {
    if (!player.aoe_profile_id) return player;

    const group = stats.statGroups.find((g) =>
      g.members.some((m) => m.profile_id === Number(player.aoe_profile_id)),
    );

    const lb = stats.leaderboardStats.filter(
      (l) => l.statgroup_id === group?.id,
    );

    const one_v_one_stats = lb.find((l) => l.leaderboard_id === 3) ?? null;
    const team_game_stats = lb.find((l) => l.leaderboard_id === 4) ?? null;

    const isMisha = player.id === "548dc028-45f9-49fa-9a86-4f8e65d43cbb";

    return {
      ...player,
      one_v_one_stats: isMisha ? team_game_stats : one_v_one_stats,
      team_game_stats,
    };
  });
}

export function mergeLobbyPlayersWithStats(
  players: TransformedLobbySlot[],
  stats: PersonalStatResponse,
): LobbyPlayerWithStats[] {
  if (!stats || !stats.statGroups?.length) return [];

  return players.map((player) => {
    if (!player.profileid) return player;

    const group = stats.statGroups.find((g) =>
      g.members.some((m) => m.profile_id === player.profileid),
    );

    const lb = stats.leaderboardStats.filter(
      (l) => l.statgroup_id === group?.id,
    );

    const one_v_one = lb.find((l) => l.leaderboard_id === 3) ?? null;
    // const team = lb.find((l) => l.leaderboard_id === 4) ?? null;

    return {
      ...player,
      one_v_one_stats: one_v_one,
    };
  });
}
