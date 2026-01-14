import { createClient } from "@/lib/supabase/server";

export async function getPlayerByUserId(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .select(`*`)
    .eq("user_id", id)
    .single();

  if (error || !data) return null;

  return data;
}
