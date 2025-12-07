"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Edit2,
  Globe,
  Twitch,
  User,
  Users,
  Youtube,
} from "lucide-react";
import { TProfile } from "@/lib/types/profile.types";
import { User as AuthedUser } from "@supabase/auth-js";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProfileSettingsFormProps {
  profileInfo?: TProfile | null;
  userInfo?: AuthedUser;
}

const AOE_CIVS = [
  "Aztecs",
  "Berbers",
  "Britons",
  "Bulgarians",
  "Burgundians",
  "Burmese",
  "Byzantines",
  "Celts",
  "Chinese",
  "Cumans",
  "Dravidians",
  "Ethiopians",
  "Franks",
  "Goths",
  "Gurjaras",
  "Hindustanis",
  "Huns",
  "Incas",
  "Indians",
  "Italians",
  "Japanese",
  "Khmer",
  "Koreans",
  "Lithuanians",
  "Magyars",
  "Malay",
  "Malians",
  "Mayans",
  "Mongols",
  "Persians",
  "Poles",
  "Portuguese",
  "Romans",
  "Saracens",
  "Sicilians",
  "Slavs",
  "Spanish",
  "Tatars",
  "Teutons",
  "Turks",
  "Vietnamese",
  "Vikings",
];

const REGIONS = [
  "Europe",
  "North America",
  "South America",
  "Asia",
  "Africa",
  "Oceania",
  "Middle East",
];
const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

export const PlayerSettingsForm = ({
  profileInfo,
  userInfo,
}: ProfileSettingsFormProps) => {
  const { toast } = useToast();
  // const userName = userInfo.user_metadata?.full_name;
  // const avatar = profileInfo?.avatar_url ?? "";
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Account info
    username: "SakartveloWarrior",
    email: "warrior@aoe2.ge",
    discordId: "Warrior#1234",
    // Player info
    nickname: "Warrior",
    name: "Giorgi",
    lastName: "Maisuradze",
    favCiv: "Byzantines",
    region: "Europe",
    aoeProfileId: "12345678",
    steamId: "76561198012345678",
    youtube: "https://youtube.com/@warrior",
    twitch: "https://twitch.tv/warrior",
    gender: "Male",
    playingSince: "2015",
    team: "Georgia Legends",
    bio: "Age of Empires II enthusiast from Tbilisi. Love playing Byzantines and Persians. Always looking for team games!",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 justify-between">
          <div>
            <CardTitle>Player Information</CardTitle>
            <CardDescription>
              Your public player profile details
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname / In-Game Name</Label>
              <Input
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Your player nickname"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {GENDERS.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Gaming Info */}
          <div className="border-t border-border pt-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">
              Gaming Details
            </h4>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="favCiv">Favorite Civilization</Label>
                <Select
                  value={formData.favCiv}
                  onValueChange={(value) => handleSelectChange("favCiv", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select civilization" />
                  </SelectTrigger>
                  <SelectContent>
                    {AOE_CIVS.map((civ) => (
                      <SelectItem key={civ} value={civ}>
                        {civ}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground z-10" />
                  <Select
                    value={formData.region}
                    onValueChange={(value) =>
                      handleSelectChange("region", value)
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="playingSince">Playing Since</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="playingSince"
                    name="playingSince"
                    value={formData.playingSince}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g., 2015"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="team"
                    name="team"
                    value={formData.team}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Your team name"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* External Profiles */}
          <div className="border-t border-border pt-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">
              External Profiles
            </h4>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="aoeProfileId">AoE2.net Profile ID</Label>
                <Input
                  id="aoeProfileId"
                  name="aoeProfileId"
                  value={formData.aoeProfileId}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Your aoe2.net profile ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="steamId">Steam ID</Label>
                <Input
                  id="steamId"
                  name="steamId"
                  value={formData.steamId}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Your Steam ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube Channel</Label>
                <div className="relative">
                  <Youtube className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="youtube"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="https://youtube.com/@..."
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitch">Twitch Channel</Label>
                <div className="relative">
                  <Twitch className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="twitch"
                    name="twitch"
                    value={formData.twitch}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="https://twitch.tv/..."
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="border-t border-border pt-6">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="resize-none"
                placeholder="Tell others about yourself..."
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
