import { z } from "zod";

import { TournamentBasicInfoSchema } from "./basic-info.schema";
import { TournamentStagesSchema } from "./stage-configuration.schema";
import { TournamentParticipantsSchema } from "./participants.schema";
import { TournamentMapsSchema } from "./maps.schema";

export const FullTournamentCreationSchema = z.object({
  basic: TournamentBasicInfoSchema,
  stages: TournamentStagesSchema,
  participants: TournamentParticipantsSchema.optional(),
  maps: TournamentMapsSchema.optional(),
});

export type FullTournamentCreationType = z.infer<
  typeof FullTournamentCreationSchema
>;
