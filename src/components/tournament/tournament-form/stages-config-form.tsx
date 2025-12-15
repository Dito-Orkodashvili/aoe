"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormEvent, startTransition, useState } from "react";
import { TournamentBasicInfoErrorsType } from "@/lib/schemas/tournament/basic-info.schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createStagesAction } from "@/app/tournaments/create/step-2/action";
import {
  StageFormat,
  TournamentStagesSchema,
  TournamentStagesSchemaType,
} from "@/lib/schemas/tournament/stage-configuration.schema";
import { ERROR_MESSAGES } from "@/lib/utils/error.constants";

type StageFormatOption = { value: StageFormat; label: string };

const STAGE_FORMATS: StageFormatOption[] = [
  // { value: "single_elimination", label: "Single Elimination" },
  // { value: "double_elimination", label: "Double Elimination" },
  // { value: "groups", label: "Groups" },
  // { value: "swiss", label: "Swiss" },
  // { value: "round_robin", label: "Round Robin" },
  { value: "showmatch", label: "Showmatch" },
] as const;

interface StagesConfigFormProps {
  tournamentId: string;
}

export const StagesConfigForm = ({ tournamentId }: StagesConfigFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [stageCount, setStageCount] = useState<1 | 2>(1);
  const [stages, setStages] = useState<TournamentStagesSchemaType["stages"]>([
    { stage_number: 1, format: "single_elimination" },
  ]);
  const [errors, setErrors] = useState<TournamentBasicInfoErrorsType | null>(
    null,
  );

  const handleStageCountChange = (count: 1 | 2) => {
    setStageCount(count);

    setStages(
      count === 1
        ? [{ stage_number: 1, format: stages[0].format }]
        : [
            { stage_number: 1, format: stages[0].format },
            { stage_number: 2, format: "single_elimination" },
          ],
    );
  };

  const updateStageFormat = (index: number, format: StageFormat) => {
    setStages((prev) =>
      prev.map((s, i) => (i === index ? { ...s, format } : s)),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validatedStages = TournamentStagesSchema.safeParse({ stages });

    const isValid = validatedStages.success;

    if (!isValid) {
      setErrors(validatedStages.error.format());
    } else {
      startTransition(async () => {
        const res = await createStagesAction({ stages }, tournamentId);

        if (!res.ok) {
          toast({
            title: "შეცდომა!",
            description: res.error.message ?? ERROR_MESSAGES[res.error.code],
            variant: "destructive",
          });
        } else {
          router.push(`/tournaments/create/step-3?id=${tournamentId}`);
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Tournament Stages</h2>
        <p className="text-sm text-muted-foreground">
          Choose how your tournament will be structured
        </p>
      </div>
      <div className="space-y-2">
        <Label>Number of stages</Label>
        <Select
          value={String(stageCount)}
          onValueChange={(v) => handleStageCountChange(v === "2" ? 2 : 1)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">One stage</SelectItem>
            <SelectItem value="2" disabled>
              Two stages
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={stage.stage_number} className="space-y-2">
            <Label>Stage {stage.stage_number} format</Label>

            <Select
              value={stage.format}
              onValueChange={(v: StageFormat) => updateStageFormat(index, v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STAGE_FORMATS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() =>
            router.push(`/tournaments/create/step-1?id=${tournamentId}`)
          }
        >
          Back
        </Button>

        <Button type="submit" className="flex-1">
          Save and Continue
        </Button>
      </div>
    </form>
  );
};
