import { z } from "zod";

export const TournamentMapSchema = z.object({
  map_id: z.number().int(),
  order: z.number().int().optional(),
});

export const TournamentMapsSchema = z.object({
  maps: z.array(TournamentMapSchema).min(1, "მინიმუმ 1 რუკა აუცილებელია"),
});

export type TournamentMapsSchemaType = z.infer<typeof TournamentMapsSchema>;
export type TournamentMapsSchemaErrorsType = z.inferFormattedError<
  typeof TournamentMapsSchema
>;
