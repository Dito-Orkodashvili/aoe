"use server";

import { TournamentBasicInfoType } from "@/lib/schemas/tournament/basic-info.schema";
import { SupabaseType } from "@/lib/types/supabase.types";

interface InsertTournamentParams {
  supabase: SupabaseType;
  tournamentInfo: TournamentBasicInfoType;
  slug: string;
  created_by: string;
}

export async function insertTournament({
  supabase,
  tournamentInfo,
  slug,
  created_by,
}: InsertTournamentParams) {
  const { data: tournament, error } = await supabase
    .from("tournaments")
    .insert({
      title: tournamentInfo.title,
      slug,
      description: tournamentInfo.description,
      cover_image_url: tournamentInfo.cover_image_url ?? null,
      organizer: tournamentInfo.organizer ?? null,
      status: "draft" as const,
      visibility: tournamentInfo.visibility,
      team_size: tournamentInfo.team_size,
      default_best_of: tournamentInfo.default_best_of,
      prize_pool: tournamentInfo.prize_pool,
      max_participants: tournamentInfo.max_participants,
      start_date: tournamentInfo.start_date ?? null,
      end_date: tournamentInfo.end_date ?? null,
      registration_starts_at: tournamentInfo.registration_starts_at ?? null,
      registration_ends_at: tournamentInfo.registration_ends_at ?? null,
      is_registration_open: false,
      created_by,
    })
    .select("id")
    .single();

  if (error || !tournament) throw new Error("DB_TOURNAMENT_INSERT");

  return tournament;
}
