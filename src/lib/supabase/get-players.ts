import { createClient } from "@/lib/supabase/server";
import { TPlayer } from "@/lib/types/player.types";

export async function getPlayers(): Promise<TPlayer[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("players").select();
  if (error) throw error;

  return data;
}
