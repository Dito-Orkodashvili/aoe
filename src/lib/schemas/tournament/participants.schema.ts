import { z } from "zod";

export const TournamentParticipantSchema = z.object({
  id: z.string().uuid(),
  seed: z.coerce.number().int().optional(),
  team_id: z.coerce.number().int().optional(),
});

export const TournamentParticipantsSchema = z.object({
  participants: z
    .array(TournamentParticipantSchema)
    .min(2, "მინიმუმ 2 მონაწილე აუცილებელია"),
});

export type TournamentParticipantsSchemaType = z.infer<
  typeof TournamentParticipantsSchema
>;

export type TournamentParticipantsSchemaErrorsType = z.inferFormattedError<
  typeof TournamentParticipantsSchema
>;
