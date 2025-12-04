import { createClient } from "@/lib/supabase/server";

export async function getAllProfileIds() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .select("aoe_profile_id")
    .not("aoe_profile_id", "is", null);

  if (error) throw error;

  return data.map((p) => p.aoe_profile_id).filter(Boolean);
}
