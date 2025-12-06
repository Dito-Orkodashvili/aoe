import { PersonalStatResponse, PlayerWithStats } from "@/lib/types";
import { TPlayer } from "@/lib/types/player.types";
import {
  LobbyPlayerWithStats,
  LobbySlot,
  LobbySlots,
  TransformedLobbySlot,
} from "@/lib/types/lobby.types";

export async function getPlayersOfficialStats(
  players: TPlayer[],
): Promise<PersonalStatResponse> {
  const profileNames = players
    .filter((p) => p.steam_id)
    .map((p) => `/steam/${p.steam_id}`);

  const encoded = encodeURIComponent(JSON.stringify(profileNames));

  const url = `https://aoe-api.worldsedgelink.com/community/leaderboard/GetPersonalStat?title=age2&profile_names=${encoded}`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  return res.json();
}

export function mergePlayersWithStats(
  players: TPlayer[],
  stats: PersonalStatResponse,
): PlayerWithStats[] {
  return players.map((player) => {
    if (!player.steam_id) return player;

    const profileName = `/steam/${player.steam_id}`;

    const group = stats.statGroups.find((g) =>
      g.members.some((m) => m.name === profileName),
    );

    const lb = stats.leaderboardStats.filter(
      (l) => l.statgroup_id === group?.id,
    );

    const one_v_one_stats = lb.find((l) => l.leaderboard_id === 3) ?? null;
    const team_stats = lb.find((l) => l.leaderboard_id === 4) ?? null;

    const isMisha = player.id === "548dc028-45f9-49fa-9a86-4f8e65d43cbb";

    return {
      ...player,
      one_v_one_stats: isMisha ? team_stats : one_v_one_stats,
      team_stats: team_stats,
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
