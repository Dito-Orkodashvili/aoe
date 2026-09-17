import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

// cached so the page and generateMetadata share a single query per request
export const getPlayerById = cache(async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .select(`*`)
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Player not found");

  return data;
});
