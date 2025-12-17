import { createClient } from "@/lib/supabase/server";

export async function getPlayersCount(): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("players")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error(error);
    return 0;
  }

  return count ?? 0;
}
