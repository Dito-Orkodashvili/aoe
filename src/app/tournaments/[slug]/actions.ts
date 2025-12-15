"use server";

import { createClient } from "@/lib/supabase/server";

export async function startShowmatch({
  tournamentId,
}: {
  tournamentId: string;
}) {
  const supabase = await createClient();

  const { data: stage, error: stageError } = await supabase
    .from("tournament_stages")
    .select("id, format, status")
    .eq("tournament_id", tournamentId)
    .single();

  if (stageError || !stage) {
    return { ok: false, error: "STAGE_NOT_FOUND" };
  }

  if (stage.format !== "showmatch") {
    return { ok: false, error: "NOT_A_SHOWMATCH" };
  }

  if (stage.status === "completed") {
    return { ok: false, error: "STAGE_ALREADY_COMPLETED" };
  }

  const { data: match, error: matchError } = await supabase
    .from("tournament_matches")
    .select("id, status")
    .eq("stage_id", stage.id)
    .single();

  if (matchError || !match) {
    return { ok: false, error: "MATCH_NOT_FOUND" };
  }

  if (match.status !== "pending" && match.status !== "scheduled") {
    return { ok: false, error: "MATCH_ALREADY_STARTED" };
  }

  const { error: updateMatchError } = await supabase
    .from("tournament_matches")
    .update({
      status: "in_progress",
      started_at: new Date().toISOString(),
    })
    .eq("id", match.id);

  if (updateMatchError) {
    return { ok: false, error: "FAILED_TO_START_MATCH" };
  }

  await supabase
    .from("tournament_stages")
    .update({ status: "active" })
    .eq("id", stage.id);

  await supabase
    .from("tournaments")
    .update({ status: "active" })
    .eq("id", tournamentId);

  return { ok: true };
}
