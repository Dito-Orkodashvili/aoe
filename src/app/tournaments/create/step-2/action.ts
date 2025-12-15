"use server";

import { createClient } from "@/lib/supabase/server";
import {
  TournamentStagesSchema,
  TournamentStagesSchemaType,
} from "@/lib/schemas/tournament/stage-configuration.schema";
import { insertStages } from "@/lib/supabase/tournament/insert-tournament-stage";
import { Database } from "@/lib/supabase/types";
import { ActionResultType } from "@/lib/types/action.types";
import { ActionErrorCode } from "@/lib/utils/error.constants";

type TournamentStageInsert =
  Database["public"]["Tables"]["tournament_stages"]["Insert"];

export async function createStagesAction(
  stagesConfigInfo: TournamentStagesSchemaType,
  tournamentId: string,
): Promise<ActionResultType> {
  const supabase = await createClient();

  const parsed = TournamentStagesSchema.safeParse(stagesConfigInfo);

  if (!parsed.success) {
    return {
      ok: false,
      error: { code: ActionErrorCode.VALIDATION },
    };
  }

  const stagesConfig = parsed.data;

  const stages: TournamentStageInsert[] = stagesConfig.stages.map((s) => ({
    tournament_id: tournamentId,
    stage_number: s.stage_number,
    format: s.format,
    status: "active",
    config: s.config || {},
  }));

  try {
    await insertStages({ supabase, stages, tournamentId });

    return {
      ok: true,
    };
  } catch (err: unknown) {
    console.error("Tournament stage creation error:", err);

    return {
      ok: false,
      error: {
        code: ActionErrorCode.DB_ERROR,
        message: "Failed to create tournament stage",
      },
    };
  }
}
