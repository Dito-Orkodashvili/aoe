import { Tables } from "@/lib/supabase/types";

export type TTournament = Tables<"tournaments">;

export type TTournamentParticipant = Tables<"tournament_participants"> & {
  player: Tables<"players">;
};
export type TTournamentMap = Tables<"tournament_maps"> & {
  map: Tables<"maps">;
};
