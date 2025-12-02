import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/auth-js";
import { TProfile } from "@/lib/types/profile.types";

type UserWithProfile = {
  user: User | null;
  profile: TProfile | null;
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
