import { createClient } from "@/lib/supabase/server";
import { TTournament } from "@/lib/types/tournament.types";

export async function getTournaments(): Promise<TTournament[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("tournaments").select();
  if (error) throw error;

  return data;
}
