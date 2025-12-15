"use server";

import { Database } from "@/lib/supabase/types";
import { SupabaseType } from "@/lib/types/supabase.types";

type TournamentStageInsert =
  Database["public"]["Tables"]["tournament_stages"]["Insert"];

interface InsertStageParams {
  supabase: SupabaseType;
  stages: TournamentStageInsert[];
  tournamentId: string;
}

export async function insertStages({
  supabase,
  stages,
  tournamentId,
}: InsertStageParams) {
  // TODO: Extract removing to a separate function
  const { error: deleteError } = await supabase
    .from("tournament_stages")
    .delete()
    .eq("tournament_id", tournamentId);

  const { data: tournament, error } = await supabase
    .from("tournament_stages")
    .insert(stages);

  if (error || deleteError) throw new Error("DB_STAGES_INSERT");

  return tournament;
}
