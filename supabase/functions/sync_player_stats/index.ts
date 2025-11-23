import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Admin Supabase client (uses service role key)
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

async function fetchAoE2Stats(profileId: number, matchType: "1v1" | "team") {
  const url = "https://api.ageofempires.com/api/GameStats/AgeII/GetFullStats";

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      gameId: 0,
      matchType: matchType === "1v1" ? 3 : 4,
      profileId,
    }),
  });

  if (!response.ok) {
    console.error(
      "AoE2 API error:",
      response.status,
      "for profile:",
      profileId,
    );
    return null;
  }

  return await response.json();
}

Deno.serve(async () => {
  console.log("Starting player stats sync...");

  const { data: players, error } = await supabase
    .from("players")
    .select("aoe_profile_id");

  if (error) {
    console.error("DB load error:", error);
    return new Response("DB ERROR", { status: 500 });
  }

  for (const p of players) {
    if (!p.aoe_profile_id) {
      console.log("Skipping player without aoe_profile_id");
      continue;
    }
    const stats1v1 = await fetchAoE2Stats(p.aoe_profile_id, "1v1");
    const statsTeam = await fetchAoE2Stats(p.aoe_profile_id, "team");

    if (!stats1v1 || !statsTeam) {
      console.warn("No stats for profile:", p.aoe_profile_id);
      continue;
    }

    // 1v1 info
    const elo1v1 = stats1v1?.user?.elo ?? null;
    const gamesPlayed1v1 = stats1v1?.mpStatList.totalMatches ?? null;
    const wins1v1 = stats1v1?.mpStatList.totalWins ?? null;
    const winStreak1v1 = stats1v1?.mpStatList.currentWinStreak ?? null;

    // team info
    const eloTeam = statsTeam?.user?.elo ?? null;
    const gamesPlayedTeam = statsTeam?.mpStatList.totalMatches ?? null;
    const winsTeam = statsTeam?.mpStatList.totalWins ?? null;
    const winStreakTeam = statsTeam?.mpStatList.currentWinStreak ?? null;

    await supabase.from("player_stats").upsert({
      aoe_profile_id: Number(p.aoe_profile_id),
      elo_1v1: elo1v1,
      elo_team: eloTeam,
      games_played_1v1: gamesPlayed1v1,
      games_played_team: gamesPlayedTeam,
      wins_1v1: wins1v1,
      wins_team: winsTeam,
      win_streak_1v1: winStreak1v1,
      win_streak_team: winStreakTeam,
      raw: { stats1v1, statsTeam },
      last_sync: new Date().toISOString(),
    });

    console.log(`Synced profile ${p.aoe_profile_id}`);
  }

  return new Response("PLAYER STATS SYNC COMPLETE");
});
