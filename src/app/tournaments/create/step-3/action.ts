"use server";

import { createClient } from "@/lib/supabase/server";
import { TournamentParticipantsSchema } from "@/lib/schemas/tournament/participants.schema";
import { PlayerType } from "@/lib/types/player.types";
import { ActionResultType } from "@/lib/types/action.types";
import { ActionErrorCode } from "@/lib/utils/error.constants";
import { TeamIdButtonValueType } from "@/components/tournament/team-id-button";

export async function addParticipantsAction(
  participants: (PlayerType & {
    team_id: TeamIdButtonValueType;
    seed?: string;
  })[],
  tournamentId: string,
): Promise<ActionResultType> {
  const supabase = await createClient();

  const { data: stage, error: stageError } = await supabase
    .from("tournament_stages")
    .select(
      `
        id,
        format,
        config,
        status,
        tournaments (
          default_best_of
        )
      `,
    )
    .eq("tournament_id", tournamentId)
    .eq("stage_number", 1)
    .single();

  if (stageError || !stage) {
    return {
      ok: false,
      error: { code: ActionErrorCode.STAGE_NOT_FOUND },
    };
  }

  const parsed = TournamentParticipantsSchema.safeParse({
    participants: participants,
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: { code: ActionErrorCode.VALIDATION },
    };
  }

  const parsedParticipants = parsed.data;

  const rows = parsedParticipants.participants.map((p) => ({
    tournament_id: tournamentId,
    player_id: p.id,
    seed: p.seed,
    team_id: p.team_id || null,
  }));

  // Delete same participants first to avoid duplication.
  const { error: deleteError } = await supabase
    .from("tournament_participants")
    .delete()
    .eq("tournament_id", tournamentId);

  if (deleteError) {
    return {
      ok: false,
      error: { code: ActionErrorCode.DB_ERROR },
    };
  }

  const { data: participantsFromDb, error } = await supabase
    .from("tournament_participants")
    .insert(rows)
    .select("id, player_id, team_id");

  if (error || !participantsFromDb) {
    return {
      ok: false,
      error: {
        code: ActionErrorCode.DB_ERROR,
        message: "Failed to create participants",
      },
    };
  }

  // We should only create match if it's a showmatch.
  if (stage.format !== "showmatch") {
    return { ok: true };
  }

  if (participants.length < 2 || participants.length % 2 !== 0) {
    return {
      ok: false,
      error: {
        code: ActionErrorCode.SHOWMATCH_REQUIRES_EVEN_COMPETITORS,
      },
    };
  }

  // Guard: do not create match twice
  const { data: existingMatch } = await supabase
    .from("tournament_matches")
    .select("id")
    .eq("stage_id", stage.id)
    .limit(1)
    .maybeSingle();

  if (existingMatch) {
    return { ok: true };
  }

  const competitorsMap = new Map<number | string, typeof participantsFromDb>();

  for (const p of participantsFromDb) {
    const key = p.team_id ?? p.player_id;
    if (!competitorsMap.has(key)) {
      competitorsMap.set(key, []);
    }
    competitorsMap.get(key)!.push(p);
  }

  const competitors = [...competitorsMap.values()];

  const [compA, compB] = competitors;

  const bestOf = stage.tournaments?.default_best_of ?? 5;

  const { error: matchError } = await supabase
    .from("tournament_matches")
    .insert({
      stage_id: stage.id,
      participant1_id: compA[0].id,
      participant2_id: compB[0].id,
      best_of: bestOf,
      status: "pending",
      match_number: 1,
      round: 1,
    });

  if (matchError) {
    return {
      ok: false,
      error: {
        code: ActionErrorCode.DB_ERROR,
        message: "Failed to create match",
      },
    };
  }

  return { ok: true };
}
