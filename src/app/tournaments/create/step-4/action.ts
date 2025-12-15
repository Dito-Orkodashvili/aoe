"use server";

import { createClient } from "@/lib/supabase/server";
import { TournamentMapsSchema } from "@/lib/schemas/tournament/maps.schema";
import { ActionResultType } from "@/lib/types/action.types";
import { ActionErrorCode } from "@/lib/utils/error.constants";

export async function addMapsAction(
  mapIds: number[],
  tournamentId: string,
): Promise<ActionResultType<{ slug: string }>> {
  const supabase = await createClient();

  const parsed = TournamentMapsSchema.safeParse({
    maps: mapIds.map((mapId) => ({ map_id: mapId })),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: { code: ActionErrorCode.VALIDATION },
    };
  }

  const parsedMaps = parsed.data;

  const rows = parsedMaps.maps.map((m) => ({
    tournament_id: tournamentId,
    map_id: m.map_id,
    map_order: m.order || 0,
  }));

  const { error: deleteError } = await supabase
    .from("tournament_maps")
    .delete()
    .eq("tournament_id", tournamentId);

  if (deleteError) {
    return {
      ok: false,
      error: { code: ActionErrorCode.DB_ERROR },
    };
  }

  try {
    const { error } = await supabase.from("tournament_maps").insert(rows);

    if (error) {
      return {
        ok: false,
        error: {
          code: ActionErrorCode.DB_ERROR,
        },
      };
    } else {
      const { data: tournament, error: fetchError } = await supabase
        .from("tournaments")
        .select("slug")
        .eq("id", tournamentId)
        .single();

      if (fetchError || !tournament) {
        return {
          ok: false,
          error: { code: ActionErrorCode.DB_ERROR },
        };
      }

      return {
        ok: true,
        data: { slug: tournament.slug },
      };
    }
  } catch (err: unknown) {
    console.error("Tournament maps creation error:", err);

    return {
      ok: false,
      error: {
        code: ActionErrorCode.DB_ERROR,
        message: "Failed to create maps",
      },
    };
  }
}
