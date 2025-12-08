import { z } from "zod";

export const TournamentDetailsSchema = z.object({
  name: z
    .string()
    .min(3, "Tournament name must be at least 3 characters")
    .max(100),
  description: z.string().optional().nullable(),
  prize_pool: z.number(),
  max_participants: z.coerce
    .number({
      required_error: "Specify the maximum number of participants",
    })
    .min(2),
  best_of: z.coerce
    .number()
    .min(1)
    .refine((v) => v % 2 !== 0, {
      message: "bestOf must be an odd number",
    }),
  type: z.enum(["single_stage", "two_stage"], {
    required_error: "Please select a tournament type",
  }),
  format: z.enum(["single_elim", "double_elim", "round_robin"]),
  visibility: z.enum(["public", "private", "unlisted"]),
  registration_starts_at: z.string().optional().nullable(),
  registration_ends_at: z.string().optional().nullable(),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable(),
});

export type TournamentSchemaType = z.infer<typeof TournamentDetailsSchema>;
export type TournamentSchemaErrorsType = z.inferFormattedError<
  typeof TournamentDetailsSchema
>;

export const getTournamentSchemaError = (
  key: keyof TournamentSchemaErrorsType,
  errors: TournamentSchemaErrorsType | null,
): string | undefined => {
  const fieldError = errors?.[key] as { _errors: string[] } | undefined;
  return fieldError?._errors?.[0];
};
