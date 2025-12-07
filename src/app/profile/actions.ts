"use server";

import { createClient } from "@/lib/supabase/server";
import { PlayerSchema, PlayerSchemaType } from "@/lib/schemas/player.schema";
import { revalidatePath } from "next/cache";

type PlayerPayload = {
  nickname: string;
  name: string | null;
  last_name: string | null;
  fav_civ: number | null;
  region: string | null;
  aoe_profile_id: string;
  steam_id: string;
  youtube: string | null;
  twitch: string | null;
  gender: "male" | "female";
  playing_since: number | null;
  team: string | null;
  bio: string | null;
  user_id?: string;
};

function normalizeFormData(formData: PlayerSchemaType): PlayerPayload {
  return {
    nickname: formData.nickname,
    name: formData.name ?? null,
    last_name: formData.last_name ?? null,
    fav_civ: formData.fav_civ ?? null,
    region: formData.region ?? null,
    aoe_profile_id: formData.aoe_profile_id,
    steam_id: formData.steam_id,
    youtube: formData.youtube ?? null,
    twitch: formData.twitch ?? null,
    gender: formData.gender,
    playing_since: formData.playing_since ?? null,
    team: formData.team ?? null,
    bio: formData.bio ?? null,
  };
}

async function createPlayer(userId: string, payload: PlayerPayload) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("players")
    .insert({ ...payload, user_id: userId });

  return error ? { success: false, error } : { success: true };
}

async function updatePlayer(userId: string, payload: PlayerPayload) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("players")
    .update(payload)
    .eq("user_id", userId);

  return error ? { success: false, error } : { success: true };
}

export async function savePlayerAction(
  userId: string,
  rawFormData: PlayerSchemaType,
) {
  const supabase = await createClient();

  const parsed = PlayerSchema.safeParse(rawFormData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten(),
    };
  }

  const formData = parsed.data;
  const normalized = normalizeFormData(formData);

  const { data: existing, error: fetchError } = await supabase
    .from("players")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (fetchError) {
    return { success: false, error: { message: "Failed checking player." } };
  }

  let result;

  if (existing) {
    result = await updatePlayer(userId, normalized);
  } else {
    result = await createPlayer(userId, normalized);
  }

  if (!result.success) {
    return {
      success: false,
      error: { message: "Database error while saving profile." },
    };
  }

  revalidatePath("/profile/settings");

  return { success: true };
}
