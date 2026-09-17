import { PlayerSettingsForm } from "@/components/player-settings-form";
import { getAuthedUser } from "@/lib/supabase/user/get-authed-user";
import { getPlayerByUserId } from "@/lib/supabase/player/get-player-by-user-id";
import { redirect } from "next/navigation";

const ProfileSettings = async () => {
  const authedUser = await getAuthedUser();

  if (!authedUser) {
    redirect("/auth/login");
  }

  const player = await getPlayerByUserId(authedUser.id);

  return (
    <div className="min-h-screen bg-background mb-8">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-6">
          <PlayerSettingsForm player={player} authedUser={authedUser} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
