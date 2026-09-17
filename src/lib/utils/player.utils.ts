import { PlayerType } from "@/lib/types/player.types";

export const anonymousPicture = (gender: PlayerType["gender"]) =>
  gender === "female"
    ? "/aoe/anonymous_player_female.webp"
    : "/aoe/anonymous_player_male.webp";
