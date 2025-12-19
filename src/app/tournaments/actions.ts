"use server";

import { createClient } from "@/lib/supabase/server";
import { ActionResultType } from "@/lib/types/action.types";
import { ActionErrorCode, ERROR_MESSAGES } from "@/lib/utils";
import { isAdmin } from "@/lib/supabase/auth/is-admin";

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

type UpdateScoreInput = {
  matchId: string;
  side: "p1" | "p2";
  delta: 1 | -1;
};

export async function updateShowmatchScore({
  matchId,
  side,
  delta,
}: UpdateScoreInput): Promise<ActionResultType<{ score: number }>> {
  const supabase = await createClient();

  if (!(await isAdmin())) {
    return {
      ok: false,
      error: {
        code: ActionErrorCode.FORBIDDEN,
        message: ERROR_MESSAGES[ActionErrorCode.FORBIDDEN],
      },
    };
  }

  const { data: match, error } = await supabase
    .from("tournament_matches")
    .select("score_p1, score_p2, best_of, status")
    .eq("id", matchId)
    .single();

  if (error || !match) {
    return {
      ok: false,
      error: {
        code: ActionErrorCode.MATCH_NOT_FOUND,
        message: ERROR_MESSAGES[ActionErrorCode.MATCH_NOT_FOUND],
      },
    };
  }

  if (match.status !== "in_progress") {
    return {
      ok: false,
      error: {
        code: ActionErrorCode.MATCH_NOT_IN_PROGRESS,
        message: ERROR_MESSAGES[ActionErrorCode.MATCH_NOT_IN_PROGRESS],
      },
    };
  }

  const current = side === "p1" ? (match.score_p1 ?? 0) : (match.score_p2 ?? 0);

  const next = current + delta;

  if (next < 0) {
    return {
      ok: false,
      error: {
        code: ActionErrorCode.SCORE_CANNOT_BE_NEGATIVE,
        message: ERROR_MESSAGES[ActionErrorCode.SCORE_CANNOT_BE_NEGATIVE],
      },
    };
  }

  const maxScore = Math.ceil(match.best_of / 2);

  if (next > maxScore) {
    return {
      ok: false,
      error: {
        code: ActionErrorCode.SCORE_EXCEEDS_BEST_OF,
        message: ERROR_MESSAGES[ActionErrorCode.SCORE_EXCEEDS_BEST_OF],
      },
    };
  }

  const { error: updateError } = await supabase
    .from("tournament_matches")
    .update(side === "p1" ? { score_p1: next } : { score_p2: next })
    .eq("id", matchId);

  if (updateError) {
    return {
      ok: false,
      error: {
        code: ActionErrorCode.DB_ERROR,
        message: ERROR_MESSAGES[ActionErrorCode.DB_ERROR],
      },
    };
  }

  return { ok: true, data: { score: next } };
}
