import { redirect } from "next/navigation";
import { getUserWithProfile } from "@/lib/supabase/get-user-with-profile";
import { ProfileSettingsForm } from "@/components/profile-settings-form";

const ProfileSettings = async () => {
  const { user, profile } = await getUserWithProfile();

  if (!user) redirect("/auth/login");

  return (
    <>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>
        <ProfileSettingsForm profileInfo={profile} userInfo={user} />
      </div>
    </>
  );
};

export default ProfileSettings;
