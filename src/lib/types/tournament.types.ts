import { Tables } from "@/lib/supabase/types";
import { PlayerType } from "@/lib/types/player.types";

export type TournamentType = Tables<"tournaments">;
export type TournamentStagesType = Tables<"tournament_stages">;
export type TournamentParticipantsType = Tables<"tournament_participants">;
export type TournamentMapsType = Tables<"tournament_maps">;
export type TournamentMatchType = Tables<"tournament_matches">;

export type TournamentPlayerType = Pick<
  PlayerType,
  | "id"
  | "nickname"
  | "name"
  | "last_name"
  | "fav_civ"
  | "picture_url"
  | "gender"
  | "tournament_elo"
>;

type TournamentMatch = Pick<
  TournamentMatchType,
  "id" | "best_of" | "score_p1" | "score_p2" | "status"
>;

export type TournamentDetailsType = TournamentType & {
  tournament_stages: (TournamentStagesType & {
    tournament_matches?: TournamentMatch[];
  })[];
  tournament_participants: (TournamentParticipantsType & {
    player: TournamentPlayerType;
  })[];
  tournament_maps: TournamentMapsType[];
};

export type TournamentDetailsTabType =
  | "info"
  | "stage-1"
  | "stage-2"
  | "standings"
  | "participants"
  | "maps"
  | "settings";
