"use server";

import {
  TournamentBasicInfoSchema,
  TournamentBasicInfoType,
} from "@/lib/schemas/tournament/basic-info.schema";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { insertTournament } from "@/lib/supabase/tournament/insert-tournament";
import { ActionErrorCode } from "@/lib/utils/error.constants";
import { ActionResultType } from "@/lib/types/action.types";

export async function createTournamentAction(payload: {
  basicInfo: TournamentBasicInfoType;
}): Promise<ActionResultType<{ id: string; slug: string }>> {
  const supabase = await createClient();

  const parsed = TournamentBasicInfoSchema.safeParse(payload.basicInfo);

  if (!parsed.success) {
    return {
      ok: false,
      error: { code: ActionErrorCode.VALIDATION },
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false,
      error: { code: ActionErrorCode.UNAUTHORIZED },
    };
  }

  const tournamentInfo = parsed.data;
  const slug = slugify(tournamentInfo.title);

  try {
    const result = await insertTournament({
      supabase,
      tournamentInfo,
      slug,
      created_by: user.id,
    });

    return {
      ok: true,
      data: { slug, id: result.id },
    };
  } catch (err: unknown) {
    console.error("Tournament creation error:", err);

    return {
      ok: false,
      error: {
        code: ActionErrorCode.DB_ERROR,
        message: "Failed to create tournament",
      },
    };
  }
}
