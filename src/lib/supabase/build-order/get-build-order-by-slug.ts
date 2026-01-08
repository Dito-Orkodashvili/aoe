import { createClient } from "@/lib/supabase/server";
import { ActionErrorCode } from "@/lib/utils/error.constants";
import { ActionResultType } from "@/lib/types/action.types";
import { BuildOrderWithSteps } from "@/lib/types/build-order.types";

export async function getBuildOrderBySlug(
  slug: string,
): Promise<ActionResultType<BuildOrderWithSteps>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("build_orders")
    .select(
      `
      id,
      slug,
      title,
      description,
      difficulty,
      opening_type,
      strategy_type,
      maps,
      youtube_url,
      civilization_ids,
      feudal_click_pop,
      author_id,
      map_types,
      created_at,
      updated_at,
      
      build_order_steps (
        id,
        build_order_id,
        step_number,
        age,
        villager_count,
        population,
        food_vils,
        wood_vils,
        gold_vils,
        stone_vils,
        task,
        note,
        icon,
        created_at
      )
    `,
    )
    .eq("slug", slug)
    .order("step_number", {
      referencedTable: "build_order_steps",
      ascending: true,
    })
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
