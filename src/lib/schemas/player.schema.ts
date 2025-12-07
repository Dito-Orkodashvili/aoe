import { z } from "zod";

export const PlayerSchema = z.object({
  nickname: z
    .string()
    .min(1, "მეტსახელი აუცილებელია")
    .max(30, "მეტსახელი ძალიან გრძელია"),
  name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  fav_civ: z.number().optional().nullable(),
  region: z.string().optional().nullable(),
  aoe_profile_id: z.string().min(1, "პროფილის ID აუცილებელია"),
  steam_id: z.string().min(1, "სთიმის ID აუცილებელია"),
  youtube: z
    .string()
    .url("იუთუბის ლინკი არასწორია")
    .optional()
    .nullable()
    .or(z.literal("")),

  twitch: z
    .string()
    .url("ტვიტჩის ლინკი არასწორია")
    .optional()
    .nullable()
    .or(z.literal("")),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "გთხოვ აირჩიო სქესი" }),
  }),
  playing_since: z.number().nullable(),
  team: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
});

export type PlayerSchemaType = z.infer<typeof PlayerSchema>;
