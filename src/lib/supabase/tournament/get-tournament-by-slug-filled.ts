import { createClient } from "@/lib/supabase/server";
import { ActionErrorCode } from "@/lib/utils/error.constants";
import { ActionResultType } from "@/lib/types/action.types";
import { TournamentDetailsType } from "@/lib/types/tournament.types";

export async function getTournamentBySlug(
  slug: string,
): Promise<ActionResultType<TournamentDetailsType>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tournaments")
    .select(
      `
      id,
      title,
      slug,
      description,
      organizer,
      status,
      visibility,
      team_size,
      default_best_of,
      prize_pool,
      max_participants,
      start_date,
      end_date,
      registration_starts_at,
      registration_ends_at,
      is_registration_open,
      cover_image_url,
      config,
      created_at,
      created_by,
      updated_at,
  
      tournament_stages (
        id,
        tournament_id,
        stage_number,
        format,
        status,
        config,
        created_at,
        updated_at,
        
        tournament_matches (
          id,
          best_of,
          score_p1,
          score_p2,
          status
        )
      ),
  
      tournament_participants (
        id,
        tournament_id,
        player_id,
        team_id,
        seed,
        joined_at,
        
        player:players (
          id,
          nickname,
          name,
          last_name,
          fav_civ,
          picture_url,
          gender,
          tournament_elo
        )
      ),
  
      tournament_maps (
        id,
        tournament_id,
        map_id,
        map_order,
        is_enabled,
        created_at
      )
  `,
    )
    .eq("slug", slug)
    .single();

  if (error) {
    return {
      ok: false,
      error: {
        code:
          error.code === "PGRST116"
            ? ActionErrorCode.NOT_FOUND
            : ActionErrorCode.DB_ERROR,
      },
    };
  }

  return {
    ok: true,
    data,
  };
}
