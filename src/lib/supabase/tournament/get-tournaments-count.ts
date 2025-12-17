import { createClient } from "@/lib/supabase/server";

export async function getTournamentsCount(): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("tournaments")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error(error);
    return 0;
  }
  return count ?? 0;
}
