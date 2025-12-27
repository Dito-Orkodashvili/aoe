import { createClient } from "@/lib/supabase/server";
import { ActionErrorCode } from "@/lib/utils/error.constants";
import { ActionResultType } from "@/lib/types/action.types";
import { BuildOrderType } from "@/lib/types/build-order.types";

export async function getBuildOrders(): Promise<
  ActionResultType<BuildOrderType[]>
> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("build_orders").select(`*`);

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
