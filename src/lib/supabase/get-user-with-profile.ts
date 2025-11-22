import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/lib/supabase/types";
import { User } from "@supabase/auth-js";

type Profile = Tables<"profiles">;

type UserWithProfile = {
  user: User | null;
  profile: Profile | null;
};

export async function getUserWithProfile(): Promise<UserWithProfile> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { user, profile };
}
