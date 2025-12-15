"use server";

import { createClient } from "@/lib/supabase/server";

export async function searchPlayers(query: string) {
  const supabase = await createClient();

  if (!query.trim()) return [];

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .ilike("nickname", `%${query}%`)
    .limit(10);

  if (error) {
    console.error("Player search error:", error);
    return [];
  }

  return data;
}
