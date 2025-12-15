import { createClient } from "@/lib/supabase/server";
import { TournamentType } from "@/lib/types/tournament.types";

export async function getTournaments(): Promise<TournamentType[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("tournaments").select();
  if (error) throw error;

  return data;
}
