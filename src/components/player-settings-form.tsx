"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
  useTransition,
} from "react";
import { useToast } from "@/hooks/use-toast";
import { TPlayer } from "@/lib/types/player.types";
import { CIVILIZATIONS } from "@/lib/utils/civilization.utils";
import { savePlayerAction } from "@/app/profile/actions";
import { User as AuthedUser } from "@supabase/auth-js";
import {
  getPlayerSchemaError,
  PlayerSchema,
  PlayerSchemaErrorsType,
} from "@/lib/schemas/player.schema";
import { FieldError } from "@/components/ui/field-error";
import { useFormStatus } from "react-dom";

interface ProfileSettingsFormProps {
  player?: TPlayer | null;
  authedUser: AuthedUser;
}

const REGIONS = ["თბილის", "რუსთავი", "მუხრანი"];
const PLAYING_SINCE_YEARS = Array.from(
  { length: new Date().getFullYear() - 1998 + 1 },
  (_, i) => (new Date().getFullYear() - i).toString(),
);

export const PlayerSettingsForm = ({
  player,
  authedUser,
}: ProfileSettingsFormProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<PlayerSchemaErrorsType | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    nickname,
    name,
    last_name,
    fav_civ,
    region,
    aoe_profile_id,
    steam_id,
    youtube,
    twitch,
    gender,
    playing_since,
    team,
    bio,
  } = player ?? {};

  const defaultValue = {
    nickname: nickname ?? "",
    name: name ?? "",
    last_name: last_name ?? "",
    fav_civ: fav_civ ?? "",
    region: region ?? "",
    aoe_profile_id: aoe_profile_id ?? "",
    steam_id: steam_id ?? "",
    youtube: youtube ?? "",
    twitch: twitch ?? "",
    gender: gender ?? "male",
    playing_since: playing_since ?? "",
    team: team ?? "",
    bio: bio ?? "",
  };

  const [formData, setFormData] = useState(defaultValue);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validated = PlayerSchema.safeParse(formData);

    const isValid = validated.success;

    if (!isValid) {
      setErrors(validated.error.format());
    } else {
      setErrors(null);
      startTransition(async () => {
        const result = await savePlayerAction(authedUser.id, {
          ...formData,
          playing_since: formData.playing_since
            ? Number(formData.playing_since)
            : null,
          fav_civ: formData.fav_civ ? Number(formData.fav_civ) : null,
        });

        if (!result.success) {
          toast({
            title: "შეცდომა",
            description: "პროფილის მონაცემები შევსებულია არასწორად.",
            variant: "destructive",
          });
          return;
        }

        setIsEditing(false);

        toast({
          title: "პროფილი განახლდა",
          description: "ინფორმაცია წარმატებით განახლდა.",
          variant: "success",
        });
      });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
            <CardTitle>მოთამაშის ინფორმაცია</CardTitle>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="gap-2"
            >
              <Edit2 className="w-4 h-4" />
              რედაქტირება
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nickname" required>
                მეტსახელი
              </Label>
              <Input
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="შენი სახელი თამაშში"
              />
              {getPlayerSchemaError("nickname", errors) && (
                <FieldError>
                  {getPlayerSchemaError("nickname", errors)}
                </FieldError>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">სახელი</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  value={formData.name!}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">გვარი</Label>
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name!}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">სქესი</Label>
              <Select
                value={formData.gender!}
                onValueChange={(value) => handleSelectChange("gender", value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="აირჩიე სქესი" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">მამრობითი</SelectItem>
                  <SelectItem value="female">მდედრობითი</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fav_civ">საყვარელი ცივილიზაცია</Label>
                <Select
                  value={formData.fav_civ.toString()}
                  onValueChange={(value) =>
                    handleSelectChange("fav_civ", value)
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="აირჩიე ცივილიზაცია" />
                  </SelectTrigger>
                  <SelectContent>
                    {CIVILIZATIONS.map((civ) => (
                      <SelectItem key={civ.id} value={civ.id.toString()}>
                        {civ.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">რეგიონი</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground z-10" />
                  <Select
                    value={formData.region!}
                    onValueChange={(value) =>
                      handleSelectChange("region", value)
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="აირჩიე რეგიონი" />
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
                <Label htmlFor="playing_since">თამაშის დაწყების წელი</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground z-10" />
                  <Select
                    value={formData.playing_since.toString()}
                    onValueChange={(value) =>
                      handleSelectChange("playing_since", value)
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="აირჩიე წელი" />
                    </SelectTrigger>
                    <SelectContent>
                      {PLAYING_SINCE_YEARS.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team">გუნდი</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="team"
                    name="team"
                    value={formData.team!}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="შენი გუნდის სახელი"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="aoeProfileId" required>
                  ოფიციალური პროფილის ID
                </Label>
                <Input
                  id="aoe_profile_id"
                  name="aoe_profile_id"
                  value={formData.aoe_profile_id!}
                  onChange={handleChange}
                  disabled={!isEditing}
                  helperText={
                    <a
                      href="/faq#find-profile-id"
                      className="text-blue-400 underline"
                      target="_blank"
                    >
                      როგორ გავიგო ჩემი პროფილის ID?
                    </a>
                  }
                />
                {getPlayerSchemaError("aoe_profile_id", errors) && (
                  <FieldError>
                    {getPlayerSchemaError("aoe_profile_id", errors)}
                  </FieldError>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="steam_id">სთიმის ID</Label>
                <Input
                  id="steam_id"
                  name="steam_id"
                  value={formData.steam_id!}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">იუთუბ არხი</Label>
                <div className="relative">
                  <Youtube className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="youtube"
                    name="youtube"
                    value={formData.youtube!}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="https://youtube.com/@..."
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitch">ტვიტჩის არხი</Label>
                <div className="relative">
                  <Twitch className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="twitch"
                    name="twitch"
                    value={formData.twitch!}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="https://twitch.tv/..."
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="space-y-2">
              <Label htmlFor="bio">ბიოგრაფია</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio!}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="resize-none"
                placeholder="გვითხარი მეტი შენ შესახებ..."
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setErrors(null);
                  setIsEditing(false);
                  setFormData(defaultValue);
                }}
              >
                გაუქმება
              </Button>
              <Button type="submit">
                {isPending ? "იგზავნება..." : "ცვლილებების შენახვა"}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
