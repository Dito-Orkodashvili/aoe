import { createClient } from "@/lib/supabase/server";
import {
  TournamentParticipantsType,
  TournamentStagesType,
  TournamentType,
} from "@/lib/types/tournament.types";
import { PlayerType } from "@/lib/types/player.types";

type TournamentFilled = TournamentType & {
  participants: (TournamentParticipantsType & { player: PlayerType })[];
  stages: TournamentStagesType[];
};

export async function getTournamentsFilled(): Promise<TournamentFilled[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("tournaments").select(`
      *,
      participants:tournament_participants (
        *,
        player:players (*)
      ),
      stages:tournament_stages (*)
    `);
  if (error) throw error;

  return data;
}
