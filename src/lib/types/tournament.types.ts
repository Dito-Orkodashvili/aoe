import { Tables } from "@/lib/supabase/types";
import * as z from "zod";
import { TournamentDetailsSchema } from "@/lib/schemas/tournament.schema";

export type TTournament = Tables<"tournaments">;

export type TTournamentDetails = z.infer<typeof TournamentDetailsSchema>;

export type TDetailsErrors = z.inferFormattedError<
  typeof TournamentDetailsSchema
>;

export type TTournamentParticipant = Tables<"tournament_participants"> & {
  player: Tables<"players">;
};
export type TTournamentMap = Tables<"tournament_maps"> & {
  map: Tables<"maps">;
};
