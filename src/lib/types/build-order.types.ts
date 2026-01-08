import { Tables } from "@/lib/supabase/types";

export type BuildOrderType = Tables<"build_orders">;
export type BuildOrderStepType = Tables<"build_order_steps">;

export type BuildOrderWithSteps = BuildOrderType & {
  build_order_steps?: BuildOrderStepType[] | null;
};
