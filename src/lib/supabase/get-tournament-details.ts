import { createClient } from "@/lib/supabase/server";

async function fetchTournamentRaw(slug: string) {
  const supabase = await createClient();

  return supabase
    .from("tournaments")
    .select(
      `
                *,
                tournament_participants (
                  *,
                  player:players!player_id (*)
                ),
                tournament_maps (
                  *,
                  map:maps!map_id (*)
                ),
                matches (
                  *,
                  player1:players!player1_id (*),
                  player2:players!player2_id (*),
                  map:maps!map_id (*),
                  match_games (
                    *,
                    map:maps!map_id (*),
                    winner:players!winner_id (*)
                  )
                )
              `,
    )
    .eq("slug", slug)
    .single();
}

type TournamentRawResult = Awaited<ReturnType<typeof fetchTournamentRaw>>;
type TournamentData = TournamentRawResult["data"];

function transformTournament(data: TournamentData) {
  return {
    ...data,
    participants: data?.tournament_participants ?? [],
    maps: data?.tournament_maps ?? [],
    matches: data?.matches ?? [],
  };
}

export type TTournamentInfo = ReturnType<typeof transformTournament>;

export async function getTournamentDetails(
  slug: string,
): Promise<TTournamentInfo> {
  const { data, error } = await fetchTournamentRaw(slug);

  if (error) throw error;
  if (!data) throw new Error("Tournament not found");

  return transformTournament(data);
}
