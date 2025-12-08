"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { TPlayer } from "@/lib/types/player.types";
import { TMap } from "@/lib/types/map.types";
import {
  insertMaps,
  insertMatch,
  insertParticipants,
  insertTournament,
} from "@/lib/supabase/tournament/insert-tournament";
import {
  TournamentDetailsSchema,
  TournamentSchemaType,
} from "@/lib/schemas/tournament.schema";

export async function createTournament(payload: {
  details: TournamentSchemaType;
  participants: TPlayer[];
  maps: TMap[];
}) {
  const supabase = await createClient();

  const parsed = TournamentDetailsSchema.safeParse(payload.details);

  if (!parsed.success) redirect("/tournaments/create?error=invalid");

  const details = parsed.data;

  const slug = slugify(details.name);

  try {
    const tournament = await insertTournament(supabase, details, slug);
    await insertMatch(supabase, tournament.id, details, payload.participants);
    await insertParticipants(supabase, tournament.id, payload.participants);
    await insertMaps(supabase, tournament.id, payload.maps);

    return { slug };
  } catch (err: unknown) {
    console.error("Tournament creation error:", err);

    const errorMap: Record<string, string> = {
      DB_TOURNAMENT_INSERT: "db",
      DB_PARTICIPANTS_INSERT: "participants",
      DB_MAPS_INSERT: "maps",
      DB_SHOWMATCH_INSERT: "showmatch",
    };

    let code = "unknown";

    if (err instanceof Error) {
      code = errorMap[err.message];
    }

    redirect(`/tournaments/create?error=${code}`);
  }
}

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

export async function searchMaps(query: string) {
  const supabase = await createClient();

  if (!query.trim()) return [];

  const { data, error } = await supabase
    .from("maps")
    .select("*")
    .ilike("name", `%${query}%`)
    .limit(10);

  if (error) {
    console.error("Map search error:", error);
    return [];
  }

  return data;
}
