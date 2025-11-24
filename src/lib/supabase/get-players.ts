import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/lib/supabase/types";

export async function getPlayers(): Promise<Tables<"players">[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("players").select();
  if (error) throw error;

  return data;
}
