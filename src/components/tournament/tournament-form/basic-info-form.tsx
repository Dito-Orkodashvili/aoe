"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormEvent, startTransition, useState } from "react";
import { FieldError } from "@/components/ui/field-error";
import {
  getTournamentBasicInfoError,
  TournamentBasicInfoErrorsType,
  TournamentBasicInfoSchema,
  TournamentBasicInfoType,
} from "@/lib/schemas/tournament/basic-info.schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createTournamentAction } from "@/app/tournaments/create/step-1/action";
import { ERROR_MESSAGES } from "@/lib/utils";

export const BasicInfoForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [errors, setErrors] = useState<TournamentBasicInfoErrorsType | null>(
    null,
  );
  const [basicInfo, setBasicInfo] = useState<TournamentBasicInfoType>({
    title: "",
    description: "",
    organizer: "",
    visibility: "public",
    team_size: 1,
    default_best_of: 5,
    prize_pool: 0,
    max_participants: 2,
  });

  const handleChange = (
    name: keyof TournamentBasicInfoType,
    value: string | number,
  ) => {
    setBasicInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validatedDetails = TournamentBasicInfoSchema.safeParse(basicInfo);
    const isValid = validatedDetails.success;

    if (!isValid) {
      setErrors(validatedDetails.error.format());
    } else {
      setErrors(null);
      startTransition(async () => {
        const res = await createTournamentAction({ basicInfo });

        if (!res.ok) {
          toast({
            title: "შეცდომა!",
            description: res.error.message ?? ERROR_MESSAGES[res.error.code],
            variant: "destructive",
          });
        } else {
          router.push(`/tournaments/create/step-2?id=${res.data?.id}`);
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            placeholder="e.g., Summer Championship 2024"
            name="title"
            value={basicInfo.title}
            onChange={(event) => handleChange("title", event.target.value)}
            id="title"
          />
          {getTournamentBasicInfoError("title", errors) && (
            <FieldError>
              {getTournamentBasicInfoError("title", errors)}
            </FieldError>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            value={basicInfo.description ?? ""}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            id="description"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prize_pool">Prize Pool</Label>
          <Input
            name="prize_pool"
            type="number"
            value={basicInfo.prize_pool}
            onChange={(event) =>
              handleChange("prize_pool", Number(event.target.value))
            }
            id="prize_pool"
          />
          {getTournamentBasicInfoError("prize_pool", errors) && (
            <FieldError>
              {getTournamentBasicInfoError("prize_pool", errors)}
            </FieldError>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="max_participants">Max. number of participants</Label>
          <Input
            name="max_participants"
            value={basicInfo.max_participants}
            onChange={(event) =>
              handleChange("max_participants", Number(event.target.value))
            }
            id="max_participants"
          />
          {getTournamentBasicInfoError("max_participants", errors) && (
            <FieldError>
              {getTournamentBasicInfoError("max_participants", errors)}
            </FieldError>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="default_best_of">Best Of</Label>
          <Input
            type="number"
            name="default_best_of"
            value={basicInfo.default_best_of}
            onChange={(event) =>
              handleChange("default_best_of", Number(event.target.value))
            }
            id="default_best_of"
          />
          {getTournamentBasicInfoError("default_best_of", errors) && (
            <FieldError>
              {getTournamentBasicInfoError("default_best_of", errors)}
            </FieldError>
          )}
        </div>

        <div className="space-y-2">
          <Label>Visibility</Label>
          <Select
            name="visibility"
            value={basicInfo.visibility}
            onValueChange={(value) => handleChange("visibility", value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Choose one…" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="unlisted">Unlisted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit">Next Step</Button>
    </form>
  );
};
