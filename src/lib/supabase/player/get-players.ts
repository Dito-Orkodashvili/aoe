import { createClient } from "@/lib/supabase/server";
import { PlayerType } from "@/lib/types/player.types";

export async function getPlayers(): Promise<PlayerType[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("players").select();
  if (error) throw error;

  return data;
}
