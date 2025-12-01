"use server";

import { TPlayer } from "@/lib/types/player.types";
import { TSupabase } from "@/lib/types";
import { TMap } from "@/lib/types/map.types";
import { TTournamentDetails } from "@/lib/types/tournament.types";

export async function insertTournament(
  supabase: TSupabase,
  data: TTournamentDetails,
  slug: string,
) {
  const { data: tournament, error } = await supabase
    .from("tournaments")
    .insert({
      name: data.name,
      description: data.description,
      type: data.type,
      format: data.format,
      max_participants: data.max_participants,
      prize_pool: data.prize_pool,
      visibility: data.visibility,
      slug,
      registration_starts_at: data.registration_starts_at ?? null,
      registration_ends_at: data.registration_ends_at ?? null,
      start_date: data.start_date ?? null,
      end_date: data.end_date ?? null,
      config: {},
      status: "upcoming",
    })
    .select("id")
    .single();

  if (error || !tournament) throw new Error("DB_TOURNAMENT_INSERT");

  return tournament;
}

export async function insertParticipants(
  supabase: TSupabase,
  tournamentId: string,
  participants: TPlayer[],
) {
  if (participants.length < 2) return;

  const rows = participants.map((p) => ({
    tournament_id: tournamentId,
    player_id: p.id,
  }));

  const { error } = await supabase.from("tournament_participants").insert(rows);

  if (error) throw new Error("DB_PARTICIPANTS_INSERT");
}

export async function insertMaps(
  supabase: TSupabase,
  tournamentId: string,
  maps: TMap[],
) {
  if (maps.length === 0) return;

  const rows = maps.map((m, index) => ({
    tournament_id: tournamentId,
    map_id: m.id,
    map_order: index + 1,
  }));

  const { error } = await supabase.from("tournament_maps").insert(rows);

  if (error) throw new Error("DB_MAPS_INSERT");
}

export async function insertMatch(
  supabase: TSupabase,
  tournamentId: string,
  data: TTournamentDetails,
  participants: TPlayer[],
) {
  if (data.max_participants !== 2 || participants.length !== 2) return;

  const [p1, p2] = participants;

  const { error } = await supabase.from("matches").insert({
    tournament_id: tournamentId,
    player1_id: p1.id,
    player2_id: p2.id,
    best_of: data.best_of || 21,
    round: "showmatch",
    player1_score: 0,
    player2_score: 0,
  });

  if (error) throw new Error("DB_SHOWMATCH_INSERT");
}
