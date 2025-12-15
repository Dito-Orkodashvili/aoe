import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";

export type SupabaseType = SupabaseClient<Database>;
