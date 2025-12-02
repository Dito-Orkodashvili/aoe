import { createClient } from "@/lib/supabase/server";

export async function getPlayerDetails(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .select(`*`)
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Player not found");

  return data;
}
