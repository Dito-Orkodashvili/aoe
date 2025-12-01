import { TProfile } from "@/lib/types/profile.types";

export function isAdmin(profile: TProfile | null): boolean {
  return profile?.role === "admin";
}
