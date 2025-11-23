import type { Tables } from "@/lib/supabase/types";

export type Profile = Tables<"profiles">;

export function isAdmin(profile: Profile | null): boolean {
  return profile?.role === "admin";
}
