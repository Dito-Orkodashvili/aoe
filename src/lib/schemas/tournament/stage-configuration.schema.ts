import { z } from "zod";

export const StageFormatEnum = z.enum([
  "single_elimination",
  "double_elimination",
  "groups",
  "swiss",
  "round_robin",
  "showmatch",
]);

export const TournamentStageSchema = z.object({
  stage_number: z.number().int().min(1),
  format: StageFormatEnum,

  config: z.record(z.any()).optional(),
});

export type StageFormat = z.infer<typeof StageFormatEnum>;

export const TournamentStagesSchema = z.object({
  stages: z
    .array(TournamentStageSchema)
    .min(1, "მინიმუმ ერთი ეტაპის დამატება აუცილებელია"),
});

export type TournamentStagesSchemaType = z.infer<typeof TournamentStagesSchema>;
export type TournamentStagesSchemaErrorsType = z.inferFormattedError<
  typeof TournamentStagesSchema
>;

export const getTournamentStagesError = (
  key: keyof TournamentStagesSchemaErrorsType,
  errors: TournamentStagesSchemaErrorsType | null,
): string | undefined => {
  const fieldError = errors?.[key] as { _errors: string[] } | undefined;
  return fieldError?._errors?.[0];
};
