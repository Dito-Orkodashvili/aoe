import { PersonalStatResponse, PlayerWithStats } from "@/lib/types";
import { PlayerType } from "@/lib/types/player.types";

export async function getPlayerOfficialStats(
  profileIds: number[],
): Promise<PersonalStatResponse> {
  const encoded = encodeURIComponent(JSON.stringify(profileIds));

  const url = `https://aoe-api.worldsedgelink.com/community/leaderboard/GetPersonalStat?title=age2&profile_ids=${encoded}`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  return res.json();
}

export function mergePlayerWithStats(
  player: PlayerType,
  stats: PersonalStatResponse,
): PlayerWithStats {
  if (!player?.aoe_profile_id) return player;

  const group = stats.statGroups.find((g) =>
    g.members.some((m) => m.profile_id === Number(player.aoe_profile_id)),
  );

  const lb = stats.leaderboardStats.filter((l) => l.statgroup_id === group?.id);

  const one_v_one = lb.find((l) => l.leaderboard_id === 3) ?? null;
  const team = lb.find((l) => l.leaderboard_id === 4) ?? null;

  return {
    ...player,
    one_v_one_stats: one_v_one,
    team_game_stats: team,
  };
}
