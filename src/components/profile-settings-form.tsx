import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { User } from "@supabase/auth-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TProfile } from "@/lib/types/profile.types";

interface ProfileSettingsFormProps {
  profileInfo?: TProfile | null;
  userInfo: User;
}

export const ProfileSettingsForm = ({
  profileInfo,
  userInfo,
}: ProfileSettingsFormProps) => {
  const userName = userInfo.user_metadata?.full_name;
  const avatar = profileInfo?.avatar_url ?? "";

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Update your avatar</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatar} alt={userName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <Button variant="outline" className="gap-2">
              <Edit2 className="w-4 h-4" />
              Change Avatar
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              JPG, PNG or GIF. Max size 2MB.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Game Statistics</CardTitle>
          <CardDescription>Your performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-primary">1650</p>
              <p className="text-sm text-muted-foreground mt-1">ELO Rating</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-secondary">42</p>
              <p className="text-sm text-muted-foreground mt-1">Tournaments</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-accent">8</p>
              <p className="text-sm text-muted-foreground mt-1">Wins</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-foreground">156</p>
              <p className="text-sm text-muted-foreground mt-1">Total Games</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
