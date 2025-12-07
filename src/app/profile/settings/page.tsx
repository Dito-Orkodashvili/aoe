import { PlayerSettingsForm } from "@/components/player-settings-form";
import { getUser } from "@/lib/supabase/user/get-user";
import { getAuthedUserPlayer } from "@/lib/supabase/player/get-authed-user-player";
import { redirect } from "next/navigation";

const ProfileSettings = async () => {
  const authedUser = await getUser();

  if (!authedUser) {
    redirect("/login");
  }

  const player = await getAuthedUserPlayer(authedUser.id);

  return (
    <div className="min-h-screen bg-background mb-8">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            პარამეტრები
          </h1>
          <p className="text-muted-foreground">
            მართე შენი პროფილის პარამეტრები და პერსონალური ინფორმაცია.
          </p>
        </div>

        <div className="grid gap-6">
          <PlayerSettingsForm player={player} authedUser={authedUser} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
