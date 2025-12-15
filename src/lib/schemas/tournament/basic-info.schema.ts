import { z } from "zod";

export const TournamentBasicInfoSchema = z.object({
  title: z.string().min(3, "სათაური აუცილებელია"),
  slug: z.string().optional(),
  description: z.string().optional(),
  cover_image_url: z.string().url().optional(),
  organizer: z.string().optional(),
  visibility: z.enum(["public", "private", "unlisted"]).default("public"),
  team_size: z.coerce.number().int().min(1).default(1),
  default_best_of: z.coerce.number().int().min(1).default(3),
  prize_pool: z.coerce.number().optional(),
  max_participants: z.coerce.number().int().optional(),

  start_date: z.string().optional(),
  end_date: z.string().optional(),

  registration_starts_at: z.string().optional(),
  registration_ends_at: z.string().optional(),

  is_registration_open: z.coerce.boolean().optional(),
});

export type TournamentBasicInfoType = z.infer<typeof TournamentBasicInfoSchema>;
export type TournamentBasicInfoErrorsType = z.inferFormattedError<
  typeof TournamentBasicInfoSchema
>;

export const getTournamentBasicInfoError = (
  key: keyof TournamentBasicInfoErrorsType,
  errors: TournamentBasicInfoErrorsType | null,
): string | undefined => {
  const fieldError = errors?.[key] as { _errors: string[] } | undefined;
  return fieldError?._errors?.[0];
};
