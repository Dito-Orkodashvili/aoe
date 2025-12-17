import { createClient } from "../server";

export async function getAuthedUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
