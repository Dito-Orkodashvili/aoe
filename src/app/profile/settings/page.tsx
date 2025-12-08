import { PlayerSettingsForm } from "@/components/player-settings-form";
import { getUser } from "@/lib/supabase/user/get-user";
import { getAuthedUserPlayer } from "@/lib/supabase/player/get-authed-user-player";
import { redirect } from "next/navigation";
import { Settings } from "lucide-react";
import { PageHero } from "@/components/sections/hero";

const ProfileSettings = async () => {
  const authedUser = await getUser();

  if (!authedUser) {
    redirect("/auth/login");
  }

  const player = await getAuthedUserPlayer(authedUser.id);

  return (
    <>
      <PageHero>
        <div className="text-center space-y-3">
          <Settings className="w-16 h-16 text-primary mx-auto drop-shadow-lg animate-fade-in" />
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
            პარამეტრები
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in">
            მართე შენი პროფილის პარამეტრები და პერსონალური ინფორმაცია.
          </p>
        </div>
      </PageHero>
      <div className="min-h-screen bg-background mb-8">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="grid gap-6">
            <PlayerSettingsForm player={player} authedUser={authedUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
